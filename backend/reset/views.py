import datetime
import enum

from http.client import ResponseNotReady
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ItemresetSerializer, ParSerializer, SubmissionSerializer
from .models import Itemreset, Par, Submission



#### Par Views ####
class ParList(APIView):
    """
    Return all pars in the system, or create a new par
    """
    def get(self, request, format=None):
        pars = Par.objects.all()
        serializer = ParSerializer(pars, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ParSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
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


#### Submission Views ####
class SubmissionList(APIView):
    """
    Return all submissions in the system, or create a new one
    """
    def get(self, request, format=None):
        submission = Submission.objects.all()
        serializer = SubmissionSerializer(submission, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def submission_detail(request, pk):
    """
    Retrieve, update or delete a submission
    """
    try:
        submission = Submission.objects.get(pk=pk)
    except Submission.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SubmissionSerializer(submission)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SubmissionSerializer(submission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        submission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


### Itemreset Views ####
class ItemresetList(APIView):
    """
    Return all item resets in the system, or create a new one
    """
    def get(self, request, format=None):
        item_reset = Itemreset.objects.all()
        serializer = ItemresetSerializer(item_reset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ItemresetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
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


# Weekly Submission List
@api_view(['GET'])
def weekly_submission_list(request):
    """
    Retrieve list of weeks and whether submissions were submitted for them
    """
    today = datetime.datetime.today()
    # current week number e.g. 17 for last week of April
    current_week_number = int(today.strftime('%W')) 

    # create a list of week numbers, 1 indexed
    weeks = []
    for x in range(1, current_week_number + 1):
        weeks.append(x)

    # find out which weeks have submitted forms
    weekly_forms = Submission.objects.all()

    weeks_submitted = []
    for i in weekly_forms:
        weeks_submitted.append(i.week)

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