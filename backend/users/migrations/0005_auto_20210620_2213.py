# Generated by Django 3.2.3 on 2021-06-21 03:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_profile_timestamp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='timestamp',
        ),
        migrations.AlterField(
            model_name='profile',
            name='facility_code',
            field=models.CharField(blank=True, max_length=4),
        ),
        migrations.AlterField(
            model_name='profile',
            name='first_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='profile',
            name='last_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='profile',
            name='phone',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='profile',
            name='title',
            field=models.CharField(blank=True, default='default', max_length=100),
            preserve_default=False,
        ),
    ]