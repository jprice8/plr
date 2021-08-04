from django.urls import path 

import shipments.views as views


app_name = 'shipments'
urlpatterns = [
    path('', views.ShipmentsList.as_view(), name='list'),
    path('<int:pk>/', views.ShipmentsDetail.as_view(), name='detail'),

    # Export urls
    path('export/', views.ShipmentsExport.as_view({'get': 'list'}), name='export'),
    path('shipping/export/', views.ShippingExport.as_view({'get': 'list'}), name='shipping_export'),
    path('incoming/export/<int:pk>/', views.IncomingExport.as_view({'get': 'list'}), name='incoming_export'),

    # Flag urls
    path('flag/', views.FlagList.as_view(), name='flag_list'),
    path('flag/<int:pk>/', views.FlagDetail.as_view(), name='flag_detail'),

    # Message urls
    path('message/', views.MessageList.as_view(), name='message_list'),

    # Confirmation urls
    path('checkShip/', views.CheckForShipping.as_view(), name='check_shipping'),
    path('confirm/', views.ConfirmationList.as_view(), name='confirmation_list'),
    path('confirm/create/', views.ShippingList.as_view(), name='shipping_list'),

    # Incoming urls
    path('incoming/', views.IncomingList.as_view(), name='incoming_list'),
    path('incoming/<int:pk>/', views.IncomingResetList.as_view(), name='incoming_reset_list'),
]