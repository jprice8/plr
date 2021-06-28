#type:ignore
from django.urls import path 
from rest_framework.authtoken.views import obtain_auth_token

import users.views as views


app_name = 'users'
urlpatterns = [
    # Get user list
    path('', views.UserList.as_view(), name='user_list'),

    # Create user
    path('create/', views.CreateUserView.as_view(), name='create'),

    # Login with email/password and receive access token
    path('token/', obtain_auth_token, name='token'),

    # Get the user
    path('me/', views.GetUser.as_view(), name='me'),

    # GET or PUT/PATCH the profile instance
    path('<int:pk>/profile/', views.ProfileDetailView.as_view(), name='profile')
]

