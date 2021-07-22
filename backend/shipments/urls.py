from django.urls import path 

import shipments.views as views


app_name = 'shipments'
urlpatterns = [
    path('', views.ShipmentsList.as_view(), name='shipments'),
]