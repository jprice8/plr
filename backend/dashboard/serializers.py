#type:ignore
from rest_framework import serializers

from reset.models import Itemreset


class StatItemresetSerializer(serializers.ModelSerializer):
    """
    Serializer for the Listview inside of dashboard stats.
    Want to include the calculated reduction ext inside serializer.
    """
    reduction_ext = serializers.FloatField(source="calc_ext_reduction")
    description = serializers.CharField(source="par.description")

    class Meta:
        model = Itemreset
        fields = ('id', 'par', 'description', 'reduction_ext', 'week', 'year')


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

    current_par_qty = serializers.IntegerField(source="par.current_par_qty")
    recommended_par_qty = serializers.IntegerField(source="par.recommended_par_qty")
    expense_account_no = serializers.CharField(source="par.expense_account_no")
    reduction_ext = serializers.FloatField(source="calc_ext_reduction")

    class Meta:
        model = Itemreset
        fields = (
            'id', 
            'par',
            'reset_level',
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
            'reduction_ext'
        )