# Generated by Django 5.1.3 on 2024-11-13 03:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='capacity',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]