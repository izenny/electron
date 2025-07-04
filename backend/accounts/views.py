from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import *

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Auto-login with JWT
            token_serializer = TokenObtainPairSerializer(data={
                "username": request.data["username"],
                "password": request.data["password"]
            })
            if token_serializer.is_valid():
                return Response({
                    "message": "User registered and logged in successfully.",
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                    "token": token_serializer.validated_data
                }, status=status.HTTP_201_CREATED)

            return Response(token_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
