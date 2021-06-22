from rest_framework import serializers

from .models import Par, Itemreset


class ItemresetSerializer(serializers.ModelSerializer):
    """
    Serializer for Itemreset object
    """
    class Meta:
        model = Itemreset
        fields = ('id', 'par', 'user', 'reset_level', 'week')


class ParSerializer(serializers.ModelSerializer):
    """
    Serializer for PAR object
    """
    itemresets = ItemresetSerializer(many=True, read_only=True)

    class Meta:
        model = Par
        fields = '__all__'

       
class WeeklySubmissionSerializer(serializers.Serializer):
    week_number = serializers.IntegerField()
    submission_status = serializers.CharField()
