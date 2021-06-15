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
        fields = ('par', 'reset_level')