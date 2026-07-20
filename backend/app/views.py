from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser,FormParser
# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class HomePageView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_trend=True) 

class CategoryView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class CategoryProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    def get_queryset(self):
        category_id = self.kwargs['pk']
        return Product.objects.filter(cate_id = category_id)
    
    

class Product_View(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    parser_classes =[MultiPartParser,FormParser]

# class ProductDetailView(generics.ListAPIView):
#     serializer_class = ProductSerializer
#     def get_queryset(self):
#         product_id = self.kwargs['pk']
#         return Product.objects.filter(id= product_id)
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer