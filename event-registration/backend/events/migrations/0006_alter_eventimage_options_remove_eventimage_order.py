# Generated by Django 5.1.3 on 2024-12-06 03:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0005_alter_eventimage_options_eventimage_order'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='eventimage',
            options={'ordering': ['-uploaded_at']},
        ),
        migrations.RemoveField(
            model_name='eventimage',
            name='order',
        ),
    ]
