from rest_framework import serializers

from reset.models import Itemreset


class ShipmentsSerializer(serializers.ModelSerializer):
    """
    Serializer for the Listview on the warehouse shipments tab.
    """
    facility_code = serializers.CharField(source="par.facility_code")
    description = serializers.CharField(source="par.description")
    location_id = serializers.CharField(source="par.location_id")
    imms = serializers.CharField(source="par.imms")
    mfr = serializers.CharField(source="par.mfr")
    uom = serializers.CharField(source="par.uom")

    warehouse_send_back_qty_luom = serializers.SerializerMethodField()
    warehouse_send_back_qty_puom = serializers.SerializerMethodField()

    class Meta:
        model = Itemreset
        fields = (
            'id',
            'par',
            'week',
            'month',
            'year',
            'description',
            'facility_code',
            'location_id',
            'imms',
            'mfr',
            'uom',
            'warehouse_send_back_qty_luom',
            'warehouse_send_back_qty_puom',
        )

    def get_warehouse_send_back_qty_luom(self, obj):
        """
        Generate the quantity that is being expected to be sent back
        to the warehouse.
        """
        return obj.par.current_par_qty - obj.reset_level

    def get_warehouse_send_back_qty_puom(self, obj):
        """
        Generate the quantity that is being expected to be sent back to the
        warehouse in purchase unit of measure.
        """
        return (obj.par.current_par_qty - obj.reset_level) / obj.par.uom_conv_factor
