from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from SPANYAPP.views import (
    RegistrationView, LoginView, CustomerFetchView,OtpVerificationView,ForgetPasswordView,
    CategoryView, SubCategoryView, ProductView, FlashShaleView,
    OrderItemsView, CartItemsView, DeliverItemsView, FavoritesView, 
    ReviewView, OrderView,ShippingAddressView,VouchersView,PaymentCardListCreateView,ShippingUpdateView
    )

urlpatterns = [
    # User Authentication Routes
    path("registration/", RegistrationView.as_view(), name="user-registration"),
    path("login/", LoginView.as_view(), name="user-login"),
    path("customerfetch/<str:username>/", CustomerFetchView.as_view(), name="fetch-customer"),
    path("otp-verification/", OtpVerificationView.as_view(), name="otp-verification"),
    path("forgetpassword/", ForgetPasswordView.as_view(), name="ForgetPassword"),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'), 

    # Product Routes
    path("category/", CategoryView.as_view(), name="product-category"),
    path("sub_category/", SubCategoryView.as_view(), name="product-subcategory"),
    path("product/", ProductView.as_view(), name="product-list"),
    path("flashshale/", FlashShaleView.as_view(), name="flash-sale-list"),

    # Cart and Order Routes
    path("cartitems/", CartItemsView.as_view(), name="cart-items"),
    path("deliveritems/", DeliverItemsView.as_view(), name="delivered-items"),
    path("orderitems/", OrderItemsView.as_view(), name="order-items"),
    path("orderview/<int:id>", OrderView.as_view(), name="order-detail"),
    path("shippingupdateView", ShippingUpdateView.as_view(), name="ShippingUpdateView"),

    # Favorites and Reviews
    path("favorites/", FavoritesView.as_view(), name="user-favorites"),
    path("review/", ReviewView.as_view(), name="product-reviews"),

    # Example Endpoint (Consider removing or securing this endpoint)
    path("shippingadress/", ShippingAddressView.as_view(), name="shipping-address"),
    path("shippingadress/<int:id>", ShippingAddressView.as_view(), name="shipping-address"),
    path("vouchers/", VouchersView.as_view(), name="vouchers"),
    path("payment_cards/", PaymentCardListCreateView.as_view(), name="payment_cards"),

]
