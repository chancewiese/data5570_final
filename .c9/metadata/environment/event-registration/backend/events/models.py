{"filter":false,"title":"models.py","tooltip":"/event-registration/backend/events/models.py","ace":{"folds":[],"scrolltop":660,"scrollleft":0,"selection":{"start":{"row":83,"column":9},"end":{"row":83,"column":9},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"hash":"c6f08e395b61e5f0da723fe9a0209355f84641b5","undoManager":{"mark":16,"position":16,"stack":[[{"start":{"row":63,"column":59},"end":{"row":64,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":64,"column":0},"end":{"row":64,"column":8},"action":"insert","lines":["        "]},{"start":{"row":64,"column":8},"end":{"row":65,"column":0},"action":"insert","lines":["",""]},{"start":{"row":65,"column":0},"end":{"row":65,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":65,"column":4},"end":{"row":65,"column":8},"action":"remove","lines":["    "],"id":3},{"start":{"row":65,"column":0},"end":{"row":65,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":65,"column":0},"end":{"row":75,"column":48},"action":"insert","lines":["class UserPreferences(models.Model):","    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')","    theme_mode = models.CharField(max_length=10, default='light')","    created_at = models.DateTimeField(auto_now_add=True)","    updated_at = models.DateTimeField(auto_now=True)","","    def __str__(self):","        return f\"{self.user.username}'s preferences\"","","    class Meta:","        verbose_name_plural = 'User preferences'"],"id":4}],[{"start":{"row":64,"column":4},"end":{"row":64,"column":8},"action":"remove","lines":["    "],"id":5},{"start":{"row":64,"column":0},"end":{"row":64,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":1,"column":0},"end":{"row":3,"column":37},"action":"remove","lines":["from django.db import models","from django.contrib.auth.models import User","from django.utils.text import slugify"],"id":6},{"start":{"row":1,"column":0},"end":{"row":3,"column":37},"action":"insert","lines":["from django.db import models","from django.contrib.auth.models import User","from django.utils.text import slugify"]}],[{"start":{"row":3,"column":37},"end":{"row":4,"column":0},"action":"insert","lines":["",""],"id":7}],[{"start":{"row":4,"column":0},"end":{"row":4,"column":9},"action":"insert","lines":["import os"],"id":8}],[{"start":{"row":1,"column":0},"end":{"row":76,"column":48},"action":"remove","lines":["from django.db import models","from django.contrib.auth.models import User","from django.utils.text import slugify","import os","","class Event(models.Model):","    title = models.CharField(max_length=200)","    description = models.TextField()","    date = models.DateField()","    time = models.TimeField()","    location = models.CharField(max_length=200)","    capacity = models.PositiveIntegerField(null=True, blank=True)","    url_name = models.SlugField(max_length=250, unique=True)","    created_by = models.ForeignKey(","        User, ","        on_delete=models.CASCADE,","        related_name='created_events'","    )","    created_at = models.DateTimeField(auto_now_add=True)","    updated_at = models.DateTimeField(auto_now=True)","","    def save(self, *args, **kwargs):","        if not self.url_name:","            self.url_name = slugify(self.title)","        super().save(*args, **kwargs)","","    def __str__(self):","        return self.title","","    class Meta:","        ordering = ['date', 'time']","","","class Registration(models.Model):","    STATUS_CHOICES = [","        ('pending', 'Pending'),","        ('confirmed', 'Confirmed'),","        ('cancelled', 'Cancelled')","    ]","","    event = models.ForeignKey(","        Event,","        on_delete=models.CASCADE,","        related_name='registrations'","    )","    user = models.ForeignKey(","        User,","        on_delete=models.CASCADE,","        related_name='event_registrations'","    )","    status = models.CharField(","        max_length=20,","        choices=STATUS_CHOICES,","        default='pending'","    )","    registration_date = models.DateTimeField(auto_now_add=True)","    notes = models.TextField(blank=True)","","    class Meta:","        unique_together = ['event', 'user']","        ordering = ['registration_date']","","    def __str__(self):","        return f\"{self.user.username} - {self.event.title}\"","","class UserPreferences(models.Model):","    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')","    theme_mode = models.CharField(max_length=10, default='light')","    created_at = models.DateTimeField(auto_now_add=True)","    updated_at = models.DateTimeField(auto_now=True)","","    def __str__(self):","        return f\"{self.user.username}'s preferences\"","","    class Meta:","        verbose_name_plural = 'User preferences'"],"id":9},{"start":{"row":1,"column":0},"end":{"row":114,"column":48},"action":"insert","lines":["from django.db import models","from django.contrib.auth.models import User","from django.utils.text import slugify","import os","","def event_image_path(instance, filename):","    # Generate path like: event_images/event_<id>/<filename>","    return f'event_images/event_{instance.event.id}/{filename}'","","class Event(models.Model):","    title = models.CharField(max_length=200)","    description = models.TextField()","    date = models.DateField()","    time = models.TimeField()","    location = models.CharField(max_length=200)","    capacity = models.PositiveIntegerField(null=True, blank=True)","    url_name = models.SlugField(max_length=250, unique=True)","    created_by = models.ForeignKey(","        User, ","        on_delete=models.CASCADE,","        related_name='created_events'","    )","    created_at = models.DateTimeField(auto_now_add=True)","    updated_at = models.DateTimeField(auto_now=True)","","    def save(self, *args, **kwargs):","        if not self.url_name:","            self.url_name = slugify(self.title)","        super().save(*args, **kwargs)","","    def __str__(self):","        return self.title","","    class Meta:","        ordering = ['date', 'time']","","class EventImage(models.Model):","    event = models.ForeignKey(","        Event,","        on_delete=models.CASCADE,","        related_name='images'","    )","    image = models.ImageField(upload_to=event_image_path)","    caption = models.CharField(max_length=200, blank=True)","    uploaded_by = models.ForeignKey(","        User,","        on_delete=models.SET_NULL,","        null=True","    )","    uploaded_at = models.DateTimeField(auto_now_add=True)","    is_primary = models.BooleanField(default=False)","","    class Meta:","        ordering = ['-is_primary', '-uploaded_at']","","    def __str__(self):","        return f\"Image for {self.event.title}\"","","    def save(self, *args, **kwargs):","        # If this is marked as primary, unmark other primary images","        if self.is_primary:","            EventImage.objects.filter(event=self.event, is_primary=True).update(is_primary=False)","        super().save(*args, **kwargs)","","    def delete(self, *args, **kwargs):","        # Delete the image file when the model instance is deleted","        if self.image:","            if os.path.isfile(self.image.path):","                os.remove(self.image.path)","        super().delete(*args, **kwargs)","","class Registration(models.Model):","    STATUS_CHOICES = [","        ('pending', 'Pending'),","        ('confirmed', 'Confirmed'),","        ('cancelled', 'Cancelled')","    ]","","    event = models.ForeignKey(","        Event,","        on_delete=models.CASCADE,","        related_name='registrations'","    )","    user = models.ForeignKey(","        User,","        on_delete=models.CASCADE,","        related_name='event_registrations'","    )","    status = models.CharField(","        max_length=20,","        choices=STATUS_CHOICES,","        default='pending'","    )","    registration_date = models.DateTimeField(auto_now_add=True)","    notes = models.TextField(blank=True)","","    class Meta:","        unique_together = ['event', 'user']","        ordering = ['registration_date']","","    def __str__(self):","        return f\"{self.user.username} - {self.event.title}\"","","class UserPreferences(models.Model):","    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')","    theme_mode = models.CharField(max_length=10, default='light')","    created_at = models.DateTimeField(auto_now_add=True)","    updated_at = models.DateTimeField(auto_now=True)","","    def __str__(self):","        return f\"{self.user.username}'s preferences\"","","    class Meta:","        verbose_name_plural = 'User preferences'"]}],[{"start":{"row":37,"column":0},"end":{"row":70,"column":39},"action":"remove","lines":["class EventImage(models.Model):","    event = models.ForeignKey(","        Event,","        on_delete=models.CASCADE,","        related_name='images'","    )","    image = models.ImageField(upload_to=event_image_path)","    caption = models.CharField(max_length=200, blank=True)","    uploaded_by = models.ForeignKey(","        User,","        on_delete=models.SET_NULL,","        null=True","    )","    uploaded_at = models.DateTimeField(auto_now_add=True)","    is_primary = models.BooleanField(default=False)","","    class Meta:","        ordering = ['-is_primary', '-uploaded_at']","","    def __str__(self):","        return f\"Image for {self.event.title}\"","","    def save(self, *args, **kwargs):","        # If this is marked as primary, unmark other primary images","        if self.is_primary:","            EventImage.objects.filter(event=self.event, is_primary=True).update(is_primary=False)","        super().save(*args, **kwargs)","","    def delete(self, *args, **kwargs):","        # Delete the image file when the model instance is deleted","        if self.image:","            if os.path.isfile(self.image.path):","                os.remove(self.image.path)","        super().delete(*args, **kwargs)"],"id":11},{"start":{"row":37,"column":0},"end":{"row":71,"column":39},"action":"insert","lines":["class EventImage(models.Model):","    event = models.ForeignKey(","        'Event',","        on_delete=models.CASCADE,","        related_name='images'","    )","    image = models.ImageField(upload_to=event_image_path)","    caption = models.CharField(max_length=200, blank=True)","    uploaded_by = models.ForeignKey(","        User,","        on_delete=models.SET_NULL,","        null=True","    )","    uploaded_at = models.DateTimeField(auto_now_add=True)","    order = models.IntegerField(default=0)  # New field for ordering","    is_primary = models.BooleanField(default=False)","","    class Meta:","        ordering = ['order', '-uploaded_at']","","    def __str__(self):","        return f\"Image for {self.event.title}\"","","    def save(self, *args, **kwargs):","        # If this is marked as primary, unmark other primary images","        if self.is_primary:","            EventImage.objects.filter(event=self.event, is_primary=True).update(is_primary=False)","        super().save(*args, **kwargs)","","    def delete(self, *args, **kwargs):","        # Delete the image file when the model instance is deleted","        if self.image:","            if os.path.isfile(self.image.path):","                os.remove(self.image.path)","        super().delete(*args, **kwargs)"]}],[{"start":{"row":6,"column":0},"end":{"row":8,"column":63},"action":"remove","lines":["def event_image_path(instance, filename):","    # Generate path like: event_images/event_<id>/<filename>","    return f'event_images/event_{instance.event.id}/{filename}'"],"id":12}],[{"start":{"row":5,"column":0},"end":{"row":6,"column":0},"action":"remove","lines":["",""],"id":13},{"start":{"row":4,"column":9},"end":{"row":5,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":32,"column":0},"end":{"row":33,"column":0},"action":"insert","lines":["",""],"id":14}],[{"start":{"row":33,"column":0},"end":{"row":35,"column":63},"action":"insert","lines":["def event_image_path(instance, filename):","    # Generate path like: event_images/event_<id>/<filename>","    return f'event_images/event_{instance.event.id}/{filename}'"],"id":15}],[{"start":{"row":35,"column":63},"end":{"row":36,"column":0},"action":"insert","lines":["",""],"id":16},{"start":{"row":36,"column":0},"end":{"row":36,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":33,"column":0},"end":{"row":35,"column":63},"action":"remove","lines":["def event_image_path(instance, filename):","    # Generate path like: event_images/event_<id>/<filename>","    return f'event_images/event_{instance.event.id}/{filename}'"],"id":17},{"start":{"row":33,"column":0},"end":{"row":35,"column":63},"action":"insert","lines":["def event_image_path(instance, filename):","    # Generate path like: event_images/event_<id>/<filename>","    return f'event_images/event_{instance.event.id}/{filename}'"]}],[{"start":{"row":37,"column":0},"end":{"row":71,"column":39},"action":"remove","lines":["class EventImage(models.Model):","    event = models.ForeignKey(","        'Event',","        on_delete=models.CASCADE,","        related_name='images'","    )","    image = models.ImageField(upload_to=event_image_path)","    caption = models.CharField(max_length=200, blank=True)","    uploaded_by = models.ForeignKey(","        User,","        on_delete=models.SET_NULL,","        null=True","    )","    uploaded_at = models.DateTimeField(auto_now_add=True)","    order = models.IntegerField(default=0)  # New field for ordering","    is_primary = models.BooleanField(default=False)","","    class Meta:","        ordering = ['order', '-uploaded_at']","","    def __str__(self):","        return f\"Image for {self.event.title}\"","","    def save(self, *args, **kwargs):","        # If this is marked as primary, unmark other primary images","        if self.is_primary:","            EventImage.objects.filter(event=self.event, is_primary=True).update(is_primary=False)","        super().save(*args, **kwargs)","","    def delete(self, *args, **kwargs):","        # Delete the image file when the model instance is deleted","        if self.image:","            if os.path.isfile(self.image.path):","                os.remove(self.image.path)","        super().delete(*args, **kwargs)"],"id":18},{"start":{"row":37,"column":0},"end":{"row":83,"column":9},"action":"insert","lines":["class EventImage(models.Model):","    event = models.ForeignKey(","        'Event',","        on_delete=models.CASCADE,","        related_name='images'","    )","    image = models.ImageField(upload_to=event_image_path)","    caption = models.CharField(max_length=200, blank=True)","    uploaded_by = models.ForeignKey(","        User,","        on_delete=models.SET_NULL,","        null=True","    )","    uploaded_at = models.DateTimeField(auto_now_add=True)","    order = models.IntegerField(default=0)","    is_primary = models.BooleanField(default=False)","","    class Meta:","        ordering = ['order', '-uploaded_at']","","    def save(self, *args, **kwargs):","        # If this is a new image (no ID yet), set order to the next available number","        if not self.id:","            max_order = self.event.images.aggregate(models.Max('order'))['order__max']","            self.order = 0 if max_order is None else max_order + 1","","        # If this is marked as primary, unmark other primary images","        if self.is_primary:","            EventImage.objects.filter(event=self.event, is_primary=True).update(is_primary=False)","            ","        super().save(*args, **kwargs)","","    def delete(self, *args, **kwargs):","        # Delete the image file when the model instance is deleted","        if self.image:","            if os.path.isfile(self.image.path):","                os.remove(self.image.path)","        ","        # Get the current order before deletion","        current_order = self.order","        ","        super().delete(*args, **kwargs)","        ","        # Update the order of remaining images","        self.event.images.filter(order__gt=current_order).update(","            order=models.F('order') - 1","        )"]}],[{"start":{"row":33,"column":0},"end":{"row":83,"column":9},"action":"remove","lines":["def event_image_path(instance, filename):","    # Generate path like: event_images/event_<id>/<filename>","    return f'event_images/event_{instance.event.id}/{filename}'","    ","class EventImage(models.Model):","    event = models.ForeignKey(","        'Event',","        on_delete=models.CASCADE,","        related_name='images'","    )","    image = models.ImageField(upload_to=event_image_path)","    caption = models.CharField(max_length=200, blank=True)","    uploaded_by = models.ForeignKey(","        User,","        on_delete=models.SET_NULL,","        null=True","    )","    uploaded_at = models.DateTimeField(auto_now_add=True)","    order = models.IntegerField(default=0)","    is_primary = models.BooleanField(default=False)","","    class Meta:","        ordering = ['order', '-uploaded_at']","","    def save(self, *args, **kwargs):","        # If this is a new image (no ID yet), set order to the next available number","        if not self.id:","            max_order = self.event.images.aggregate(models.Max('order'))['order__max']","            self.order = 0 if max_order is None else max_order + 1","","        # If this is marked as primary, unmark other primary images","        if self.is_primary:","            EventImage.objects.filter(event=self.event, is_primary=True).update(is_primary=False)","            ","        super().save(*args, **kwargs)","","    def delete(self, *args, **kwargs):","        # Delete the image file when the model instance is deleted","        if self.image:","            if os.path.isfile(self.image.path):","                os.remove(self.image.path)","        ","        # Get the current order before deletion","        current_order = self.order","        ","        super().delete(*args, **kwargs)","        ","        # Update the order of remaining images","        self.event.images.filter(order__gt=current_order).update(","            order=models.F('order') - 1","        )"],"id":19},{"start":{"row":33,"column":0},"end":{"row":66,"column":39},"action":"insert","lines":["def event_image_path(instance, filename):","    return f'event_images/event_{instance.event.id}/{filename}'","    ","class EventImage(models.Model):","    event = models.ForeignKey(","        'Event',","        on_delete=models.CASCADE,","        related_name='images'","    )","    image = models.ImageField(upload_to=event_image_path)","    caption = models.CharField(max_length=200, blank=True)","    uploaded_by = models.ForeignKey(","        User,","        on_delete=models.SET_NULL,","        null=True","    )","    uploaded_at = models.DateTimeField(auto_now_add=True)","    is_primary = models.BooleanField(default=False)","","    class Meta:","        ordering = ['-uploaded_at']","","    def save(self, *args, **kwargs):","        # If this is marked as primary, unmark other primary images","        if self.is_primary:","            EventImage.objects.filter(event=self.event, is_primary=True).update(is_primary=False)","        super().save(*args, **kwargs)","","    def delete(self, *args, **kwargs):","        # Delete the image file when the model instance is deleted","        if self.image:","            if os.path.isfile(self.image.path):","                os.remove(self.image.path)","        super().delete(*args, **kwargs)"]}]]},"timestamp":1733454381599}