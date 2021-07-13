# Generated by Django 3.2.3 on 2021-06-25 21:27

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20210620_2213'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='profile_picture',
            field=models.ImageField(default='profile_pictures/default.jpg', upload_to=users.models.upload_to, verbose_name='Image'),
        ),
    ]