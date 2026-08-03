from django.contrib import admin

# Register your models here.
from .models import *

# admin.site.register(Homepage)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderItem)