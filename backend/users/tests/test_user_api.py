import json
import datetime
# import tempfile

from django.test import TestCase 
from django.contrib.auth import get_user_model
from django.urls import reverse 
from django.core.files.uploadedfile import SimpleUploadedFile

import pytest

from rest_framework.test import APIClient, APITestCase
from rest_framework import status

from users.models import Profile


CREATE_USER_URL = reverse('users:create')
TOKEN_URL = reverse('users:token')
ME_URL = reverse('users:me')


def create_user(**params):
    return get_user_model().objects.create_user(**params)

@pytest.mark.django_db
class PublicUserApiTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        get_user_model().objects.create()

    def test_create_valid_user_success(self):
        """
        Test creating user with valid payload is successful
        """
        # image = tempfile.NamedTemporaryFile(suffix=".jpg").name
        # image = SimpleUploadedFile(
        #     'faker_file.jpg',
        #     b"these are the file contents"
        # )
        payload = {
            'email': 'lebronjames@lakers.com',
            'password': 'bronny123',
            'first_name': 'lebron',
            'last_name': 'james',
            'facility_code': '872',
            'title': 'DMM',
            'phone': '281-555-1234',
            # 'profile_picture': image,
            'joined_on': datetime.datetime.today()
        }
        # pytest.set_trace()
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)


@pytest.mark.django_db
class PrivateUserApiTest(APITestCase):
    def setUp(self):
        self.user = create_user(
            email='randysavage@woo.com',
            password='Show1234',
        )
        p1 = Profile.objects.create(
            user_id=self.user.id,
            first_name='randy',
            last_name='savage',
            facility_code='872',
            title='DMM',
            phone='210-555-1234'
        )
        self.user.profile = p1
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.profile_url = reverse('users:profile', kwargs={'pk': self.user.profile.id})
        self.password_reset_request_url = reverse('password_reset:reset-password-request')


    def test_get_user_object(self):
        """
        Test retrieving user object
        """
        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_user_profile(self):
        """
        Test retrieving user profile object
        """
        res = self.client.get(self.profile_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_user_profile(self):
        """
        Test updating a single field in the profile object
        """
        payload = {
            'first_name': 'Randall'
        }
        res = self.client.put(self.profile_url, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_password_reset_token(self):
        """
        Test the ability to retrieve a password reset token for an email
        """
        payload = {
            'email': 'randysavage@woo.com'
        }
        res = self.client.post(self.password_reset_request_url, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    # def test_user_exists(self):
    #     """
    #     Test creating a user that already exists fails
    #     """
    #     payload = {
    #         'email': 'lebronjames@lakers.com',
    #         'password': 'bronny123',
    #         'first_name': 'lebron',
    #         'last_name': 'james',
    #         'facility_code': '872',
    #         'title': 'DMM',
    #         'phone': '281-555-1234',
    #         # 'profile_picture': image,
    #         'joined_on': datetime.datetime.today()
    #     }
    #     create_user(**payload)

    #     res = self.client.post(CREATE_USER_URL, payload)
    #     self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

#     # TODO: password too short failiing
#     # def test_password_too_short(self):
#     #     """
#     #     Test that password is at least 7 chars
#     #     """
#     #     payload = {
#     #         'email': 'lebronjames@gmail.com',
#     #         'password': 'pw'
#     #     }
#     #     res = self.client.post(CREATE_USER_URL, payload)

#     #     self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
#     #     user_exists = get_user_model().objects.filter(
#     #         email=payload['email']
#     #     ).exists()
#     #     self.assertFalse(user_exists)

    # def test_create_token_for_user(self):
    #     """
    #     Test that token is created for user
    #     """
    #     payload_create = {
    #         'email': 'lebronjames@lakers.com',
    #         'password': 'bronny123'
    #     }
    #     payload_token = {
    #         'username': 'lebronjames@lakers.com',
    #         'password': 'bronny123'
    #     }
    #     create_user(**payload_create)
    #     res = self.client.post(TOKEN_URL, payload_token)

#         self.assertIn('token', res.data)
#         self.assertEqual(res.status_code, status.HTTP_200_OK)

#     def test_create_token_invalid_credentials(self):
#         """
#         Test that token is not created if invalid credentials are given
#         """
#         create_user(email='lebronjames@lakers.com', password='bronny123')
#         payload = {
#             'username': 'lebronjames@lakers.com',
#             'password': 'incorrect'
#         }
#         res = self.client.post(TOKEN_URL, payload)
#         self.assertNotIn('token', res.data)
#         self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_create_token_no_user(self):
#         """
#         Test that token isn't created if user doesn't exist
#         """
#         payload = {'email': 'lebronjames@lakers.com', 'password': 'bronny123'}
#         res = self.client.post(TOKEN_URL, payload)

#         self.assertNotIn('token', res.data)
#         self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_create_token_missing_field(self):
#         """
#         Test that email and password are required
#         """
#         res = self.client.post(TOKEN_URL, {
#             'email': 'lebronjames@lakers.com',
#             'password': ''
#         })
#         self.assertNotIn('token', res.data)
#         self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_retrieve_user_unauthorized(self):
#         """
#         Test that authentication is required for users
#         """
#         res = self.client.get(ME_URL)

#         self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# class PrivateUserTestApiTests(TestCase):
#     """
#     Test API requests that require auth
#     """
#     def setUp(self):
#         self.user = create_user(
#             email='lebronjames@lakers.com',
#             password='bronny123'
#         )
#         self.client = APIClient()
#         self.client.force_authenticate(user=self.user)

#     def test_retrieve_profile_success(self):
#         """
#         Test retrieving profile
#         """
#         res = self.client.get(ME_URL)

#         self.assertEqual(res.status_code, status.HTTP_200_OK)

#     def test_update_user(self):
#         """
#         Test updating user info
#         """
#         payload = {
#             'email': 'lebronjames@lakers.com',
#             'password': 'bronny123'
#         }

#         res = self.client.patch(ME_URL, payload)

#         self.user.refresh_from_db()
#         self.assertTrue(self.user.check_password(payload['password']))
#         self.assertEqual(res.status_code, status.HTTP_200_OK)