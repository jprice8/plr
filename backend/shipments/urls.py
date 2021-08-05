from django.urls import path 

import shipments.views as views


app_name = 'shipments'
urlpatterns = [
    path('', views.ShipmentsList.as_view(), name='list'),
    path('<int:pk>/', views.ShipmentsDetail.as_view(), name='detail'),

    # Export urls
    path('export/', views.ShipmentsExport.as_view({'get': 'list'}), name='export'),

    # Flag urls
    path('flag/', views.FlagList.as_view(), name='flag_list'),
    path('flag/<int:pk>/', views.FlagDetail.as_view(), name='flag_detail'),

    # Message urls
    path('message/', views.MessageList.as_view(), name='message_list'),

    # Timeline urls
    path('timeline/<int:pk>/', views.Timeline.as_view(), name='timeline'),
]