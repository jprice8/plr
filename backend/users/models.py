from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from rest_framework import authentication


def upload_to(instance, filename):
    return 'profile_pictures/{filename}'.format(filename=filename)


class UserManager(BaseUserManager):
    """
    Define a model manager for User model with no username field.
    """
    use_in_migrations = True 

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a regular User with the given email and password.
        """
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):

    username = None 
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()


class BearerAuthentication(authentication.TokenAuthentication):
    """
    Clients should authenticate by passing the token key in the 'Authorization'
    HTTP header, prepended with the string 'Bearer '.

    Ex.
    Authorization: Bearer xxxxx-xxxxx-xxxxx
    """
    keyword = 'Bearer'


class Profile(models.Model):
    """
    The Profile is a one-to-one child of the User model.
    It holds descriptive information of the user that is not
    auth related.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    facility_code = models.CharField(max_length=4, blank=True)
    title = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(_("Image"), upload_to=upload_to, default='profile_pictures/default.jpg', blank=True)
    joined_on = models.DateTimeField(auto_now_add=True)

    #IAM
    satx_acute = 'satx_acute'
    satx_dc = 'satx_dc'
    resolute = 'resolute'
    west_acute = 'west_acute'
    IAM_CHOICES = [ 
        (satx_acute, 'satx_acute'),
        (satx_dc, 'satx_dc'),
        (resolute, 'resolute'),
        (west_acute, 'west_acute'),
    ]
    iam = models.CharField(max_length=50, choices=IAM_CHOICES, default=satx_acute, blank=True)
