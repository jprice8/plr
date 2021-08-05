from rest_framework import serializers

from shipments.models import Shipping
from reset.models import Itemreset


class IncomingSerializer(serializers.ModelSerializer):
    """
    Serializer for displaying the most recent resets being shipped to
    the warehouse.
    """
    class Meta:
        model = Shipping
        fields = '__all__'


class ShippingExportSerializer(serializers.ModelSerializer):
    """
    Serializer to export out the shipping history to a spreadsheet.
    """
    sender_first_name = serializers.CharField(source="sender.profile.first_name")
    sender_last_name = serializers.CharField(source="sender.profile.last_name")
    class Meta:
        model = Shipping
        fields = (
            'week',
            'year',
            'facility_code',
            'sender_first_name',
            'sender_last_name',
            'tracking_number',
            'created_at'
        )


class PostShippingSerializer(serializers.ModelSerializer):
    """
    Serializer for creating Shipping objects. 
    
    The Shipping object is used to track
    which items are being sent back to the warehouse, by who, and providing
    a Lab Logistics Confirmation Number.
    """
    class Meta:
        model = Shipping
        fields = '__all__'


class ConfirmationListSerializer(serializers.ModelSerializer):
    """
    Serializer for displaying the current weeks item resets which have
    generated items on the PUT list to be sent back to the
    warehouse.
    """
    facility_code = serializers.CharField(source="par.facility_code")
    description = serializers.CharField(source="par.description")
    mfr = serializers.CharField(source="par.mfr")
    location_name = serializers.CharField(source="par.location_name")

    warehouse_send_back_qty_puom = serializers.SerializerMethodField()

    class Meta:
        model = Itemreset
        fields = (
            'id',
            'par',
            'last_updated',
            'reset_level',
            'week',
            'year',

            'facility_code',
            'description',
            'mfr',
            'location_name',

            'warehouse_send_back_qty_puom'
        )

    def get_warehouse_send_back_qty_puom(self, obj):
        """
        Generate the quantity that is being expected to be sent back to the
        warehouse in purchase unit of measure.
        """
        return (obj.par.current_par_qty - obj.reset_level) / obj.par.uom_conv_factor