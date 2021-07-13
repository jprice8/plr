#type:ignore
from django.urls import path 

import dashboard.views as views 


app_name = 'dashboard'
urlpatterns = [
    # Review itemresets
	path('stats/', views.DashboardStats.as_view(), name='stats'),
	path('stats/resets/', views.DashboardStatsList.as_view(), name='list'),
	path('stats/resets/<int:pk>', views.DashboardStatDetail.as_view(), name='detail'),
    # Export itemresets
    path('stats/resets/export/', views.DashboardStatsListExport.as_view({'get': 'list'}), name='export'),

    # Dashboard charts
	path('chart/', views.DashboardWeeklyReductionChart.as_view(), name='chart')
]