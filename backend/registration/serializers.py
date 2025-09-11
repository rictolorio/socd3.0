from rest_framework import serializers
from .models import PendingRegistration

class PendingRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingRegistration
        fields = "__all__"   # or list specific fields
