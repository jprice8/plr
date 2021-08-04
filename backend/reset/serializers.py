from rest_framework import serializers

from .models import Par, Itemreset


class ItemresetSerializer(serializers.ModelSerializer):
    """
    Serializer for Itemreset object
    """
    class Meta:
        model = Itemreset
        fields = (
            'id', 
            'par', 
            'user', 
            'reset_level', 
            'send_back_confirmed', 
            'last_updated', 
            'week',
        )


class ParSerializer(serializers.ModelSerializer):
    """
    Serializer for PAR object
    """
    itemresets = ItemresetSerializer(many=False, read_only=True)
    multiples_list = serializers.SerializerMethodField()

    class Meta:
        model = Par
        fields = '__all__'

    def get_multiples_list(self, obj):
        """
        Generate an array with uom conv factor multiples up to the current
        par qty. Using this array for the options in the select input for
        new ROP.
        """
        multiples = []
        i = obj.current_par_qty
        while i > 0:
            if i == obj.current_par_qty:
                multiples.append("")

            multiples.append(i)
            i -= obj.uom_conv_factor
        return multiples

       
class WeeklySubmissionSerializer(serializers.Serializer):
    week_number = serializers.IntegerField()
    submission_status = serializers.CharField()
