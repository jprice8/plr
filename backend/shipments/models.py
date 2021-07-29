from django.db import models
from django.conf import settings

from reset.models import Itemreset


class Flag(models.Model):
    reset = models.OneToOneField(Itemreset, related_name='flags', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)