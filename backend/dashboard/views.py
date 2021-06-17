#type:ignore
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from reset.models import Par, Itemreset


class DashboardStats(APIView):
	"""
	Return an object for the three dashboard metrics
	"""
	def calc_total_reduction(self):
		data = [
			{
				'id': 1,
				'metric': 'total_reduction',
				'value': 100,
				'icon': 'CashIcon'
			},
			{
				'id': 2,
				'metric': 'weeks_completed',
				'value': 1,
				'icon': 'ClockIcon'
			},
			{
				'id': 3,
				'metric': 'pars_reduced',
				'value': 3,
				'icon': 'TrendingDownIcon'
			}
		]
		return data

	def get(self, request, format=None):
		data = self.calc_total_reduction()
		return Response(data)

