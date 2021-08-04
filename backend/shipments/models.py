from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.conf import settings

from reset.models import Itemreset


class Flag(models.Model):
    reset = models.OneToOneField(Itemreset, related_name='flags', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_flag = models.CharField(default='Yes', max_length=3)


class Message(models.Model):
    reset = models.ForeignKey(Itemreset, related_name='reset_message', on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='receiver', on_delete=models.CASCADE)
    msg_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Shipping(models.Model):
    reset_ids = ArrayField(models.IntegerField(blank=True), null=True, default=list)
    week = models.IntegerField(null=False)
    year = models.IntegerField(null=False)
    facility_code = models.CharField(max_length=3, null=False)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='shipping_sender', on_delete=models.CASCADE)
    tracking_number = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
