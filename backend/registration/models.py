from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
from django.db import models


class PendingRegistration(models.Model):
    GENDER_CHOICES = [
    ("male", "Male"),
    ("female", "Female"),
    ("other", "Other"),
    ]

    CIVIL_STATUS_CHOICES = [
    ("single", "Single"),
    ("married", "Married"),
    ("widowed", "Widowed"),
    ("separated", "Separated"),
    ("divorced", "Divorced"),  # optional, depending on local gov’t
    ]

    full_name = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)    
    civil_status = models.CharField(max_length=20, choices=CIVIL_STATUS_CHOICES)
    id_number = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone_no = PhoneNumberField(null=False, blank=False, unique=True)

    photo = models.ImageField(upload_to="users/photos/")
    id_card = models.ImageField(upload_to="users/id_cards/")
    submitted_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.full_name} ({self.gender}, {self.civil_status}) - {self.status}"