from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import generics

from .serializers import ParSerializer
from .models import Par


class ParsList(generics.ListAPIView):
    """
    Return all PARs in the system
    """
    serializer_class = ParSerializer
    queryset = Par.objects.all()