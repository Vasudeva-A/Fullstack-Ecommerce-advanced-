from django.urls import path
from .serializers import*
from .models import * 
from .views import *
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)

urlpatterns = [
    path('home/',HomePageView.as_view()),
    path('register/',RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('products/', Product_View.as_view()), 
    path('products/<int:pk>/', ProductDetailView.as_view()), 
    path('category/', CategoryView.as_view()),
    path('category/<int:pk>/products/', CategoryProductsView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('cart/', CartView.as_view()),
    path('add-to-cart/', AddToCart.as_view()),
    path('increase/<int:pk>/', IncreaseQuantity.as_view()),
    path('decrease/<int:pk>/', DecreaseQuantity.as_view()),
    path('delete/<int:pk>/', RemoveFromCart.as_view()),
 ]
