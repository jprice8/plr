from django.http.response import Http404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from reset.models import Itemreset
from shipments.models import Flag
from shipments.serializers import ShipmentsSerializer, ShipmentsDetailSerializer, FlagSerializer

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