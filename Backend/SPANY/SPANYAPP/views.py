from rest_framework.generics import ListAPIView,  UpdateAPIView, GenericAPIView,ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from SPANYAPP.models import CustomUser, Category, SubCategory, Product, FlashSale, Order, OrderItems, Favorites, Review,ShippingAddress,Vouchers,PaymentCards,ShippingUpdate
from SPANYAPP.serializer import CategorySerializer, SubCategorySerializer, ProductSerializer, FlashSaleSerializer
from SPANYAPP.serializer import CartItemsSerializer, FavoritesSerializer, ReviewSerializer, OrderSerializer,ShippingUpdateeSerializer
from SPANYAPP.serializer import ShippingAddressSerializer,VoucherSerializer,PaymentCardSerializer
from django.utils import timezone
from rest_framework import status
from SPANYAPP.serializer import RegistationSerializer, LoginSerializer, CustomerFetch
from rest_framework.permissions import  IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import NotFound
from django.contrib.auth.models import User
from SPANYAPP.authentication_utils import RegistrationFunctionality,LoginFunctionality,OtpFunctionality
from SPANYAPP.orders_utils import OrderItemsFunctionlity,DeleveryItemsFunctionality,ReviewItemsFuntionality,FavoriteItemsFunctionality


# ##########################
# USER API VIEWS
# ##########################

class RegistrationView(GenericAPIView):
    """User registration API.==>Creates a new user and custom user profile.==>Returns access and refresh tokens."""
    serializer_class = RegistationSerializer
    def post(self, request, *args, **kwargs):
        return RegistrationFunctionality(self, request, *args, **kwargs)
    
class CustomerFetchView(ListAPIView):
    """Fetch customer details using username."""
    serializer_class = CustomerFetch
    def get_queryset(self):
        try:
           username = self.kwargs.get('username')
           user= CustomUser.objects.get(user__username=username)
           return CustomUser.objects.filter(id=user.id)
        except :
            raise NotFound(detail="Customer not found")
        
class LoginView(GenericAPIView):
    """Login API for users.Returns JWT tokens if authentication is successful."""
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        return LoginFunctionality(self, request, *args, **kwargs)
        
class OtpVerificationView(APIView): 
    def post(self, request,*args,**kwargs):
        return OtpFunctionality(self, request,*args,**kwargs) 

class ForgetPasswordView(APIView):
    def patch (self,requuest,*args,**kwargs):
        new_password=requuest.data['newpassword']
        username=requuest.data['username']
        user=User.objects.get(username=username)
        user.set_password(new_password)
        user.save()
        return Response ({"message": "Password updated successfully."})


# ##########################
# PRODUCT API VIEWS
# ##########################
class CategoryView(ListAPIView):
    """Fetch all product categories.Requires authentication."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubCategoryView(ListAPIView):
    """Fetch all product subcategories.Requires authentication."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class ProductView(ListAPIView):
    """Fetch all products.Requires authentication."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class FlashShaleView(ListAPIView):
    """Fetch products that are on flash sale (active)."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = FlashSale.objects.filter(end_time__gt=timezone.now())
    serializer_class = FlashSaleSerializer

class ReviewView(ListCreateAPIView):
    """API to get all reviews of products and create new reviews."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    
    def post(self, request, *args, **kwargs):
        return ReviewItemsFuntionality(self, request, *args, **kwargs)


# ##########################
# ORDER API VIEWS
# ##########################
class FavoritesView(ListAPIView):
    """API to get all favorite products of the authenticated user."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FavoritesSerializer
    def get_queryset(self):
        return Favorites.objects.filter(user=self.request.user)
    def post(self, request, *args, **kwargs):
        return FavoriteItemsFunctionality(self,request,*args,**kwargs)
    
class CartItemsView(ListAPIView):
    """Fetch cart items for the authenticated user."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemsSerializer
    def get_queryset(self):
        return OrderItems.objects.filter(order__user=self.request.user, order__complete=False)

class OrderView(UpdateAPIView):
    """Update an existing order."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = "id"

class DeliverItemsView(APIView):
    """Fetch completed orders and their items for the authenticated user."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return DeleveryItemsFunctionality(self, request, *args, **kwargs)

class OrderItemsView(APIView):
    """Add or remove items from the order.If the product is already in the order, update the quantity."""
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        return OrderItemsFunctionlity(self, request, *args, **kwargs)
    

class ShippingAddressView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ShippingAddressSerializer

    def update_other_addresses(self):
        """Helper method to set all other addresses to default=False."""
        addresses = ShippingAddress.objects.filter(user=self.request.user)
        addresses.exclude(default=False).update(default=False)

    def get_address(self, id=None):
        """Helper method to fetch address based on ID and user."""
        try:
            if id:
                return ShippingAddress.objects.get(id=id, user=self.request.user)
            return ShippingAddress.objects.filter(user=self.request.user)
        except ShippingAddress.DoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        """Retrieve all shipping addresses for the authenticated user."""
        addresses = self.get_address()
        if addresses is not None:
            address_serializer = ShippingAddressSerializer(addresses, many=True)  
            return Response(address_serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No addresses found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        """Create a new shipping address."""
        shipping_data = request.data
        shipping_data['user'] = self.request.user.id  
        if shipping_data.get('default', True):
            self.update_other_addresses()
        address_serializer = ShippingAddressSerializer(data=shipping_data)
        if address_serializer.is_valid():
            address_serializer.save()
            return Response(address_serializer.data, status=status.HTTP_201_CREATED)
        return Response(address_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        """Update an existing shipping address."""
        shipping_data = request.data
        shipping_data['user'] = self.request.user.id  

        if shipping_data.get('default', True):
            self.update_other_addresses()
        address = self.get_address(id)
        if address is None:
            return Response({"detail": "Address not found or you do not have permission to edit it."}, status=status.HTTP_404_NOT_FOUND)
        address_serializer = ShippingAddressSerializer(address, data=shipping_data)
        if address_serializer.is_valid():
            address_serializer.save()
            return Response(address_serializer.data, status=status.HTTP_200_OK)
        return Response(address_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        """Delete a shipping address."""
        address = self.get_address(id)
        if address is None:
            return Response({"detail": "Address not found or you do not have permission to delete it."}, status=status.HTTP_404_NOT_FOUND)

        address.delete()
        return Response({"status": "success", "message": "Address deleted successfully"}, status=status.HTTP_200_OK)



class VouchersView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class=VoucherSerializer
    def get_queryset(self):
        vouchers=Vouchers.objects.filter(user=self.request.user)
        return vouchers


class PaymentCardListCreateView(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentCardSerializer

    def get_queryset(self):
        return PaymentCards.objects.filter(user=self.request.user)
    
    def post(self, request, *args, **kwargs):
        card_details = request.data
        card_details['user'] = self.request.user.id  

        existing_card = PaymentCards.objects.filter(user=self.request.user,card_number=card_details['card_number']).first()
        if existing_card:
            return Response({"error": "You have already added this card."}, status=status.HTTP_400_BAD_REQUEST)

        card_serializer = PaymentCardSerializer(data=card_details)
        if card_serializer.is_valid():
            card_serializer.save()
            return Response({"success": "Payment card successfully created","data": card_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(card_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShippingUpdateView(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class=ShippingUpdateeSerializer

    def get_queryset(self):
        return ShippingUpdate.objects.filter(user=self.request.user) 
