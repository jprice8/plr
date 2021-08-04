from django.http.response import Http404
from django.utils import timezone

from rest_framework import generics, status
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from drf_renderer_xlsx.mixins import XLSXFileMixin
from drf_renderer_xlsx.renderers import XLSXRenderer

from reset.models import Itemreset
from shipments.models import Flag, Shipping
from shipments.serializers import ShipmentsSerializer, ShipmentsDetailSerializer 
from shipments.serializers import FlagSerializer, PostMessageSerializer, PostShippingSerializer
from shipments.serializers import ConfirmationListSerializer, IncomingSerializer
from shipments.serializers import ShippingExportSerializer
from dashboard.pagination import LargeResultsSetPagination


class ShipmentsList(generics.ListAPIView):
    """
    Shipments list goes here.
    """
    permission_classes = [IsAuthenticated]
    queryset = Itemreset.objects.all()
    serializer_class = ShipmentsSerializer

    def list(self, request):
        # Get list of itemresets from around the system that have
        # a lower reset level than their par's current ROP level
        reduction_resets = []
        for i in self.get_queryset():
            if i.is_reset_lower_than_current():
                reduction_resets.append(i.id)

        queryset = self.get_queryset().filter(
            send_back_confirmed=True
        ).filter(
            pk__in=reduction_resets
        )

        serializer = ShipmentsSerializer(queryset, many=True)
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
        reduction_resets = []
        for i in self.get_queryset():
            if i.is_reset_lower_than_current():
                reduction_resets.append(i.id)

        queryset = self.get_queryset().filter(
            send_back_confirmed=True
        ).filter(
            pk__in=reduction_resets
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


class CheckForShipping(APIView):
    """
    Check to see whether the user has submitted a shipping form for the current
    week.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        today = timezone.now()
        current_week_no = int(today.strftime('%W'))
        shipping = Shipping.objects.filter(
            sender=request.user
        ).filter(
            week=current_week_no
        )
        data = {}
        # If the user has a shipping this week return it's ID to edit
        if shipping:
            data['id'] = shipping[0].id
        else:
            data['id'] = 0

        return Response(data)


class ShippingList(APIView):
    """
    POST to create a Shipping object. The shipping object represents the
    items which are being sent back to the warehouse and the Lab Logistics
    tracking information.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = PostShippingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConfirmationList(generics.ListAPIView):
    """
    GET the current week's itemresets which have generated items on the
    PUT list to be sent back to the warehouse.
    """
    permission_classes = [IsAuthenticated]
    queryset = Itemreset.objects.all()
    serializer_class = ConfirmationListSerializer

    def list(self, request):
        """
        Return list of user's itemresets for the current week which have
        a lower reset level than their current par level.

        Only consider items that have a confirmed send back (accurate par level).
        """
        # Get current week number
        today = timezone.now()
        current_week_number = int(today.strftime('%W'))

        reduction_resets = []
        for i in self.get_queryset():
            if i.is_reset_lower_than_current():
                reduction_resets.append(i.id)

        queryset = self.get_queryset().filter(
            user=request.user
        ).filter(
            week=current_week_number
        ).filter(
            send_back_confirmed=True
        ).filter(
            pk__in=reduction_resets
        )

        serializer = ConfirmationListSerializer(queryset, many=True)
        return Response(serializer.data)
        

class IncomingList(APIView):
    """
    Generate a list of the incoming resets being shipped to the warehouse
    in the past three weeks.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        shipping = Shipping.objects.all()
        serializer = IncomingSerializer(shipping, many=True)
        return Response(serializer.data)


class IncomingResetList(APIView):
    """
    A detail list view for the incoming resets associated with a specific
    shipping instance.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Shipping.objects.get(pk=pk)
        except Shipping.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        shipping = self.get_object(pk)
        itemresets = Itemreset.objects.filter(
            pk__in=shipping.reset_ids
        )
        serializer = ShipmentsSerializer(itemresets, many=True)
        return Response(serializer.data)


class IncomingExport(XLSXFileMixin, ReadOnlyModelViewSet):
    """
    Export the items reset to a spreadsheet.
    """
    permission_classes = [IsAuthenticated]
    queryset = Itemreset.objects.all()
    serializer_class = ShipmentsDetailSerializer
    renderer_classes = [XLSXRenderer]
    filename = 'par_resets_shipped_to_warehouse.xlsx'

    def list(self, request, pk):
        try:
            shipping = Shipping.objects.get(pk=pk)
        except Shipping.DoesNotExist:
            raise Http404

        queryset = self.get_queryset().filter(
            pk__in=shipping.reset_ids
        )
        serializer = ShipmentsDetailSerializer(queryset, many=True)
        return Response(serializer.data)


class ShippingExport(XLSXFileMixin, ReadOnlyModelViewSet):
    """
    Export out the shipping history.
    """
    permission_classes = [IsAuthenticated]
    queryset = Shipping.objects.all()
    serializer_class = ShippingExportSerializer
    renderer_classes = [XLSXRenderer]
    filename = 'shipping_breakout_warehouse.xlsx'

    def list(self, request):
        queryset = self.get_queryset()
        serializer = ShippingExportSerializer(queryset, many=True)
        return Response(serializer.data)
        
