#type:ignore
from django.db.models import query
from users.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from django.contrib.auth import get_user_model

from .serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
    """
    Create new user in the system
    """
    serializer_class = UserSerializer


class UserList(generics.ListAPIView):
    """
    Return all users in the system
    """
    # permission_classes = (IsAuthenticated,)

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class GetUser(generics.RetrieveUpdateAPIView):
    """
    Return the user's object
    """
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, world!'}
        return Response(content)
