from django.contrib import admin
from SPANYAPP.models import ShippingAddress,Vouchers
from SPANYAPP.models import Category,SubCategory,Product,FlashSale,Favorites
from SPANYAPP.models import Order,OrderItems,Review,PaymentCards,ShippingUpdate
from SPANYAPP.models import CustomUser

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(ShippingAddress)
admin.site.register(Vouchers)

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)
admin.site.register(FlashSale)

admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(Favorites)
admin.site.register(ShippingUpdate)

admin.site.register(Review)
admin.site.register(PaymentCards)
