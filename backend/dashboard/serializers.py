#type:ignore
from rest_framework import serializers

from reset.models import Itemreset
from shipments.serializers import FlagSerializer, ReadMessageSerializer


class StatItemresetSerializer(serializers.ModelSerializer):
    """
    Serializer for the Listview inside of dashboard stats.
    Want to include the calculated reduction ext inside serializer.
    """
    reduction_ext = serializers.FloatField(source="calc_ext_reduction")
    description = serializers.CharField(source="par.description")
    mfr = serializers.CharField(source="par.mfr")

    flags = FlagSerializer(read_only=True)

    class Meta:
        model = Itemreset
        fields = (
            'id', 
            'par', 
            'description', 
            'mfr', 
            'reduction_ext', 
            'week', 
            'year',
            'flags'
        )


class StatItemresetDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for the DetailView inside of dashboard stats.
    Want to include a plethora of details on the PAR.
    """
    facility_code = serializers.CharField(source="par.facility_code")
    location_id = serializers.CharField(source="par.location_id")
    location_name = serializers.CharField(source="par.location_name")

    description = serializers.CharField(source="par.description")
    imms = serializers.CharField(source="par.imms")
    uom_conv_factor = serializers.CharField(source="par.uom_conv_factor")
    uom = serializers.CharField(source="par.uom")
    unit_cost = serializers.CharField(source="par.unit_cost")
    dept_id = serializers.CharField(source="par.dept_id")
    mfr = serializers.CharField(source="par.mfr")
    mfr_cat = serializers.CharField(source="par.mfr_cat")

    current_par_qty = serializers.IntegerField(source="par.current_par_qty")
    recommended_par_qty = serializers.IntegerField(source="par.recommended_par_qty")
    expense_account_no = serializers.CharField(source="par.expense_account_no")
    reduction_ext = serializers.FloatField(source="calc_ext_reduction")

    adjustments_52_weeks = serializers.IntegerField(source="par.adjustments_52_weeks")
    issues_52_weeks = serializers.IntegerField(source="par.issues_52_weeks")

    awa = serializers.IntegerField(source="par.awa")
    awi = serializers.IntegerField(source="par.awi")
    safety = serializers.IntegerField(source="par.safety")

    warehouse_send_back_qty_luom = serializers.SerializerMethodField()
    warehouse_send_back_qty_puom = serializers.SerializerMethodField()

    flags = FlagSerializer(read_only=True)
    reset_message = ReadMessageSerializer(read_only=True, many=True)
    sender_id = serializers.IntegerField(source="user.id")
    sender_first_name = serializers.CharField(source="user.profile.first_name")
    sender_last_name = serializers.CharField(source="user.profile.last_name")
    sender_facility_code = serializers.CharField(source="user.profile.facility_code")

    class Meta:
        model = Itemreset
        fields = (
            'id', 
            'par',
            'reset_level',
            'send_back_confirmed',
            'last_updated',
            'week', 
            'month', 
            'year',
            'facility_code',
            'location_id',
            'location_name',
            'description',
            'imms',
            'uom_conv_factor',
            'uom',
            'unit_cost',
            'dept_id',
            'mfr',
            'current_par_qty',
            'recommended_par_qty',
            'expense_account_no',
            'reduction_ext',
            'adjustments_52_weeks',
            'issues_52_weeks',
            'awa',
            'awi',
            'safety',
            'mfr_cat',
            'warehouse_send_back_qty_luom',
            'warehouse_send_back_qty_puom',
            'flags',
            'reset_message',
            'sender_id',
            'sender_first_name',
            'sender_last_name',
            'sender_facility_code',
        )

    def get_warehouse_send_back_qty_luom(self, obj):
        """
        Generate the quantity that is being expected to be sent back to
        the warehouse.
        """
        return obj.par.current_par_qty - obj.reset_level

    def get_warehouse_send_back_qty_puom(self, obj):
        """
        Generate the quantity that is being expected to be sent back to
        the warehouse in purchase unit of measure.
        """
        return (obj.par.current_par_qty - obj.reset_level) / obj.par.uom_conv_factor