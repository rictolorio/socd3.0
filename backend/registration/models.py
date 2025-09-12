# registration/models.py
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password


class PendingRegistration(models.Model):
    # --- Choices ---
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
       
    ]

    CIVIL_STATUS_CHOICES = [
        ("single", "Single"),
        ("married", "Married"),
        ("widowed", "Widowed"),
       
    ]

    # --- Credentials ---
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # store hashed password only

    # --- Personal info ---
    full_name = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    civil_status = models.CharField(max_length=20, choices=CIVIL_STATUS_CHOICES)
    birth_date = models.DateField()
    address = models.TextField()
    phone_no = PhoneNumberField(unique=True)

    # --- Uploads ---
    photo = models.ImageField(upload_to="users/photos/")
    id_card = models.ImageField(upload_to="users/id_cards/")

    # --- Consent ---
    consent_given = models.BooleanField(default=False)

    # --- Metadata ---
    submitted_at = models.DateTimeField(auto_now_add=True)

    # --- Save override ---
    def save(self, *args, **kwargs):
        # Always hash plain-text passwords before saving
        if self.password and not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} ({self.username})"
