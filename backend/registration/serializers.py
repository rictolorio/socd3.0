# registration/serializers.py
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from phonenumber_field.phonenumber import to_python
from .models import PendingRegistration


class PendingRegistrationSerializer(serializers.ModelSerializer):
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
            "consent_given",
            "submitted_at",
        ]
        read_only_fields = ["id", "submitted_at"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate_phone_no(self, value):
        """
        Ensure phone number is always stored in E.164 format
        Example: +639171234567 (for PH)
        """
        phone = to_python(value)
        if not phone or not phone.is_valid():
            raise serializers.ValidationError("Invalid phone number.")
        return phone.as_e164  # ✅ Force E.164 format

    def validate_password(self, value):
        """Extra password checks"""
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters.")
        return value

    def create(self, validated_data):
        # Ensure password is hashed before saving
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
