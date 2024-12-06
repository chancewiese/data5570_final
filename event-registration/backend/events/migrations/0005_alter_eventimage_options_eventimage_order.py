# Generated by Django 5.1.3 on 2024-12-05 23:48
# 0005_alter_eventimage_options_eventimage_order.py

from django.db import migrations, models

def set_image_orders(apps, schema_editor):
    Event = apps.get_model('events', 'Event')
    for event in Event.objects.all():
        for i, image in enumerate(event.images.all()):
            image.order = i
            image.save()

def reverse_image_orders(apps, schema_editor):
    EventImage = apps.get_model('events', 'EventImage')
    EventImage.objects.all().update(order=0)

class Migration(migrations.Migration):
    dependencies = [
        ('events', '0004_eventimage'),  # Update this to your actual previous migration
    ]

    operations = [
        migrations.AlterModelOptions(
            name='eventimage',
            options={'ordering': ['order', '-uploaded_at']},
        ),
        migrations.AddField(
            model_name='eventimage',
            name='order',
            field=models.IntegerField(default=0),
        ),
        migrations.RunPython(set_image_orders, reverse_image_orders),
    ]