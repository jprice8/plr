#pyright: reportMissingImports=false
import datetime

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.test.client import RequestFactory
from django.urls import reverse
import pytest

from rest_framework.test import APIClient
from rest_framework import status 

from reset.models import Par, Itemreset
from users.models import Profile

PARS_URL = reverse('reset:pars')
ITEMRESETS_URL = reverse('reset:itemresets')
WEEKLYSUBMISSIONS_URL = reverse('reset:weekly-submissions')
WEEKS_URL = reverse('reset:weeks')


def create_user(**params):
    return get_user_model().objects.create_user(**params)

@pytest.mark.django_db
class TestParViews(TestCase):
    """
    Test the Par API endpoints from the reset views file
    """
    def setUp(self):
        self.user = create_user(
            email='mm@rhh.com',
            password='12345'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        profile = Profile(
            user=self.user,
            first_name='mario',
            last_name='moehlendorf',
            facility_code='872',
            title='DMM',
            phone='281-555-1234'
        )
        profile.save()

        # Create pars
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
            review_date = datetime.date(2021, 5, 25)
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
            review_date = datetime.date(2021, 5, 25)
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
            review_date = datetime.date(2021, 5, 25)
        )
        p3.save()

        p4 = Par( 
            facility_code = '939',
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
            review_date = datetime.date(2021, 5, 25)
        )
        p4.save()

    
    #### Par Tests ####
    def test_get_all_pars(self):
        """
        Test to make sure there are PARs in the DB
        """
        res = self.client.get(PARS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 3)

#     #### Itemreset Tests ####
    def test_create_itemreset_successful(self):
        """
        Test POST for creating itemreset
        """
        pars = Par.objects.all()
        payload = {
            'par': pars[0].id,
            'user': self.user.id,
            'reset_level': 2,
            'week': 24,
            'month': 6,
            'year': 2021
        }
        res = self.client.post(ITEMRESETS_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_get_itemreset_successful(self):
        """
        Test GET unique itemreset 
        """
        res = self.client.get(ITEMRESETS_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_weekly_submission_request(self):
        """
        Test GET weekly submissions
        """
        res = self.client.get('http://localhost:8000/api/reset/weekly-submissions/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_paginated_weeks(self):
        """
        Test the paginated weeks being returned
        """
        res = self.client.get(WEEKS_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

