from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from reset.models import Itemreset
from shipments.serializers import ShipmentsSerializer, ShipmentsDetailSerializer

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