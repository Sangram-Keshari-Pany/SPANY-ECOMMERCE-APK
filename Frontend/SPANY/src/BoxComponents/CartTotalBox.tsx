import { StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { useCallback } from 'react';
import CartBox from './CartBox';
import CartBoxDetails from './CartBoxDetails';
import { contentWidth, dynamicMargin, dynamicWidth } from '../Themes/color';
import { OrderApiFunction } from '../functionality/apifunctions';
import { useData } from '../functionality/APICall';

const CartTotalBox = ({ orderitems, navigation, keys = 'OSCCCTB' }: any) => {
  const {fetchdata}=useData()
  
  const handleDelete = useCallback(() => {
    OrderApiFunction({ product: orderitems.product.id, functionality: 'delete', order: orderitems.order.id, }, navigation, fetchdata);
  }, [orderitems.product.id, orderitems.order.id, navigation, fetchdata]);

  return (
    <View style={styles.cart}>
      <CartBox key={keys + "CartBox" + orderitems.product.id} product={orderitems.product} navigation={navigation} DeleteFunction={handleDelete}/>
      <CartBoxDetails key={keys + "CartBoxDetails" + orderitems.product.id} orderitems={orderitems} navigation={navigation} />
    </View>    
  );
};

const styles = StyleSheet.create({
  cart: {
    width:contentWidth,
    height:dynamicWidth*0.28, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:dynamicMargin,
    marginVertical:dynamicMargin*0.25
}
});

export default CartTotalBox;
