from django.db import models
from django.conf import settings

from reset.models import Itemreset


class Flag(models.Model):
    reset = models.OneToOneField(Itemreset, related_name='flags', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    reset = models.ForeignKey(Itemreset, related_name='reset_message', on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='receiver', on_delete=models.CASCADE)
    msg_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
