import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import CartTotalBox from '../BoxComponents/CartTotalBox';
import WishlistEmpty from '../BoxComponents/WishlistEmpty';
import { dynamicMargin } from '../Themes/color';

const CartComponent = ({ orderitems, navigation }: any) => {

  if (!orderitems || orderitems.length === 0) {
    return <WishlistEmpty svgname={"EmptyCart"} />;
  }

  const renderItem = ({ item }: any) => {
    if (item?.order?.complete === false) {
      return <CartTotalBox key={"OrderItems" + item.id} orderitems={item} navigation={navigation} />;
    }
    return null;
  };

  return (
      <FlatList
        data={orderitems}
        renderItem={renderItem}
        keyExtractor={(item: any) => "OrderItems" + item.id}
        ListEmptyComponent={<WishlistEmpty svgname={"EmptyCart"} />}        
      />
  );
};

const styles = StyleSheet.create({});

export default CartComponent;
