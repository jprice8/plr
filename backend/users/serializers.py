from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Profile


# class ProfileSerializer(serializers.ModelSerializer):
#     """
#     Serializer for Profile Object
#     """
#     class Meta:
#         model = Profile
#         fields = ('first_name', 'last_name', 'facility_code', 'title', 'phone' )


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User object
    """
    first_name = serializers.CharField(max_length=100, allow_blank=True, source="profile.first_name")
    last_name = serializers.CharField(max_length=100, allow_blank=True, source="profile.last_name")
    facility_code = serializers.CharField(max_length=4, allow_blank=True, source="profile.facility_code")
    title = serializers.CharField(max_length=100, allow_blank=True, source="profile.title")
    phone = serializers.CharField(max_length=100, allow_blank=True, source="profile.phone")

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'facility_code', 'title', 'phone')

    def create(self, validated_data):
        """
        Create a new user with encrypted password and return it
        """
        profile_data = validated_data.pop('profile')
        user = get_user_model().objects.create_user(**validated_data)
        user.save()
        # profile = Profile(
        #     user=user,
        #     first_name=profile_data['first_name'],
        #     last_name=profile_data['last_name'],
        #     facility_code=profile_data['facility_code'],
        #     title=profile_data['title'],
        #     phone=profile_data['phone']
        # )
        # profile.save()
        Profile.objects.update_or_create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        """
        Update a user, setting the password correctly and return it
        """
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        
        return user
