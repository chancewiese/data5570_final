{"filter":false,"title":"serializers.py","tooltip":"/event-registration/backend/events/serializers.py","ace":{"folds":[],"scrolltop":375.5,"scrollleft":0,"selection":{"start":{"row":66,"column":31},"end":{"row":66,"column":31},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":249,"mode":"ace/mode/python"}},"hash":"0fcb19112700e70dd4cb99cdeb1e7b29d2548be1","undoManager":{"mark":14,"position":14,"stack":[[{"start":{"row":112,"column":53},"end":{"row":113,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":113,"column":0},"end":{"row":113,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":113,"column":4},"end":{"row":113,"column":8},"action":"remove","lines":["    "],"id":3},{"start":{"row":113,"column":0},"end":{"row":113,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":113,"column":0},"end":{"row":114,"column":0},"action":"insert","lines":["",""],"id":4}],[{"start":{"row":114,"column":0},"end":{"row":117,"column":32},"action":"insert","lines":["class UserPreferencesSerializer(serializers.ModelSerializer):","    class Meta:","        model = UserPreferences","        fields = ('theme_mode',)"],"id":5}],[{"start":{"row":114,"column":0},"end":{"row":117,"column":32},"action":"remove","lines":["class UserPreferencesSerializer(serializers.ModelSerializer):","    class Meta:","        model = UserPreferences","        fields = ('theme_mode',)"],"id":6},{"start":{"row":114,"column":0},"end":{"row":117,"column":32},"action":"insert","lines":["class UserPreferencesSerializer(serializers.ModelSerializer):","    class Meta:","        model = UserPreferences","        fields = ('theme_mode',)"]}],[{"start":{"row":3,"column":39},"end":{"row":3,"column":40},"action":"insert","lines":[","],"id":7}],[{"start":{"row":3,"column":40},"end":{"row":3,"column":41},"action":"insert","lines":[" "],"id":8}],[{"start":{"row":3,"column":41},"end":{"row":3,"column":56},"action":"insert","lines":["UserPreferences"],"id":9}],[{"start":{"row":1,"column":0},"end":{"row":117,"column":32},"action":"remove","lines":["from rest_framework import serializers","from django.contrib.auth.models import User","from .models import Event, Registration, UserPreferences","","class UserSerializer(serializers.ModelSerializer):","    class Meta:","        model = User","        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')","        read_only_fields = ('is_staff',)","","class EventSerializer(serializers.ModelSerializer):","    created_by = UserSerializer(read_only=True)","    registrations = serializers.SerializerMethodField()","    registered_users_count = serializers.SerializerMethodField()","    is_registered = serializers.SerializerMethodField()","    can_edit = serializers.SerializerMethodField()","    remaining_capacity = serializers.SerializerMethodField()","","    class Meta:","        model = Event","        fields = (","            'id',","            'title',","            'description',","            'date',","            'time',","            'location',","            'capacity',","            'url_name',","            'created_by',","            'created_at',","            'updated_at',","            'registrations',","            'registered_users_count',","            'is_registered',","            'can_edit',","            'remaining_capacity'","        )","        read_only_fields = ('created_by', 'created_at', 'updated_at')","","    def validate_url_name(self, value):","        # Check if url_name is unique when creating or updating","        instance = self.instance","        if Event.objects.filter(url_name=value).exclude(pk=instance.pk if instance else None).exists():","            raise serializers.ValidationError(\"This URL name is already in use.\")","        return value","","    def get_registrations(self, obj):","        registrations = obj.registrations.all()","        return RegistrationSerializer(registrations, many=True).data","","    def get_registered_users_count(self, obj):","        return obj.registrations.filter(status='confirmed').count()","","    def get_is_registered(self, obj):","        request = self.context.get('request')","        if request and request.user.is_authenticated:","            return obj.registrations.filter(","                user=request.user,","                status='confirmed'","            ).exists()","        return False","","    def get_can_edit(self, obj):","        request = self.context.get('request')","        if request and request.user.is_authenticated:","            return request.user.is_staff","        return False","","    def get_remaining_capacity(self, obj):","        if obj.capacity is None:  # If there's no capacity limit","            return None","        confirmed_registrations = obj.registrations.filter(status='confirmed').count()","        return max(0, obj.capacity - confirmed_registrations)","","class EventListSerializer(EventSerializer):","    \"\"\"Simplified serializer for list views\"\"\"","    class Meta(EventSerializer.Meta):","        fields = (","            'id',","            'title',","            'description',","            'date',","            'time',","            'location',","            'capacity',","            'url_name',","            'registered_users_count',","            'is_registered',","            'can_edit',","            'remaining_capacity'","        )","","class RegistrationSerializer(serializers.ModelSerializer):","    user = UserSerializer(read_only=True)","    event = EventListSerializer(read_only=True)","    event_title = serializers.SerializerMethodField()","","    class Meta:","        model = Registration","        fields = (","            'id',","            'event',","            'event_title',","            'user',","            'status',","            'registration_date'","        )","        read_only_fields = ('registration_date',)","","    def get_event_title(self, obj):","        return obj.event.title if obj.event else None","","class UserPreferencesSerializer(serializers.ModelSerializer):","    class Meta:","        model = UserPreferences","        fields = ('theme_mode',)"],"id":10},{"start":{"row":1,"column":0},"end":{"row":139,"column":32},"action":"insert","lines":["from rest_framework import serializers","from django.contrib.auth.models import User","from .models import Event, Registration, UserPreferences, EventImage","","class UserSerializer(serializers.ModelSerializer):","    class Meta:","        model = User","        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')","        read_only_fields = ('is_staff',)","","class EventImageSerializer(serializers.ModelSerializer):","    uploaded_by = UserSerializer(read_only=True)","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = (","            'id',","            'image_url',","            'caption',","            'uploaded_by',","            'uploaded_at',","            'is_primary'","        )","        read_only_fields = ('uploaded_at', 'uploaded_by')","","    def get_image_url(self, obj):","        if obj.image:","            return self.context['request'].build_absolute_uri(obj.image.url)","        return None","","class EventSerializer(serializers.ModelSerializer):","    created_by = UserSerializer(read_only=True)","    registrations = serializers.SerializerMethodField()","    registered_users_count = serializers.SerializerMethodField()","    is_registered = serializers.SerializerMethodField()","    can_edit = serializers.SerializerMethodField()","    remaining_capacity = serializers.SerializerMethodField()","    images = EventImageSerializer(many=True, read_only=True)","","    class Meta:","        model = Event","        fields = (","            'id',","            'title',","            'description',","            'date',","            'time',","            'location',","            'capacity',","            'url_name',","            'created_by',","            'created_at',","            'updated_at',","            'registrations',","            'registered_users_count',","            'is_registered',","            'can_edit',","            'remaining_capacity',","            'images'","        )","        read_only_fields = ('created_by', 'created_at', 'updated_at')","","    def validate_url_name(self, value):","        instance = self.instance","        if Event.objects.filter(url_name=value).exclude(pk=instance.pk if instance else None).exists():","            raise serializers.ValidationError(\"This URL name is already in use.\")","        return value","","    def get_registrations(self, obj):","        registrations = obj.registrations.all()","        return RegistrationSerializer(registrations, many=True).data","","    def get_registered_users_count(self, obj):","        return obj.registrations.filter(status='confirmed').count()","","    def get_is_registered(self, obj):","        request = self.context.get('request')","        if request and request.user.is_authenticated:","            return obj.registrations.filter(","                user=request.user,","                status='confirmed'","            ).exists()","        return False","","    def get_can_edit(self, obj):","        request = self.context.get('request')","        if request and request.user.is_authenticated:","            return request.user.is_staff","        return False","","    def get_remaining_capacity(self, obj):","        if obj.capacity is None:","            return None","        confirmed_registrations = obj.registrations.filter(status='confirmed').count()","        return max(0, obj.capacity - confirmed_registrations)","","class EventListSerializer(EventSerializer):","    \"\"\"Simplified serializer for list views\"\"\"","    class Meta(EventSerializer.Meta):","        fields = (","            'id',","            'title',","            'description',","            'date',","            'time',","            'location',","            'capacity',","            'url_name',","            'registered_users_count',","            'is_registered',","            'can_edit',","            'remaining_capacity'","        )","","class RegistrationSerializer(serializers.ModelSerializer):","    user = UserSerializer(read_only=True)","    event = EventListSerializer(read_only=True)","    event_title = serializers.SerializerMethodField()","","    class Meta:","        model = Registration","        fields = (","            'id',","            'event',","            'event_title',","            'user',","            'status',","            'registration_date'","        )","        read_only_fields = ('registration_date',)","","    def get_event_title(self, obj):","        return obj.event.title if obj.event else None","","class UserPreferencesSerializer(serializers.ModelSerializer):","    class Meta:","        model = UserPreferences","        fields = ('theme_mode',)"]}],[{"start":{"row":11,"column":0},"end":{"row":30,"column":19},"action":"remove","lines":["class EventImageSerializer(serializers.ModelSerializer):","    uploaded_by = UserSerializer(read_only=True)","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = (","            'id',","            'image_url',","            'caption',","            'uploaded_by',","            'uploaded_at',","            'is_primary'","        )","        read_only_fields = ('uploaded_at', 'uploaded_by')","","    def get_image_url(self, obj):","        if obj.image:","            return self.context['request'].build_absolute_uri(obj.image.url)","        return None"],"id":11},{"start":{"row":11,"column":0},"end":{"row":30,"column":49},"action":"insert","lines":["class EventImageSerializer(serializers.ModelSerializer):","    uploaded_by = UserSerializer(read_only=True)","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = (","            'id',","            'image_url',","            'caption',","            'uploaded_by',","            'uploaded_at',","            'is_primary'","        )","        read_only_fields = ('uploaded_at', 'uploaded_by')","","    def get_image_url(self, obj):","        if obj.image:","            # Return the path that will go through the API proxy","            return f'/api/media/{obj.image.name}'"]}],[{"start":{"row":11,"column":0},"end":{"row":30,"column":49},"action":"remove","lines":["class EventImageSerializer(serializers.ModelSerializer):","    uploaded_by = UserSerializer(read_only=True)","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = (","            'id',","            'image_url',","            'caption',","            'uploaded_by',","            'uploaded_at',","            'is_primary'","        )","        read_only_fields = ('uploaded_at', 'uploaded_by')","","    def get_image_url(self, obj):","        if obj.image:","            # Return the path that will go through the API proxy","            return f'/api/media/{obj.image.name}'"],"id":13},{"start":{"row":11,"column":0},"end":{"row":31,"column":19},"action":"insert","lines":["class EventImageSerializer(serializers.ModelSerializer):","    uploaded_by = UserSerializer(read_only=True)","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = (","            'id',","            'image_url',","            'caption',","            'uploaded_by',","            'uploaded_at',","            'is_primary'","        )","        read_only_fields = ('uploaded_at', 'uploaded_by')","","    def get_image_url(self, obj):","        if obj.image:","            # Return path that will go through the API","            return f'/api/media/{obj.image.name}'","        return None"]}],[{"start":{"row":11,"column":0},"end":{"row":31,"column":19},"action":"remove","lines":["class EventImageSerializer(serializers.ModelSerializer):","    uploaded_by = UserSerializer(read_only=True)","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = (","            'id',","            'image_url',","            'caption',","            'uploaded_by',","            'uploaded_at',","            'is_primary'","        )","        read_only_fields = ('uploaded_at', 'uploaded_by')","","    def get_image_url(self, obj):","        if obj.image:","            # Return path that will go through the API","            return f'/api/media/{obj.image.name}'","        return None"],"id":14},{"start":{"row":11,"column":0},"end":{"row":21,"column":19},"action":"insert","lines":["class EventImageSerializer(serializers.ModelSerializer):","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = ('id', 'image_url', 'caption', 'order', 'is_primary')","","    def get_image_url(self, obj):","        if obj.image:","            return obj.image.url","        return None"]}],[{"start":{"row":30,"column":4},"end":{"row":30,"column":60},"action":"remove","lines":["images = EventImageSerializer(many=True, read_only=True)"],"id":15},{"start":{"row":30,"column":4},"end":{"row":30,"column":60},"action":"insert","lines":["images = EventImageSerializer(many=True, read_only=True)"]}],[{"start":{"row":32,"column":4},"end":{"row":53,"column":69},"action":"remove","lines":["class Meta:","        model = Event","        fields = (","            'id',","            'title',","            'description',","            'date',","            'time',","            'location',","            'capacity',","            'url_name',","            'created_by',","            'created_at',","            'updated_at',","            'registrations',","            'registered_users_count',","            'is_registered',","            'can_edit',","            'remaining_capacity',","            'images'","        )","        read_only_fields = ('created_by', 'created_at', 'updated_at')"],"id":16},{"start":{"row":32,"column":4},"end":{"row":53,"column":69},"action":"insert","lines":["class Meta:","        model = Event","        fields = (","            'id',","            'title',","            'description',","            'date',","            'time',","            'location',","            'capacity',","            'url_name',","            'created_by',","            'created_at',","            'updated_at',","            'registrations',","            'registered_users_count',","            'is_registered',","            'can_edit',","            'remaining_capacity',","            'images'","        )","        read_only_fields = ('created_by', 'created_at', 'updated_at')"]}],[{"start":{"row":11,"column":0},"end":{"row":21,"column":19},"action":"remove","lines":["class EventImageSerializer(serializers.ModelSerializer):","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = ('id', 'image_url', 'caption', 'order', 'is_primary')","","    def get_image_url(self, obj):","        if obj.image:","            return obj.image.url","        return None"],"id":18},{"start":{"row":11,"column":0},"end":{"row":21,"column":19},"action":"insert","lines":["class EventImageSerializer(serializers.ModelSerializer):","    image_url = serializers.SerializerMethodField()","","    class Meta:","        model = EventImage","        fields = ('id', 'image_url', 'caption', 'is_primary')","","    def get_image_url(self, obj):","        if obj.image:","            return obj.image.url","        return None"]}]]},"timestamp":1733454710309}