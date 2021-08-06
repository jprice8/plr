from django.http.response import Http404

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from drf_renderer_xlsx.mixins import XLSXFileMixin
from drf_renderer_xlsx.renderers import XLSXRenderer

from shipments.models import Flag 
from shipments.serializers import ShipmentsSerializer, ShipmentsDetailSerializer 
from shipments.serializers import FlagSerializer, PostMessageSerializer, TimelineSerializer
from shipments.models import Shipping, Message
from reset.models import Itemreset
from dashboard.pagination import LargeResultsSetPagination


class ShipmentsList(APIView):
    """
    Return a list of itemresets that have been shipped.
    Flatten lists of reset ids in shipping instances and
    filter resets for only included in flattened list.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Get all reset IDs that have been shipped
        nested_list = []
        shipping = Shipping.objects.all()
        for i in shipping:
            nested_list.append(i.reset_ids)

        # Flatten list of reset ids into one list
        shipped_reset_ids = [reset_id for sublist in nested_list for reset_id in sublist]

        # Filter only resets that appear in the flattened id list
        itemresets = Itemreset.objects.filter(
            pk__in=shipped_reset_ids
        )

        serializer = ShipmentsSerializer(itemresets, many=True)
        return Response(serializer.data)


class ShipmentsDetail(generics.RetrieveAPIView):
    """
    Retrieve a specific itemreset to view it's information as
    well as it's related par information.
    """
    permission_classes = [IsAuthenticated]
    queryset = Itemreset.objects.all()
    serializer_class = ShipmentsDetailSerializer


class ShipmentsExport(XLSXFileMixin, ReadOnlyModelViewSet):
    """
    Export out all resets as xlsx file.
    """
    permission_classes = [IsAuthenticated]
    queryset = Itemreset.objects.all()
    serializer_class = ShipmentsDetailSerializer
    pagination_class = LargeResultsSetPagination
    renderer_classes = [XLSXRenderer]
    filename = 'par_resets.xlsx'

    def list(self, request):
        nested_list = []
        shipping = Shipping.objects.all()
        for i in shipping:
            nested_list.append(i.reset_ids)

        # Flatten list of reset ids into one list
        shipped_reset_ids = [reset_id for sublist in nested_list for reset_id in sublist]

        queryset = self.get_queryset().filter(
            pk__in=shipped_reset_ids
        )
        serializer = ShipmentsDetailSerializer(queryset, many=True)
        return Response(serializer.data)


class FlagList(APIView):
    """
    API endpoint to get a list of flagged itemresets or create a flag
    for an itemreset.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        flags = Flag.objects.all()
        serializer = FlagSerializer(flags, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FlagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FlagDetail(APIView):
    """
    Get a specific flag or delete a flag.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Flag.objects.get(pk=pk)
        except Flag.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        flag = self.get_object(pk)
        serializer = FlagSerializer(flag)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        flag = self.get_object(pk)
        flag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MessageList(APIView):
    """
    Create a message for a Itemreset with this endpoint.

    For GET, use the ShipmentsDetail. The messages for that
    shipment are nested in the response.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = PostMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MessageDetail(APIView):
    """
    Delete a message with this endpoint.
    """
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        try:
            return Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        message = self.get_object(pk)
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Timeline(APIView):
    """
    A timeline of the itemreset activities. Can include up to:
    1. The date of the reset.
    2. The date of the ship, if any.
    3. The date of the flag, if any.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Itemreset.objects.get(pk=pk)
        except Itemreset.DoesNotExist:
            raise Http404

    def get_shipping(self, pk):
        # Get all shipping for user's facility
        shipping = Shipping.objects.all()

        matching_shipping = []
        for i in shipping:
            if pk in i.reset_ids:
                matching_shipping.append(i)

        return matching_shipping

    def get(self, request, pk, format=None):
        data = []

        itemreset = self.get_object(pk)
        itemreset_data = {
            'id': 1,
            'event': 'Reset this par',
            'first_name': itemreset.user.profile.first_name,
            'last_name': itemreset.user.profile.last_name,
            'timestamp': itemreset.last_updated
        }

        shipping = self.get_shipping(pk)
        if shipping:
            shipping_data = {
                'id': 2,
                'event': 'Shipped to warehouse',
                'first_name': shipping[0].sender.profile.first_name,
                'last_name': shipping[0].sender.profile.last_name,
                'timestamp': shipping[0].created_at
            }

        flag = Flag.objects.filter(reset=pk)
        if flag: 
            flag_data = {
                'id': 3,
                'event': 'Flagged this shipment',
                'first_name': flag[0].user.profile.first_name,
                'last_name': flag[0].user.profile.last_name,
                'timestamp': flag[0].timestamp
            }

        data.append(itemreset_data)
        if shipping:
            data.append(shipping_data)
        if flag:
            data.append(flag_data)
        
        return Response(data)
        
