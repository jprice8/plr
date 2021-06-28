from django.http.response import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from django.contrib.auth import get_user_model

from .serializers import UserSerializer, ProfileSerializer
from .models import Profile


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


class ProfileDetailView(APIView):
    """
    Retrieve or update a profile instance
    """
    def get_object(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)