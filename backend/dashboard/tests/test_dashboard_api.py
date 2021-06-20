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


class TestDashboardEnpoint(TestCase):
    """
    Test the dashboard endpoint
    """
    def setUp(self):
        self.user = create_user(
            email='lebronjames@lakers.com',
            password='bronny123'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Create Par 1
        date = datetime.date(2021, 5, 25)
        p1 = Par( 
            facility_code = '872',
            location_id = '84',
            location_name = 'SURGERY PAR/STOREROOM',
            description = 'SEALER, VESSEL ENDOWRIST ONE 8MM DAVINCI',
            imms = '123456',
            uom_conv_factor = 1,
            uom = 'EA',
            wt_avg_cost = 500,
            unit_cost = 500,
            dept_id = '7021',
            current_par_qty = 4,
            recommended_par_qty = 2,
            qty_delta = 2,
            ext_delta = 1000,
            expense_account_no = '4110',
            review_date = date
        )
        p1.save()

        # Create Par 2
        p2 = Par( 
            facility_code = '872',
            location_id = '84',
            location_name = 'SURGERY PAR/STOREROOM',
            description = 'KNIFE, WRIST ONE 8MM',
            imms = '234567',
            uom_conv_factor = 1,
            uom = 'EA',
            wt_avg_cost = 500,
            unit_cost = 500,
            dept_id = '7021',
            current_par_qty = 4,
            recommended_par_qty = 2,
            qty_delta = 2,
            ext_delta = 1000,
            expense_account_no = '4110',
            review_date = date
        )
        p2.save()
        # Create Par 3
        p3 = Par( 
            facility_code = '872',
            location_id = '84',
            location_name = 'SURGERY PAR/STOREROOM',
            description = 'IMPLANT, SNAKE KNEE TWO 16MM',
            imms = '345678',
            uom_conv_factor = 1,
            uom = 'EA',
            wt_avg_cost = 500,
            unit_cost = 500,
            dept_id = '7021',
            current_par_qty = 4,
            recommended_par_qty = 2,
            qty_delta = 2,
            ext_delta = 1000,
            expense_account_no = '4110',
            review_date = date
        )
        p3.save()

        # Create Itemreset 1
        ir1 = Itemreset(
            par = p1,
            reset_level = 2,
            week = 24,
            month = 6,
            year = 2021
        )
        ir1.save()
        
        # Create Itemreset 2
        ir2 = Itemreset(
            par = p2,
            reset_level = 2,
            week = 24,
            month = 6,
            year = 2021
        )
        ir2.save()

        # Create Itemreset 3
        ir3 = Itemreset(
            par = p3,
            reset_level = 2,
            week = 24,
            month = 6,
            year = 2021
        )
        ir3.save()

    def test_total_reduction_calculation(self):
        """
        Test the total reduction of Itemresets calculation
        """
        itemresets = Itemreset.objects.all()

        # iterate through itemresets and sum the ext reduction
        total_reduction_ext = 0
        for i in itemresets:
            total_reduction_ext += i.calc_ext_reduction()
            
        self.assertEqual(total_reduction_ext, 3000)

    #TODO: assert equal against the api endpoint
    def test_weeks_completed_calculation(self):
        """
        Test the calculation for the number of weeks with an itemreset
        """
        itemresets = Itemreset.objects.all()

        weeks_completed = []
        for i in itemresets:
            weeks_completed.append(i.week)

        weeks_completed = list(set(weeks_completed))
        self.assertEqual(len(weeks_completed), 1)

    def test_pars_reduced_calculation(self):
        """
        Test the calculation of the number of pars reduced by the user
        """
        itemresets = Itemreset.objects.all()

        pars_reduced = []
        for i in itemresets:
            pars_reduced.append(i.par.id)

        pars_reduced = list(set(pars_reduced))
        self.assertEqual(len(pars_reduced), 3)

    