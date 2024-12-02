# events/views.py
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Event, Registration
from .serializers import EventSerializer, RegistrationSerializer, UserSerializer

class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow all read-only requests
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Check if this is a registration action
        if view.action in ['register', 'registration']:
            return request.user.is_authenticated
            
        # Only staff can create/edit/delete events
        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Check if this is a registration action
        if view.action in ['register', 'registration']:
            return request.user.is_authenticated
            
        # Write permissions are only allowed to staff
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
            print("Received data:", request.data)
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
            print("Error creating user:", str(e))
            return Response(
                {'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

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

    def get_queryset(self):
        return Event.objects.all().prefetch_related('registrations', 'registrations__user')

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['POST'])
    def register(self, request, url_name=None):
        try:
            event = self.get_object()
            
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Authentication required"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Check if user is already registered
            if Registration.objects.filter(event=event, user=request.user).exists():
                return Response(
                    {"detail": "You are already registered for this event"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check if event is full (only if there's a capacity limit)
            if event.capacity is not None and event.registrations.count() >= event.capacity:
                return Response(
                    {"detail": "This event is fully booked"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create registration
            registration = Registration.objects.create(
                event=event,
                user=request.user,
                status='confirmed'
            )
            
            serializer = RegistrationSerializer(registration)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print(f"Registration error: {str(e)}")
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
        # Always show only the user's own registrations
        return Registration.objects.filter(user=self.request.user)