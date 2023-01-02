from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from django.http.response import Http404
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created

from .serializers import UserSerializer, ProfileSerializer
from .models import Profile


class CreateUserView(generics.CreateAPIView):
    """
    Create new user in the system
    """
    serializer_class = UserSerializer


# class UserList(generics.ListAPIView):
#     """
#     Return all users in the system
#     """
#     # permission_classes = (IsAuthenticated,)

#     queryset = get_user_model().objects.all()
#     serializer_class = UserSerializer


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


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    """
    context = {
        'current_user': reset_password_token.user,
        'email': reset_password_token.user.email,
        #TODO: Change the hostname and port to the new domain name
        'frontend_url': 'http://parlevelreset.com/resetPassword/confirm/{}'.format(reset_password_token.key),
        'reset_password_url': '{}?token={}'.format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key
        )
    }

    email_html_message = render_to_string('users/user_reset_password.html', context)
    email_plaintext_message = render_to_string('users/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # subject
        "Password reset for {title}".format(title="Par Level Reset"),
        # message
        email_plaintext_message,
        # from
        'example@gmail.com',
        # to
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
