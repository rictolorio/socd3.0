# registration\models.py

# registration/models.py
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password

class PendingRegistration(models.Model):
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
       
    ]

    CIVIL_STATUS_CHOICES = [
        ("single", "Single"),
        ("married", "Married"),
        ("widowed", "Widowed"),
       
    ]

    # Credentials
    username = models.CharField(max_length=150, unique=True, null=True)
    email = models.EmailField(unique=True, null=True)
    password = models.CharField(max_length=128, null=True)  # will store hashed

    # Personal info
    full_name = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    civil_status = models.CharField(max_length=20, choices=CIVIL_STATUS_CHOICES)   
    birth_date = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone_no = PhoneNumberField(null=False, blank=False, unique=True)

    # Uploads
    photo = models.ImageField(upload_to="users/photos/")
    id_card = models.ImageField(upload_to="users/id_cards/")

    # Consent
    consent_given = models.BooleanField(default=False)    

    # Metadata
    submitted_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Ensure password is hashed before saving
        if self.password and not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} ({self.username})"
