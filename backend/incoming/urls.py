from django.urls import path 

import incoming.views as views


app_name = 'incoming'
urlpatterns = [
    # Incoming urls
    path('', views.IncomingList.as_view(), name='list'),
    path('<int:pk>/', views.IncomingResetList.as_view(), name='incoming_reset_list'),

    # Export urls
    path('export/', views.IncomingExport.as_view({'get': 'list'}), name='incoming_export'),
    path('export/<int:pk>/', views.IncomingResetExport.as_view({'get': 'list'}), name='incoming_reset_export'),
    path('shipping/export/', views.ShippingExport.as_view({'get': 'list'}), name='shipping_export'),

    # Confirmation urls
    path('checkShip/', views.CheckForShipping.as_view(), name='check_shipping'),
    path('confirm/', views.ConfirmationList.as_view(), name='confirmation_list'),
    path('confirm/create/', views.ShippingList.as_view(), name='shipping_list'),
    path('confirm/update/<int:pk>/', views.ShippingDetail.as_view(), name='shipping_detail'),
]