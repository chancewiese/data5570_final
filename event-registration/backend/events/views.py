# events/views.py
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Event, Registration, UserPreferences, EventImage
from .serializers import (
    EventSerializer, 
    RegistrationSerializer, 
    UserSerializer, 
    UserPreferencesSerializer,
    EventImageSerializer
)
from PIL import Image
import os

class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if view.action in ['register', 'registration']:
            return request.user.is_authenticated
            
        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
            
        if view.action in ['register', 'registration']:
            return request.user.is_authenticated
            
        return request.user.is_staff

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request):
        try:
            required_fields = ['username', 'password', 'first_name', 'last_name']
            for field in required_fields:
                if not request.data.get(field):
                    return Response(
                        {field: 'This field is required.'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            if User.objects.filter(username=request.data['username']).exists():
                return Response(
                    {'username': 'A user with this username already exists.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user = User(
                username=request.data['username'],
                email=request.data.get('email', ''),
                first_name=request.data['first_name'],
                last_name=request.data['last_name'],
                is_staff=request.data.get('is_staff', False)
            )

            try:
                validate_password(request.data['password'], user)
            except ValidationError as e:
                return Response(
                    {'password': e.messages},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user.set_password(request.data['password'])
            user.save()

            return Response(
                self.get_serializer(user).data,
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response(
                {'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['GET', 'PATCH'])
    def preferences(self, request, pk=None):
        user = self.get_object()
        preferences, created = UserPreferences.objects.get_or_create(user=user)

        if request.method == 'GET':
            serializer = UserPreferencesSerializer(preferences)
            return Response(serializer.data)

        elif request.method == 'PATCH':
            serializer = UserPreferencesSerializer(preferences, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def me(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Not authenticated'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=True, methods=['PATCH'])
    def toggle_admin(self, request, pk=None):
        try:
            user = self.get_object()
            user.is_staff = not user.is_staff
            user.save()
            return Response(
                self.get_serializer(user).data,
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'url_name'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsStaffOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        return Event.objects.all().prefetch_related(
            'registrations', 
            'registrations__user',
            'images'
        )

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def validate_image(self, image):
        # Validate file size (max 5MB)
        if image.size > 5 * 1024 * 1024:
            raise ValidationError("Image file too large ( > 5MB )")
        
        # Validate file type
        try:
            img = Image.open(image)
            img.verify()
            if img.format.lower() not in ['jpeg', 'jpg', 'png', 'gif']:
                raise ValidationError("Unsupported image format")
        except:
            raise ValidationError("Invalid image file")

    @action(detail=True, methods=['POST'])
    def delete_image(self, request, url_name=None):
        event = self.get_object()
        image_id = request.POST.get('image_id')
    
        if not request.user.is_staff:
            return Response(
                {"detail": "Only staff can delete images"},
                status=status.HTTP_403_FORBIDDEN
            )
    
        try:
            image = EventImage.objects.get(id=image_id, event=event)
            image.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except EventImage.DoesNotExist:
            return Response(
                {"detail": "Image not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['POST'])
    def upload_images(self, request, url_name=None):
        event = self.get_object()
        
        if not request.user.is_staff:
            return Response(
                {"detail": "Only staff can upload images"},
                status=status.HTTP_403_FORBIDDEN
            )
    
        try:
            images = request.FILES.getlist('images')
            captions = request.POST.getlist('captions', [])
            
            if not images:
                return Response(
                    {"detail": "No images provided"},
                    status=status.HTTP_400_BAD_REQUEST
                )
    
            uploaded_images = []
            for i, image in enumerate(images):
                try:
                    self.validate_image(image)
                    
                    caption = captions[i] if i < len(captions) else ""
                    event_image = EventImage.objects.create(
                        event=event,
                        image=image,
                        caption=caption,
                        uploaded_by=request.user,
                        is_primary=i == 0 and not EventImage.objects.filter(event=event).exists(),
                    )
                    uploaded_images.append(event_image)
                except ValidationError as e:
                    return Response(
                        {"detail": str(e)},
                        status=status.HTTP_400_BAD_REQUEST
                    )
    
            serializer = EventImageSerializer(
                uploaded_images, 
                many=True,
                context={'request': request}
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    @action(detail=True, methods=['POST'])
    def register(self, request, url_name=None):
        try:
            event = self.get_object()
            
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Authentication required"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            if Registration.objects.filter(event=event, user=request.user).exists():
                return Response(
                    {"detail": "You are already registered for this event"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if event.capacity is not None and event.registrations.count() >= event.capacity:
                return Response(
                    {"detail": "This event is fully booked"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            registration = Registration.objects.create(
                event=event,
                user=request.user,
                status='confirmed'
            )
            
            serializer = RegistrationSerializer(registration)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['DELETE'])
    def registration(self, request, url_name=None):
        event = self.get_object()
        
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            registration = Registration.objects.get(event=event, user=request.user)
            registration.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Registration.DoesNotExist:
            return Response(
                {"detail": "You are not registered for this event"},
                status=status.HTTP_404_NOT_FOUND
            )

class RegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user)