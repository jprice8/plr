from django.urls import path 

import shipments.views as views


app_name = 'shipments'
urlpatterns = [
    path('', views.ShipmentsList.as_view(), name='list'),
    path('<int:pk>/', views.ShipmentsDetail.as_view(), name='detail'),
]