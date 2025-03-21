from rest_framework import serializers
from SPANYAPP.models import CustomUser, Category, SubCategory, Product, FlashSale
from SPANYAPP.models import Order, OrderItems, Favorites, Review,ShippingUpdate
from django.contrib.auth.models import User
from SPANYAPP.models import ShippingAddress,Vouchers,PaymentCards

# ------------------- USER SERIALIZERS -------------------
# USER SERIALIZER 
class RegistationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User(username=validated_data['username'], password=validated_data['password'], email=validated_data['email'])
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['user', 'phone_number', 'profile_picture']
    
    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return self.context['request'].build_absolute_uri(obj.profile_picture.url)
        return None


class CustomerFetch(serializers.ModelSerializer):
    user = RegistationSerializer()

    class Meta:
        model = CustomUser
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)  # Create the User instance first
        customuser = CustomUser(user=user, **validated_data)  # Pass the rest of the data to create CustomUser
        customuser.save()
        return customuser


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

# ------------------- PRODUCT AND CATEGORY SERIALIZERS -------------------
# CATEGORY SERIALIZER 
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# SUBCATEGORY SERIALIZER 
class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = "__all__"


# PRODUCT SERIALIZER 
class ProductSerializer(serializers.ModelSerializer):
    product_image1 = serializers.SerializerMethodField()
    product_image2 = serializers.SerializerMethodField()
    product_image3 = serializers.SerializerMethodField()
    product_image4 = serializers.SerializerMethodField()
    product_image5 = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = [
            'id', 'product_name', 'price', 'discount', 'cost_price',
            'minimum_order_quantity', 'size', 'color', 'material', 'brand',
            'specification', 'rating', 'keyword', 'warranty', 'like',
            'product_image1', 'product_image2', 'product_image3', 'product_image4', 'product_image5'
        ]

    def get_product_image1(self, obj):
        if obj.product_image1:
            return self.context['request'].build_absolute_uri(obj.product_image1.url)
        return None

    def get_product_image2(self, obj):
        if obj.product_image2:
            return self.context['request'].build_absolute_uri(obj.product_image2.url)
        return None

    def get_product_image3(self, obj):
        if obj.product_image3:
            return self.context['request'].build_absolute_uri(obj.product_image3.url)
        return None

    def get_product_image4(self, obj):
        if obj.product_image4:
            return self.context['request'].build_absolute_uri(obj.product_image4.url)
        return None

    def get_product_image5(self, obj):
        if obj.product_image5:
            return self.context['request'].build_absolute_uri(obj.product_image5.url)
        return None


# ------------------- FLASH SALE SERIALIZER -------------------
# FLASH SALE SERIALIZER 
class FlashSaleSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = FlashSale
        fields = ['id', 'start_time', 'end_time', 'quantity_in_stock', 'discount_percentage', 'product']

# ------------------- ORDER AND ORDER ITEMS SERIALIZERS -------------------
# ORDER SERIALIZER 
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

  

# ORDER ITEMS SERIALIZER 
class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = "__all__"


# CART ITEMS SERIALIZER 
class CartItemsSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    order = OrderSerializer()

    class Meta:
        model = OrderItems
        fields = ['id', 'product', 'order', 'quantity', 'date_added']

# ------------------- FAVORITES SERIALIZER -------------------
# FAVORITES SERIALIZER 
class FavoritesSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Favorites
        fields = ['id', 'product']

# ------------------- REVIEW SERIALIZER -------------------
# REVIEW SERIALIZER 
class ReviewSerializer(serializers.ModelSerializer):
    customuser=CustomUserSerializer()
    user=RegistationSerializer()
    class Meta:
        model = Review
        fields = ['user','customuser', 'product', 'comment', 'rating', 'video_review', 'image_review']

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class ShippingUpdateeSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingUpdate
        fields="__all__"

# ------------------- REVIEW SERIALIZER -------------------
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields="__all__"

class VoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vouchers
        fields="__all__"

class PaymentCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentCards
        fields = "__all__"
