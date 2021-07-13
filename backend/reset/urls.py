#type:ignore
from django.urls import path 

import reset.views as views


app_name = 'reset'
urlpatterns = [
    # Pars list
    path('par/', views.ParList.as_view(), name='pars'),
    # Individual pars
    path('par/<int:pk>/', views.par_detail, name='par'),

    # Itemreset list
    path('itemreset/', views.ItemresetList.as_view(), name='itemresets'),
    # Individual itemreset
    path('itemreset/<int:pk>/', views.itemresest_detail, name='itemreset'),

    # Paginated weekly list
    path('weeks/', views.WeeklySubmissions.as_view(), name='weeks'),
]