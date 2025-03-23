from rest_framework.response import Response
from SPANYAPP.models import CustomUser
from rest_framework import status
from SPANYAPP.serializer import RegistationSerializer, CustomUserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import NotFound
from twilio.rest import Client
from django.conf import settings
import random
from django.core.mail import EmailMessage
import json


def RegistrationFunctionality(self, request, *args, **kwargs):
    try:
        user_data = json.loads(request.data.get("user"))
        phone_number = request.data.get('phone_number')
        profile_picture = request.data.get('profile_picture')

        user_serializer = self.get_serializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        validated_data = {'user': user.id,"phone_number": phone_number, "profile_picture": profile_picture}

        custom_user_serializer = CustomUserSerializer(data=validated_data)
        custom_user_serializer.is_valid(raise_exception=True)
        custom_user = custom_user_serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            'user': RegistationSerializer(user, context=self.get_serializer_context()).data,
            'custom_user': CustomUserSerializer(custom_user, context=self.get_serializer_context()).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        })
    except Exception as error:
        print(error)
        raise NotFound(detail="User Already exists")

def LoginFunctionality(self, request, *args, **kwargs):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        print(username,username)
        print(password,'password')
        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
        custom_user = CustomUser.objects.get(user=user)
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': RegistationSerializer(user, context=self.get_serializer_context()).data,
            'custom_user': CustomUserSerializer(custom_user ,context={'request': request}).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        })
    
    except CustomUser.DoesNotExist:
        return Response({"error": "Custom user data not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def OtpFunctionality(self,request,*args,**kwargs):
    username=request.data['username']
    selectedoption=request.data['selectedoption']
    try:
        otp = random.randint(100000, 999999)
        customuser= CustomUser.objects.get(user__username=username)
        message_content=f"Your OTP to reset your password is: {otp}. Please use this code within 10 minutes. If you did not request this, please ignore this message."

        print(selectedoption)
        if selectedoption =="SMS":
            account_sid = settings.TWILIO_ACCOUNT_SID
            auth_token = settings.TWILIO_AUTH_TOKEN
            twilio_phone_number = settings.TWILIO_PHONE_NUMBER
            client = Client(account_sid, auth_token)
            print(customuser.phone_number)
            message = client.messages.create(
                to=f'+91 {customuser.phone_number}', 
                from_=twilio_phone_number,
                body=message_content
            )
        elif selectedoption =="Email":
            message="Forget Password"
            email_message=EmailMessage(message,message_content,settings.EMAIL_HOST_USER,[customuser.user.email])
            email_message.send()
        
        return Response({'generated_otp': otp})
    except Exception as e:
        print(e)
        return Response({'error': f"An error occurred: {str(e)}"}, status=500)
