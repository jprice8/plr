from rest_framework import serializers

from .models import Par


class ParSerializer(serializers.ModelSerializer):
    """
    Serializer for PAR object
    """
    class Meta:
        model = Par
        fields = ('__all__')

    