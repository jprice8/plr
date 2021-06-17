from rest_framework import serializers

from .models import Par, Itemreset


class ParSerializer(serializers.ModelSerializer):
    """
    Serializer for PAR object
    """
    class Meta:
        model = Par
        fields = '__all__'


class ItemresetSerializer(serializers.ModelSerializer):
    """
    Serializer for Itemreset object
    """
    class Meta:
        model = Itemreset
        fields = ('id', 'par', 'reset_level', 'week')

       
class WeeklySubmissionSerializer(serializers.Serializer):
    week_number = serializers.IntegerField()
    submission_status = serializers.CharField()
