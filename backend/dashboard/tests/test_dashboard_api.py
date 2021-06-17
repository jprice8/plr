import datetime

from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status 
from django.contrib.auth import get_user_model

from reset.models import Par, Itemreset


PARS_URL = reverse('reset:pars')
ITEMRESETS_URL = reverse('reset:itemresets')

DASHBOARD_STATS_URL = reverse('dashboard:stats')

def create_user(**params):
    return get_user_model().objects.create_user(**params)

class DashboardTest(TestCase):
	"""
	Test the dashboard API
	"""
	def setUp(self):
		self.user = create_user(
			email='lebronjames@lakers.com',
			password='bronny123'
		)
		self.client = APIClient()
		self.client.force_authenticate(user=self.user)

		# Create a par
		today = datetime.date(2021, 5, 25)
		payload = {
			'facility_code': '872',
			'location_id': '84',
			'location_name': 'SURGERY PAR/STOREROOM',
			'description': 'SEALER, VESSEL ENDOWRIST ONE 8MM DAVINCI',
			'imms': '123456',
			'uom_conv_factor': 1,
			'uom': 'EA',
			'wt_avg_cost': 595,
			'unit_cost': 595,
			'dept_id': '7021',
			'current_par_qty': 4,
			'recommended_par_qty': 1,
			'qty_delta': 3,
			'ext_delta': 1190,
			'expense_account_no': '4110',
			'review_date': today
		}
		res = self.client.post(PARS_URL, payload)
		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
		

	def test_weeks_completed(self):
		"""
		Test for calc weeks completed
		"""
		res = self.client.get(DASHBOARD_STATS_URL)
		self.assertEqual(Par.objects.count(), 1)
		self.assertEqual(res.data, 
		[	
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
		])