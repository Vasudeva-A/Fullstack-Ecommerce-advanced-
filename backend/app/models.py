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
    phone = models.CharField(max_length=50)
    address = models.TextField()
    
    def __str__(self):
        return self.user.username
    