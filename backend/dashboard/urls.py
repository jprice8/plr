#type:ignore
from django.urls import path 

import dashboard.views as views 


app_name = 'dashboard'
urlpatterns = [
	path('stats/', views.DashboardStats.as_view(), name='stats'),
]