# registration\serializers.py

from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import PendingRegistration


class PendingRegistrationSerializer(serializers.ModelSerializer):
    # write-only ensures password isn’t exposed in API responses
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = PendingRegistration
        fields = [
            "id",
            "full_name",
            "gender",
            "civil_status",           
            "birth_date",            
            "address",
            "phone_no",
            "photo",
            "id_card",
            "username",
            "email",
            "password",                         
            "consent_given",  # ✅ your consent field
            "submitted_at",
        ]
        read_only_fields = ["id", "submitted_at"]

    def validate_password(self, value):
        """Extra password checks if needed"""
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters.")
        return value

    def create(self, validated_data):
        # hash password before saving
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
