import datetime

from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status 
from django.contrib.auth import get_user_model

from reset.models import Par, Itemreset
# from dashboard.views import DashboardWeeklyReductionChart


PARS_URL = reverse('reset:pars')
ITEMRESETS_URL = reverse('reset:itemresets')

DASHBOARD_STATS_URL = reverse('dashboard:stats')

DASHBOARD_CHART_URL = reverse('dashboard:chart')

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


class TestDashboardStatsEnpoint(TestCase):
    """
    Test the dashboard endpoints used to hydrate the stat info cards
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

        # Create Par 4
        p4 = Par( 
            facility_code = '872',
            location_id = '84',
            location_name = 'SURGERY PAR/STOREROOM',
            description = 'IMPLANT, SNAKE KNEE TWO 16MM',
            imms = '445678',
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
        p4.save()

        # Create Par 5 
        p5 = Par( 
            facility_code = '872',
            location_id = '84',
            location_name = 'SURGERY PAR/STOREROOM',
            description = 'IMPLANT, SNAKE KNEE TWO 16MM',
            imms = '545678',
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
        p5.save()

        # Create Par 6
        p6 = Par( 
            facility_code = '872',
            location_id = '84',
            location_name = 'SURGERY PAR/STOREROOM',
            description = 'IMPLANT, SNAKE KNEE TWO 16MM',
            imms = '645678',
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
            review_date = datetime.date(2021, 6, 4)
        )
        p6.save()

        # Create Itemreset 1
        ir1 = Itemreset(
            par = p1,
            user = self.user,
            reset_level = 2,
            week = 24,
            month = 6,
            year = 2021
        )
        ir1.save()
        
        # Create Itemreset 2
        ir2 = Itemreset(
            par = p2,
            user = self.user,
            reset_level = 2,
            week = 24,
            month = 6,
            year = 2021
        )
        ir2.save()

        # Create Itemreset 3
        ir3 = Itemreset(
            par = p3,
            user = self.user,
            reset_level = 2,
            week = 24,
            month = 6,
            year = 2021
        )
        ir3.save()

        # Create Itemreset 4
        ir4 = Itemreset(
            par = p4,
            user = self.user,
            reset_level = 2,
            week = 24,
            month = 6,
            year = 2021
        )
        ir4.save()

        # Create Itemreset 5
        ir5 = Itemreset(
            par = p5,
            user = self.user,
            reset_level = 2,
            week = 24,
            month = 6,
            year = 2021
        )
        ir5.save()

        # Create Itemreset 6
        ir6 = Itemreset(
            par = p6,
            user = self.user,
            reset_level = 2,
            week = 25,
            month = 6,
            year = 2021
        )
        ir6.save()

    def test_total_reduction_calculation(self):
        """
        Test the total reduction of Itemresets calculation
        """
        itemresets = Itemreset.objects.filter(user=self.user)

        # iterate through itemresets and sum the ext reduction
        total_reduction_ext = 0
        for i in itemresets:
            total_reduction_ext += i.calc_ext_reduction()
            
        self.assertEqual(total_reduction_ext, 6000)

    #TODO: assert equal against the api endpoint
    def test_weeks_completed_calculation(self):
        """
        Test the calculation for the number of weeks with an itemreset
        """
        itemresets = Itemreset.objects.filter(user=self.user)

        weeks_completed = []
        for i in itemresets:
            weeks_completed.append(i.week)

        weeks_completed = len(list(set(weeks_completed)))
        self.assertEqual(weeks_completed, 2)

    def test_pars_reduced_calculation(self):
        """
        Test the calculation of the number of pars reduced by the user
        """
        itemresets = Itemreset.objects.filter(user=self.user)

        pars_reduced = []
        for i in itemresets:
            pars_reduced.append(i.par.id)

        pars_reduced = list(set(pars_reduced))
        self.assertEqual(len(pars_reduced), 6)

    def test_stats_reset_list(self):
        """
        Test the list sent to the user breaking out their reset stats
        """
        res = self.client.get(reverse('dashboard:list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_stat_reset_detail(self):
        """
        Test the detail view sent to the user for drilling down into
        reset details
        """
        itemreset = Itemreset.objects.filter(user=self.user)[0]
        res = self.client.get(reverse('dashboard:detail', kwargs={'pk': itemreset.id}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
    
    def test_dashboard_get_chart_success(self):
        """
        Test GET for the dashboard chart endpoint
        """
        res = self.client.get(DASHBOARD_CHART_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_chart_returns_correct_number_of_weeks(self):
        """
        The chart endpoint should return unique week set in list format
        """
        itemresets = Itemreset.objects.filter(user=self.user)
        today = datetime.datetime.today()
        current_week_number1 = int(today.strftime('%W')) + 1

        labels = []
        data = []
        for i in range(1, current_week_number1):
            labels.append(i)
            total_weekly_redux = 0
            for idx, val in enumerate(itemresets):
                if val.week == i:
                    total_weekly_redux += val.calc_ext_reduction()

            data.append(total_weekly_redux)

        last_data_point = data[-1]

        self.assertEqual(last_data_point, 1000)

    def test_chart_returns_same_number_of_weeks_and_labels(self):
        """
        The chart should have a label for each data point
        """
        res = self.client.get(DASHBOARD_CHART_URL)
        self.assertEqual(len(res.data['labels']), len(res.data['data']))

