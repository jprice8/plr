from rest_framework import serializers

from .models import Par, Submission, Itemreset


class ParSerializer(serializers.ModelSerializer):
    """
    Serializer for PAR object
    """
    class Meta:
        model = Par
        fields = '__all__'

    
class SubmissionSerializer(serializers.ModelSerializer):
    """
    Serializer for Submission object
    """
    class Meta:
        model = Submission
        fields = [
            'last_updated',
            'week',
            'month',
            'year'
        ]


class ItemresetSerializer(serializers.ModelSerializer):
    """
    Serializer for Itemreset object
    """
    class Meta:
        model = Itemreset
        fields = '__all__'