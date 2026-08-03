from django.db import models
from django.contrib.auth.models import User


# Create your models here


class Category(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="category_images/",null=True,blank=True)
    created_at = models.DateTimeField(auto_now =True)

    def __str__(self):
        return self.name
class Product(models.Model):
    cate = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='products')
    name = models.CharField(max_length=100)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    offer_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    img = models.ImageField(upload_to='product_images/', blank=True, null=True)
    is_trend = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    phone = models.CharField(max_length=50,blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.user.username
class Cart(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"



class Order(models.Model):
    STATUS = (
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered"),
        ("Cancelled", "Cancelled"),
    )

    user = models.ForeignKey(User,related_name="orders",on_delete=models.CASCADE)
    total_amount = models.DecimalField( max_digits=15, decimal_places=2)
    status = models.CharField(choices=STATUS,default="Pending", max_length=50)
    payment_method = models.CharField(max_length=50, blank=True)
    payment_status = models.CharField(max_length=30, default="Pending")

    address = models.TextField(blank=True)

    phone = models.CharField(max_length=15, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}- {self.status}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField( max_digits=15, decimal_places=2)

    def __str__(self):
        return self.product.name