# registration\views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import PendingRegistration
from .serializers import PendingRegistrationSerializer


class PendingRegistrationView(generics.CreateAPIView):
    queryset = PendingRegistration.objects.all()
    serializer_class = PendingRegistrationSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]  # file + text

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if not serializer.validated_data.get("consent_given"):
                return Response(
                    {"error": "Consent is required to proceed."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

