# Generated by Django 3.2.3 on 2021-07-05 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reset', '0018_auto_20210705_1719'),
    ]

    operations = [
        migrations.AddField(
            model_name='par',
            name='market',
            field=models.CharField(default='default', max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='par',
            name='mfr_cat',
            field=models.CharField(default='default', max_length=150),
            preserve_default=False,
        ),
    ]