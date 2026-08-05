from django.urls import path
from .views import *
urlpatterns = [

    path('dashboard/',DashboardView.as_view()),
    path('dashboard/products/',DashboardProducts.as_view()),
    path('dashboard/products/<int:pk>/',DashboardProductDetails.as_view()),
    path('dashboard/category/',DashboardCategory.as_view()),
    path('dashboard/category/<int:pk>/',DashboardCategoryDetail.as_view()),
    path('dashboard/order/',DashboardOrders.as_view()),
    path('dashboard/order/<int:pk>/',DashboardOrderDetail.as_view()),
    path('dashboard/user/',DashboardUsers.as_view()),
    path('dashboard/user/<int:pk>/',DashboardUserDetail.as_view()),
]