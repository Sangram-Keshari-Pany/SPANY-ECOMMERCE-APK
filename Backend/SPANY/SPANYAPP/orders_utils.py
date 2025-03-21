from rest_framework.response import Response
from SPANYAPP.models import CustomUser,Order, OrderItems, Favorites,Product
from SPANYAPP.serializer import ReviewCreateSerializer
from SPANYAPP.serializer import OrderItemsSerializer,CartItemsSerializer,OrderSerializer
from rest_framework import status

def OrderItemsFunctionlity (self, request, *args, **kwargs):
    order, created = Order.objects.get_or_create(user=request.user, complete=False)
    orderitemdata = request.data
    orderitemdata.update({'order': order.id, 'user': request.user})
    functionality = orderitemdata.get('functionality', None)  # Safer retrieval of functionality
    try:
        orderitem = OrderItems.objects.get(product=orderitemdata['product'], order=orderitemdata['order'])
        if functionality == "add":
            orderitem.quantity += 1
            orderitem.save()
            return Response({"status":"increse","message": "Quantity updated successfully"}, status=status.HTTP_200_OK)
        elif functionality == "remove":
            orderitem.quantity -= 1
            orderitem.save()
            if orderitem.quantity <= 0 or functionality == "delete" :
                orderitem.delete()
                return Response({"status":"success","message": "Item Removed successfully"}, status=status.HTTP_200_OK)
        elif functionality == "delete" :
            orderitem.delete()
            return Response({"status":"success","message": "Item Removed successfully"}, status=status.HTTP_200_OK)
        elif functionality=='Buy Now':
            return Response({"status":"increse","message": "Quantity updated successfully"}, status=status.HTTP_200_OK)

        return Response({"status":"success","message": "Item Already in Cart"}, status=status.HTTP_200_OK)
    except OrderItems.DoesNotExist:
            order_item_serializer = OrderItemsSerializer(data=orderitemdata)
            if order_item_serializer.is_valid():
                order_item_serializer.save()
                return Response({"status":"success","message": "Item Added successfully"}, status=status.HTTP_201_CREATED)

            return Response({"status":"error","message": "Something Wents Wrong"}, status=status.HTTP_400_BAD_REQUEST)



def DeleveryItemsFunctionality(self,request,*args,**kwargs):
    orders = Order.objects.filter(user=request.user, complete=True).select_related('user').order_by('-id')
    order_serializer = OrderSerializer(orders, many=True)
    order_array = []
    for order in order_serializer.data:
        order_items = OrderItems.objects.filter(order=order['id']).select_related('product')
        order_items_serializer = CartItemsSerializer(order_items, many=True,context={'request': request}).data
        order_array.append(order_items_serializer)
    return Response(order_array)

def ReviewItemsFuntionality(self,request,*args,**kwargs):
    review_data = request.data
    custom_user = CustomUser.objects.get(user=request.user)
    review_data['user'] = request.user.id
    review_data['customuser'] = custom_user.id
    review_serializer = ReviewCreateSerializer(data=review_data)
    if review_serializer.is_valid():
        review_serializer.save()
        return Response({"success": "Review successfully created.","data": review_serializer.data}, status=status.HTTP_201_CREATED)
    return Response(review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def FavoriteItemsFunctionality(self,request,*args,**kwargs):
    product_id = request.data.get('product')
    if not product_id:
        return Response({'error': 'Product ID is required'}, status=400)
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)
    favorite, created = Favorites.objects.get_or_create(product=product, user=request.user)
    if created:
        return Response({'status': 'success', 'message': 'Favorite added successfully'}, status=200)
    else:
        favorite.delete()
        return Response({'status': 'success', 'message': 'Favorite removed successfully'}, status=200) 
