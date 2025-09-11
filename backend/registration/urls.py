# driversys/registration/urls.py
from django.urls import path
from .views import PendingRegistrationView

urlpatterns = [
    path("register/", PendingRegistrationView.as_view(), name="pending-registration"),
]
