#type:ignore
import datetime
# import enum

# from http.client import ResponseNotReady
# from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.paginator import Paginator
from rest_framework import generics, serializers, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import ItemresetSerializer, ParSerializer, WeeklySubmissionSerializer
from .models import Itemreset, Par
from .pagination import MyPaginationMixin
from users.models import Profile


#### Par Views ####
class ParList(APIView):
    """
    Return the top n results from the Par table. The Par table is sorted
    by most recent review date and then by the highest ext delta. It then sorts
    any ties by the lowest ID.

    The Par serializer includes any related itemresets in a nested field.

    #TODO: Confirm solution to this issue: As of right now, there is a risk of
    reshowing the previous week's pars if the ETL script fails to run at the
    beginning of the week. Need a solution for this.
    """
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, format=None):
        # Get only Pars related to the user's facility
        user_profile = Profile.objects.get(user=request.user)

        # Return the top three results to the user
        pars = Par.objects.filter(facility_code=user_profile.facility_code)[:5]
        serializer = ParSerializer(pars, many=True)
        return Response(serializer.data)

    # def post(self, request, format=None):
    #     serializer = ParSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def par_detail(request, pk):
    """
    Retrieve, update or delete a par
    """
    try:
        par = Par.objects.get(pk=pk)
    except Par.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ParSerializer(par)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ParSerializer(par, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        par.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


### Itemreset Views ####
class ItemresetList(APIView):
    """
    Return all item resets in the system, or create a new one
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        item_reset = Itemreset.objects.all()
        serializer = ItemresetSerializer(item_reset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        today = timezone.now()
        current_week = today.strftime('%W')
        current_month = today.strftime('%m')
        current_year = today.strftime('%Y')

        serializer = ItemresetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(week=current_week, month=current_month, year=current_year)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def itemresest_detail(request, pk):
    """
    Retrieve, update or delete an itemreset
    """
    try:
        item_reset = Itemreset.objects.get(pk=pk)
    except Itemreset.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ItemresetSerializer(item_reset)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ItemresetSerializer(item_reset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        item_reset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def itemreset_by_week(request, week):
    """
    Retrieve itemresets for a given week
    """
    item_resets = Itemreset.objects.filter(
        week=week
    ).filter(
        user=request.user.id
    )

    if request.method == 'GET':
        serializer = ItemresetSerializer(item_resets, many=True)
        return Response(serializer.data)


# Weekly Submission List
@api_view(['GET'])
def weekly_submission_list(request):
    """
    Retrieve list of weeks and whether submissions were submitted for them
    """
    # today = datetime.datetime.today()
    today = timezone.now()
    # current week number e.g. 17 for last week of April
    current_week_number = int(today.strftime('%W')) 

    # create a list of week numbers, 1 indexed
    weeks = []
    for x in range(1, current_week_number + 1):
        weeks.append(x)

    # find out which weeks have submitted forms
    resets = Itemreset.objects.all()

    weeks_submitted = []
    for i in resets:
        weeks_submitted.append(i.week)
    
    # Get unique weeks
    weeks_submitted = list(set(weeks_submitted))

    # loop through weeks and if there is a matching submission, set status
    submission_status = []
    for idx, val in enumerate(weeks):
        if weeks[idx] in weeks_submitted:
            # Week has a submission
            submission_status.append('Submitted') 
        elif weeks[idx] == current_week_number:
            # It's the current week
            submission_status.append('New')
        elif weeks[idx] not in weeks_submitted:
            submission_status.append('Missed')

    data = {
        'weeks': weeks,
        'submission_status': submission_status,
        'current_week': current_week_number,
        'current_month': today.strftime('%B'),
        'current_year': today.year
    }

    if request.method == 'GET':
        return Response(data)


class WeeklySubmissions(APIView, MyPaginationMixin):
    # Get list of dicts that have week number and submission status
    
    def calc_submission_weeks(self):
        # today = datetime.datetime.today()
        today = timezone.now()
        # current week number e.g. 17 for last week of April
        current_week_number = int(today.strftime('%W')) 

        # create a list of week numbers, 1 indexed
        weeks = []
        for x in range(1, current_week_number + 1):
            weeks.append(x)

        # find out which weeks have submitted forms
        resets = Itemreset.objects.all()

        weeks_submitted = []
        for i in resets:
            weeks_submitted.append(i.week)
        
        # Get unique weeks
        weeks_submitted = list(set(weeks_submitted))

        # loop through weeks and if there is a matching submission, set status
        submission_status = []
        for idx, val in enumerate(weeks):
            if weeks[idx] in weeks_submitted:
                # Week has a submission
                submission_status.append('Submitted') 
            elif weeks[idx] == current_week_number:
                # It's the current week
                submission_status.append('New')
            elif weeks[idx] not in weeks_submitted:
                submission_status.append('Missed')

        data = []
        for i in range(len(weeks)):
            inner_temp = {}
            inner_temp['week_number'] = weeks[i]
            inner_temp['submission_status'] = submission_status[i]
            data.append(inner_temp)

        return data

    serializer_class = WeeklySubmissionSerializer
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

    # We need to override the get method to insert pagination
    def get(self, request):

        data = self.calc_submission_weeks()

        page = self.paginate_queryset(data)
        # page = self.paginate_queryset(self.qs)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)
