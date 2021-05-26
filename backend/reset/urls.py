#type:ignore
from django.urls import path 

import reset.views as views


app_name = 'reset'
urlpatterns = [
    # Get pars list
    path('', views.ParsList.as_view(), name='pars-list'),
]