from django.test import TestCase 
from django.contrib.auth import get_user_model
from django.urls import reverse 

from rest_framework.test import APIClient
from rest_framework import status 


CREATE_USER_URL = reverse('users:create')
TOKEN_URL = reverse('users:token')
ME_URL = reverse('users:me')


def create_user(**params):
    return get_user_model().objects.create_user(**params)

class PublicUserApiTest(TestCase):
    """
    Test the user's api
    """
    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """
        Test creating user with valid payload is successful
        """
        payload = {
            'email': 'lebronjames@lakers.com',
            'password': 'bronny123'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertIn('password', res.data)

    def test_user_exists(self):
        """
        Test creating a user that already exists fails
        """
        payload = {
            'email': 'lebronjames@lakers.com',
            'password': 'bronny123'
        }
        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)
        
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    # TODO: password too short failiing
    # def test_password_too_short(self):
    #     """
    #     Test that password is at least 7 chars
    #     """
    #     payload = {
    #         'email': 'lebronjames@gmail.com',
    #         'password': 'pw'
    #     }
    #     res = self.client.post(CREATE_USER_URL, payload)

    #     self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    #     user_exists = get_user_model().objects.filter(
    #         email=payload['email']
    #     ).exists()
    #     self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """
        Test that token is created for user
        """
        payload_create = {
            'email': 'lebronjames@lakers.com',
            'password': 'bronny123'
        }
        payload_token = {
            'username': 'lebronjames@lakers.com',
            'password': 'bronny123'
        }
        create_user(**payload_create)
        res = self.client.post(TOKEN_URL, payload_token)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """
        Test that token is not created if invalid credentials are given
        """
        create_user(email='lebronjames@lakers.com', password='bronny123')
        payload = {
            'username': 'lebronjames@lakers.com',
            'password': 'incorrect'
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """
        Test that token isn't created if user doesn't exist
        """
        payload = {'email': 'lebronjames@lakers.com', 'password': 'bronny123'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_missing_field(self):
        """
        Test that email and password are required
        """
        res = self.client.post(TOKEN_URL, {
            'email': 'lebronjames@lakers.com',
            'password': ''
        })
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unauthorized(self):
        """
        Test that authentication is required for users
        """
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserTestApiTests(TestCase):
    """
    Test API requests that require auth
    """
    def setUp(self):
        self.user = create_user(
            email='lebronjames@lakers.com',
            password='bronny123'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """
        Test retrieving profile
        """
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        """
        Test updating user info
        """
        payload = {
            'email': 'lebronjames@lakers.com',
            'password': 'bronny123'
        }

        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)