#type:ignore
from django.db.models import query
from django.shortcuts import render
from rest_framework import status, generics
from rest_framework import serializers
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from reset.models import Par, Itemreset

from .serializers import StatItemresetDetailSerializer, StatItemresetSerializer

class DashboardStats(APIView):
	"""
	Return an object for the three dashboard metrics
	"""
	permission_classes = [IsAuthenticated]

	def calc_total_reduction(self, req):
		"""
		Iterate through the user's itemresets to sum the
		extended cost of the on hand inventory reduced.
		Shows the user how much on hand inventory they are reducing from
		par locations.
		"""
		itemresets = Itemreset.objects.filter(user=req.user)

		total_reduction_ext = 0
		for i in itemresets:
			total_reduction_ext += i.calc_ext_reduction()
		
		return total_reduction_ext

	def calc_weeks_completed(self, req):
		"""
		Iterate through the user's itemresets to count the unique
		week numbers shown. Shows the consistency with which the user is
		completing resets.
		"""
		itemresets = Itemreset.objects.filter(user=req.user)

		weeks_completed = []
		for i in itemresets:
			weeks_completed.append(i.week)

		weeks_completed = len(list(set(weeks_completed)))
		return weeks_completed

	def calc_pars_reduced(self, req):
		"""
		Iterate through the user's itemresets to count the number of
		individual par locations have been reset. Show's the user how 
		many individual resets they have completed.
		"""
		itemresets = Itemreset.objects.filter(user=req.user)
		pars_reduced = []
		for i in itemresets:
			pars_reduced.append(i.par.id)
		
		return len(pars_reduced)

	def get(self, request, format=None):
		total_reduction = self.calc_total_reduction(req=request)
		weeks_completed = self.calc_weeks_completed(req=request)
		pars_reduced = self.calc_pars_reduced(req=request)

		data = [
			{
				'id': 1,
				'metric': 'On Hand Ext Reduced',
				'value': total_reduction,
				'icon': 'CashIcon',
			},
			{
				'id': 2,
				'metric': 'Weeks Completed',
				'value': weeks_completed,
				'icon': 'ClockIcon',
			},
			{
				'id': 3,
				'metric': 'Pars Reduced',
				'value': pars_reduced,
				'icon': 'TrendingDownIcon',
			}
		]

		return Response(data)


class DashboardStatsList(generics.ListAPIView):
	"""
	View to list all of the user's itemresets combined with information
	on the respective par.
	"""
	permission_classes = [IsAuthenticated]
	queryset = Itemreset.objects.all()
	serializer_class = StatItemresetSerializer

	def list(self, request):
		queryset = self.get_queryset().filter(user=request.user)
		serializer = StatItemresetSerializer(queryset, many=True)
		return Response(serializer.data)


class DashboardStatDetail(generics.RetrieveAPIView):
	"""
	Retrieve a specific itemreset to view it's information as well 
	as it's related par information.
	"""
	permission_classes = [IsAuthenticated]
	queryset = Itemreset.objects.all()
	serializer_class = StatItemresetDetailSerializer

