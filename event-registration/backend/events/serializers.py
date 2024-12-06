# events/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event, Registration, UserPreferences, EventImage

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')
        read_only_fields = ('is_staff',)

class EventImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = EventImage
        fields = ('id', 'image_url', 'caption', 'is_primary')

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class EventSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    registrations = serializers.SerializerMethodField()
    registered_users_count = serializers.SerializerMethodField()
    is_registered = serializers.SerializerMethodField()
    can_edit = serializers.SerializerMethodField()
    remaining_capacity = serializers.SerializerMethodField()
    images = EventImageSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = (
            'id',
            'title',
            'description',
            'date',
            'time',
            'location',
            'capacity',
            'url_name',
            'created_by',
            'created_at',
            'updated_at',
            'registrations',
            'registered_users_count',
            'is_registered',
            'can_edit',
            'remaining_capacity',
            'images'
        )
        read_only_fields = ('created_by', 'created_at', 'updated_at')

    def validate_url_name(self, value):
        instance = self.instance
        if Event.objects.filter(url_name=value).exclude(pk=instance.pk if instance else None).exists():
            raise serializers.ValidationError("This URL name is already in use.")
        return value

    def get_registrations(self, obj):
        registrations = obj.registrations.all()
        return RegistrationSerializer(registrations, many=True).data

    def get_registered_users_count(self, obj):
        return obj.registrations.filter(status='confirmed').count()

    def get_is_registered(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.registrations.filter(
                user=request.user,
                status='confirmed'
            ).exists()
        return False

    def get_can_edit(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user.is_staff
        return False

    def get_remaining_capacity(self, obj):
        if obj.capacity is None:
            return None
        confirmed_registrations = obj.registrations.filter(status='confirmed').count()
        return max(0, obj.capacity - confirmed_registrations)

class EventListSerializer(EventSerializer):
    """Simplified serializer for list views"""
    class Meta(EventSerializer.Meta):
        fields = (
            'id',
            'title',
            'description',
            'date',
            'time',
            'location',
            'capacity',
            'url_name',
            'registered_users_count',
            'is_registered',
            'can_edit',
            'remaining_capacity'
        )

class RegistrationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    event = EventListSerializer(read_only=True)
    event_title = serializers.SerializerMethodField()

    class Meta:
        model = Registration
        fields = (
            'id',
            'event',
            'event_title',
            'user',
            'status',
            'registration_date'
        )
        read_only_fields = ('registration_date',)

    def get_event_title(self, obj):
        return obj.event.title if obj.event else None

class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = ('theme_mode',)