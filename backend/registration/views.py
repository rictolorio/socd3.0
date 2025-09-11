from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import PendingRegistration
from .serializers import PendingRegistrationSerializer


class PendingRegistrationView(generics.CreateAPIView):
    queryset = PendingRegistration.objects.all()
    serializer_class = PendingRegistrationSerializer
    parser_classes = [MultiPartParser, FormParser]  # allow file + text

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
