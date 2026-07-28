from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from .models import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
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



class ProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes =[IsAuthenticated]

    def get_object(self):
        profile, created = Profile.objects.get_or_create(
            user=self.request.user
        )
        return profile

class CartView(generics.ListAPIView):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return  Cart.objects.filter(user =  self.request.user)

class AddToCart(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        product_id = request.data.get( "product_id")
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        cart_item,created =Cart.objects.get_or_create(
            user = request.user,product= product,defaults={
                "quantity": 1,
                "total": product.offer_price,
            },

    )
        if not created:
            cart_item.quantity +=1
            cart_item.total = cart_item.quantity * product.offer_price
            cart_item.save()
            return Response(
                {
                    "message": "Product added to cart successfully"
                },
                status=status.HTTP_200_OK,
            )