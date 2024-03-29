from django.db import models
from rest_framework import serializers

from reset.models import Itemreset
from shipments.models import Flag, Message 


class FlagSerializer(serializers.ModelSerializer):
    """
    Serializer for itemreset flag. The flag object represents a problem with
    the itemreset. To be used by the warehouse.
    """
    class Meta:
        model = Flag
        fields = '__all__'


class PostMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for itemreset messages. These messages are between warehouse and
    acute directors. Messages will be pulled up by their itemreset.
    """
    class Meta:
        model = Message
        fields = '__all__'


class ReadMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for reading messages nested in shipments.
    """
    sender_profile_picture = serializers.ImageField(source="sender.profile.profile_picture")
    sender_first_name = serializers.CharField(source="sender.profile.first_name")
    sender_last_name = serializers.CharField(source="sender.profile.last_name")
    class Meta:
        model = Message
        fields = (
            'id',
            'reset',
            'sender',
            'receiver',
            'msg_content',
            'created_at',
            'sender_profile_picture',
            'sender_first_name',
            'sender_last_name',
        )


class TimelineItemresetSerializer(serializers.Serializer):
    """
    The itemreset serializer for the timeline.
    """
    id = serializers.IntegerField()
    resetter_first_name = serializers.CharField(max_length=100)
    resetter_profile_picture = serializers.ImageField()
    last_updated = serializers.DateTimeField()


class TimelineShippingSerializer(serializers.Serializer):
    """
    The shipping serializer for the timeline.
    """
    id = serializers.IntegerField()
    shipper_first_name = serializers.CharField(max_length=100)
    shipper_profile_picture = serializers.ImageField()
    created_at = serializers.DateTimeField()


class TimelineFlagSerializer(serializers.Serializer):
    """
    The flag serializer for the timeline.
    """
    id = serializers.IntegerField()
    flagger_first_name = serializers.CharField(max_length=100)
    flagger_profile_picture = serializers.ImageField()
    timestamp = serializers.DateTimeField()


class TimelineSerializer(serializers.Serializer):
    """
    A nested response with an itemreset's reset, shipping and flag info.
    """
    itemreset = TimelineItemresetSerializer()
    shipping = TimelineShippingSerializer()
    flag = TimelineFlagSerializer()


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

    flags = FlagSerializer(read_only=True)

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
            'flags',
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


class ShipmentsDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for the DetailView on the warehouse shipments tab.
    """
    facility_code = serializers.CharField(source="par.facility_code")
    description = serializers.CharField(source="par.description")
    location_id = serializers.CharField(source="par.location_id")
    location_name = serializers.CharField(source="par.location_name")
    imms = serializers.CharField(source="par.imms")
    mfr = serializers.CharField(source="par.mfr")
    mfr_cat = serializers.CharField(source="par.mfr_cat")
    current_par_qty = serializers.IntegerField(source="par.current_par_qty")
    uom = serializers.CharField(source="par.uom")
    uom_conv_factor = serializers.CharField(source="par.uom_conv_factor")
    sender_id = serializers.IntegerField(source="user.id")
    sender_first_name = serializers.CharField(source="user.profile.first_name")
    sender_last_name = serializers.CharField(source="user.profile.last_name")
    sender_facility_code = serializers.CharField(source="user.profile.facility_code")

    warehouse_send_back_qty_luom = serializers.SerializerMethodField()
    warehouse_send_back_qty_puom = serializers.SerializerMethodField()

    flags = FlagSerializer(read_only=True)
    reset_message = ReadMessageSerializer(read_only=True, many=True)

    class Meta:
        model = Itemreset
        fields = (
            'id',
            'par',
            'last_updated',
            'reset_level',
            'week',
            'month',
            'year',
            'description',
            'facility_code',
            'location_id',
            'location_name',
            'imms',
            'mfr',
            'mfr_cat',
            'current_par_qty',
            'uom',
            'uom_conv_factor',
            'sender_id',
            'sender_first_name',
            'sender_last_name',
            'sender_facility_code',
            'warehouse_send_back_qty_luom',
            'warehouse_send_back_qty_puom',
            'flags',
            'reset_message'
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

    
class ShipmentsExportSerializer(serializers.ModelSerializer):
    """
    For exporting the warehouse version of itemresets.
    """
    facility_code = serializers.CharField(source="par.facility_code")
    description = serializers.CharField(source="par.description")
    location_id = serializers.CharField(source="par.location_id")
    location_name = serializers.CharField(source="par.location_name")
    imms = serializers.CharField(source="par.imms")
    mfr = serializers.CharField(source="par.mfr")
    mfr_cat = serializers.CharField(source="par.mfr_cat")
    current_par_qty = serializers.IntegerField(source="par.current_par_qty")
    uom = serializers.CharField(source="par.uom")
    uom_conv_factor = serializers.CharField(source="par.uom_conv_factor")
    sender_id = serializers.IntegerField(source="user.id")
    sender_first_name = serializers.CharField(source="user.profile.first_name")
    sender_last_name = serializers.CharField(source="user.profile.last_name")
    sender_facility_code = serializers.CharField(source="user.profile.facility_code")

    warehouse_send_back_qty_luom = serializers.SerializerMethodField()
    warehouse_send_back_qty_puom = serializers.SerializerMethodField()

    class Meta:
        model = Itemreset
        fields = (
            'id',
            'par',
            'last_updated',
            'reset_level',
            'week',
            'month',
            'year',
            'description',
            'facility_code',
            'location_id',
            'location_name',
            'imms',
            'mfr',
            'mfr_cat',
            'current_par_qty',
            'uom',
            'uom_conv_factor',
            'sender_id',
            'sender_first_name',
            'sender_last_name',
            'sender_facility_code',
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
