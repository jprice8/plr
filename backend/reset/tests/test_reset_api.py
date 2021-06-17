#pyright: reportMissingImports=false
import datetime

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status 

from reset.models import Par, Itemreset


PARS_URL = reverse('reset:pars')
ITEMRESETS_URL = reverse('reset:itemresets')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


#### Par 
class DBEmptyTest(TestCase):
    """
    Test the reset api
    """
    def setUp(self):
        self.user = create_user(
            email='lebronjames@lakers.com',
            password='bronny123'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    #### Test Par List ####
    def test_get_all_pars_success(self):
        """
        Test GET for all pars
        """
        res = self.client.get(PARS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_par_success(self):
        """
        Test POST for create par
        """
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

    #### Test ItemReset List ####
    def test_get_all_itemresets_success(self):
        """
        Test GET all itemresets
        """
        res = self.client.get(ITEMRESETS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)


class DBFullTest(TestCase):
    """
    Test the reset API with objects in the DB
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

        self.client.post(PARS_URL, payload)

    
    #### Par Tests ####
    def test_get_all_pars(self):
        """
        Test to make sure there are PARs in the DB
        """
        res = self.client.get(PARS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)

    def test_update_par_successful(self):
        """
        Test PUT to update the par successfully
        """
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
        par = Par.objects.all()[0]
        PAR_URL = reverse('reset:par', kwargs={'pk': par.id})
        
        res = self.client.put(PAR_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_pars_successful(self):
        """
        Test DELETE to remove par from db
        """
        par = Par.objects.all()[0]
        PAR_URL = reverse('reset:par', kwargs={'pk': par.id})
        
        res = self.client.delete(PAR_URL)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    # #### Itemreset Tests ####
    # def test_create_itemreset_successful(self):
    #     """
    #     Test POST for creating itemreset
    #     """
    #     today = datetime.date(2021, 6, 10)
    #     pars = Par.objects.all()
    #     submissions = Submission.objects.all()
    #     payload = {
    #         'par': pars[0],
    #         'submission': submissions[0],
    #         'last_updated': today,
    #         'reset_level': 2
    #     }
    #     res = self.client.post(ITEMRESETS_URL, payload)
    #     self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    # def test_get_itemreset_successful(self):
    #     """
    #     Test GET unique itemreset 
    #     """
    #     itemreset = Itemreset.objects.all

    def test_weekly_submission_request(self):
        """
        Test GET weekly submissions
        """
        res = self.client.get('http://localhost:8000/api/reset/weekly-submissions/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)