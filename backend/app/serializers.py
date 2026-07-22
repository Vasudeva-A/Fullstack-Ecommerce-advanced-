from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = "__all__"

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError( {"confirm_password": "Passwords do not match."})
        return attrs
    
    def create(self,validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username = validated_data['username'],
            email= validated_data['email'],
            password=validated_data['password']
        )
        # Profile.objects.create(user=user)
        return user


# class HomePageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Homepage
#         fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    cate = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"