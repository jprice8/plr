#type:ignore
from django.urls import path 
from rest_framework.authtoken.views import obtain_auth_token

import users.views as views

urlpatterns = [
    # Get user list
    path('', views.UserList.as_view(), name='user_list'),

    # Create user
    path('create/', views.CreateUserView.as_view(), name='create'),

    # Login with email/password and receive access token
    path('token/', obtain_auth_token, name='api_token_auth'),

    # Get the user
    path('me/', views.GetUser.as_view(), name='me'),

    path('hello/', views.HelloView.as_view(), name='hello'),
]