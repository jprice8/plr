#type:ignore
from django.urls import path 

import dashboard.views as views 


app_name = 'dashboard'
urlpatterns = [
	path('stats/', views.DashboardStats.as_view(), name='stats'),
	path('stats/resets/', views.DashboardStatsList.as_view(), name='list'),
	path('stats/resets/<int:pk>', views.DashboardStatDetail.as_view(), name='detail'),

	path('chart/', views.DashboardWeeklyReductionChart.as_view(), name='chart')
]