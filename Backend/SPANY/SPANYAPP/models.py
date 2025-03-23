from kivy.uix.gridlayout import product
from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models import Count

##########------USER MODELS--------##########
class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    def __str__(self):
        return self.user.username


###########------PRODUCT MODELS--------##########
class Category(models.Model):
    category_name = models.CharField(max_length=100)
    category_image = models.ImageField(upload_to="Category", blank=True, null=True)

    def __str__(self):
        return self.category_name


class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    sub_category_name = models.CharField(max_length=100)
    sub_category_image = models.ImageField(upload_to="SubCategory", blank=True, null=True)

    def __str__(self):
        return f"{self.category.category_name} ---> {self.sub_category_name}"


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, blank=True, null=True)
    product_name = models.CharField(max_length=500)
    product_image1 = models.ImageField(upload_to="Product", blank=True, null=True)
    product_image2 = models.ImageField(upload_to="Product", blank=True, null=True)
    product_image3 = models.ImageField(upload_to="Product", blank=True, null=True)
    product_image4 = models.ImageField(upload_to="Product", blank=True, null=True)
    product_image5 = models.ImageField(upload_to="Product", blank=True, null=True)
    highlights = models.TextField(blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_order_quantity = models.PositiveIntegerField()
    size = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    material = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    specification = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    keyword = models.TextField()
    warranty = models.TextField()
    like = models.BigIntegerField(default=0)

    def __str__(self):
        return self.product_name
    
    def calculate_average_rating(self):
        reviews = Review.objects.filter(product=self)
        total_rating = sum([review.rating for review in reviews])
        total_reviews = reviews.count()
        if total_reviews > 0:
            average_rating = total_rating / total_reviews
            self.rating = round(average_rating, 1)  
        else:
            self.rating = 5  
        self.save()
    
    def calculate_favorites(self):
        total_like = Favorites.objects.filter(product=self).aggregate(total=Count('id'))['total']
        self.like = total_like if total_like else 0 
        self.save()


from django.db import models
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver

class FlashSale(models.Model):
    product = models.ForeignKey(Product, related_name="flash_sales", on_delete=models.CASCADE)
    discount_percentage = models.DecimalField(max_digits=4, decimal_places=2)  # Discount percentage
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    quantity_in_stock = models.IntegerField()

    def __str__(self):
        return self.product.product_name
    
    def apply_discount(self):
        discounted_price = self.product.cost_price - (self.product.cost_price * self.discount_percentage / 100)
        self.product.discount=self.discount_percentage
        self.product.price = discounted_price
        self.product.save()

    def revert_price(self):
        self.product.price = self.product.cost_price
        self.product.save()

@receiver(post_save, sender=FlashSale)
def update_product_price_on_flash_sale_creation(sender, instance, created, **kwargs):
    if created:
        instance.apply_discount()

@receiver(post_delete, sender=FlashSale)
def revert_product_price_on_flash_sale_delete(sender, instance, **kwargs):
    """Revert the price when a FlashSale is deleted."""
    instance.revert_price()

@receiver(pre_save, sender=FlashSale)
def update_product_price_on_flash_sale_update(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = FlashSale.objects.get(pk=instance.pk)
            if old_instance.discount_percentage != instance.discount_percentage:
                instance.revert_price()  
                instance.apply_discount()  
        except FlashSale.DoesNotExist:
            instance.apply_discount()
    else:
        instance.apply_discount()


##########------USER BASED MODELS--------##########
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    customuser=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    comment = models.TextField(blank=True, null=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1 ,default=0)
    video_review = models.FileField(upload_to="video_review", blank=True, null=True)
    image_review = models.FileField(upload_to="image_review", blank=True, null=True)

    def __str__(self):
        return f"Review for {self.product.product_name}"

@receiver(post_save, sender=Review)
def update_product_rating_on_review_save(sender, instance, created, **kwargs):
    # Update the product rating when a review is saved (added or updated)
    if instance.product:
        instance.product.calculate_average_rating()

class Vouchers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    discount_type = models.CharField(max_length=10,choices=[('percentage', 'Percentage'),('flat', 'Flat')]) 
    voucher_code = models.CharField(max_length=50)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)
    expiration_date = models.DateField()
    offer_description = models.CharField(max_length=1000)  
    sub_description = models.TextField(blank=True, null=True) 
    terms_and_conditions = models.TextField(blank=True, null=True) 
    is_used = models.BooleanField(default=False)
 
    def __str__(self):
        return f"Voucher {self.voucher_code} for {self.user.username}"


class PaymentCards(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_holder_name=models.CharField(max_length=20,null=True,blank=True)
    card_number = models.CharField(max_length=16) 
    last_four_digits = models.CharField(max_length=4)  
    expiration_date = models.CharField(max_length=5)
    cvv = models.CharField(max_length=3) 
    token = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Card ending in {self.last_four_digits} for {self.user.username}"

class ShippingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    landmark = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    zipcode = models.CharField(max_length=20)
    country = models.CharField(max_length=200)
    default = models.BooleanField()

    def __str__(self):
        return f"{self.name} - {self.address}, {self.city}, {self.state}, {self.zipcode}, {self.country}"


from django.db import models

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    voucher=models.ForeignKey(Vouchers,on_delete=models.SET_NULL,null=True,blank=True)
    shipping_address=models.ForeignKey(ShippingAddress,on_delete=models.SET_NULL,null=True, blank=True)
    date_ordered = models.DateField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    order_id = models.CharField(max_length=100, null=True, blank=True)
    ordertype = models.CharField(max_length=20, choices=[
        ('Express', 'Express'),
        ('Standard', 'Standard'),
    ], default="Standard")
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Shipped', 'Shipped'),
        ('In Transit', 'In Transit'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ], default="Pending")


class ShippingUpdate(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='shipping_updates')
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Shipped', 'Shipped'),
        ('In Transit', 'In Transit'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ])
    location = models.CharField(max_length=255, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"Update for Order {self.order.order_id} - {self.status} at {self.timestamp}"


class OrderItems(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.product_name


class Favorites(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Favorite - {self.product.product_name}"


@receiver(post_save, sender=Favorites)
def update_product_rating_on_review_save(sender, instance, created, **kwargs):
    if instance.product:
        instance.product.calculate_favorites()

