from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for Profile Object
    """
    class Meta:
        model = Profile
        optional_fields = ['profile_picture']
        fields = ('first_name', 'last_name', 'facility_code', 'title', 'phone', 'profile_picture')


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User object
    """
    first_name = serializers.CharField(max_length=100, allow_blank=True, source="profile.first_name")
    last_name = serializers.CharField(max_length=100, allow_blank=True, source="profile.last_name")
    facility_code = serializers.CharField(max_length=4, allow_blank=True, source="profile.facility_code")
    title = serializers.CharField(max_length=100, allow_blank=True, source="profile.title")
    phone = serializers.CharField(max_length=100, allow_blank=True, source="profile.phone")
    profile_picture = serializers.ImageField(source="profile.profile_picture")
    joined_on = serializers.DateTimeField(required=False, source="profile.joined_on")
    profile_id = serializers.IntegerField(required=False, source="profile.id")

    class Meta:
        model = get_user_model()
        optional_fields = ['profile_picture', 'joined_on', 'profile_id']
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'facility_code', 'title', 'phone', 'profile_picture', 'joined_on', 'profile_id')

    def create(self, validated_data):
        """
        Create a new user with encrypted password and return it
        """
        print(validated_data)
        profile_data = validated_data.pop('profile')
        user = get_user_model().objects.create_user(**validated_data)
        user.save()
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
