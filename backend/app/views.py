from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from .models import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter,OrderingFilter
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

    filter_backends=[DjangoFilterBackend,SearchFilter,OrderingFilter]
    search_fields=["name","description","offer_price","cate__name"]
    filterset_fields = ["cate"]
    ordering_fields = [
        "offer_price",
        "created_at",
    ]

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
    # queryset = Cart.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
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


class IncreaseQuantity(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self,request,pk):
        try:
            cart_item = Cart.objects.get(id=pk, user=request.user)
        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart item not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        cart_item.quantity += 1
        cart_item.total = cart_item.quantity * cart_item.product.offer_price
        cart_item.save()

        return Response(
            {"message": "Quantity increased successfully"},
            status=status.HTTP_200_OK
        )


class DecreaseQuantity(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self,request,pk):
        try:
            cart_item = Cart.objects.get(id = pk,user=request.user)
        except Cart.DoesNotExist:
            return Response(
                {
                    'error':"cart Item not found"
                },status=status.HTTP_200_OK
            )
        if cart_item.quantity >1:
            cart_item.quantity -=1
            cart_item.total = cart_item.quantity * cart_item.product.offer_price
            cart_item.save()

            return Response({"message":"decreased succesfully"},status=status.HTTP_200_OK)
        return Response({'error':"Cannot decrease then 0"},status=status.HTTP_400_BAD_REQUEST)


class RemoveFromCart(APIView):
    permission_classes =[IsAuthenticated]
    def delete(self,request,pk):
        try:
            cart_item =Cart.objects.get(id=pk,user=request.user)
        except Cart.DoesNotExist:
            return Response({
                "error":"no item found to be deleted"
            },status=status.HTTP_400_BAD_REQUEST)

        cart_item.delete()
        return Response({"message":"cart item deleted"},status=status.HTTP_200_OK)
     



class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        cart_items = Cart.objects.filter(user=request.user)

        if not cart_items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order = Order.objects.create(
            user=request.user,
            total_amount=0
        )

        grand_total = 0

        for item in cart_items:

            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.offer_price,
            )

            grand_total += item.quantity * item.product.offer_price

        order.total_amount = grand_total
        order.save()

        cart_items.delete()

        return Response(
            {
                "message": "Order created successfully",
                "order_id": order.id,
                "total_amount": order.total_amount,
            },
            status=status.HTTP_201_CREATED,
        )

class MyOrders(APIView):
    permission_classes =[IsAuthenticated]
    def get(self,request):
        orders = Order.objects.filter(user=request.user)
        serializers = OrderSerializer(orders,many=True)
        return Response(serializers.data)

class BuyNow(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        product_id = request.data.get('product_id')
        quantity = request.data.get("quantity",1)
        try:
            product =Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        total = quantity * product.offer_price

        order = Order.objects.create(
            user=request.user,
            total_amount=total,
        )

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=product.offer_price,
        )

        return Response(
            {
                "message": "Order placed successfully",
                "order_id": order.id,
            },
            status=status.HTTP_201_CREATED,
        )
