# Generated by Django 3.2.3 on 2021-07-05 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reset', '0017_alter_itemreset_last_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='par',
            name='adjustments_52_weeks',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='par',
            name='awa',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='par',
            name='awi',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='par',
            name='issues_52_weeks',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='par',
            name='safety',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]