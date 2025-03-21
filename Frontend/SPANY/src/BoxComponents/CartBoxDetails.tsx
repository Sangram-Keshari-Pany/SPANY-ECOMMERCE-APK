import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import CustomIcons from '../Themes/CustomIcons';
import { OrderApiFunction } from '../functionality/apifunctions';
import { useData } from '../functionality/APICall';
import { dynamicFontSize, dynamicIconSize, dynamicPadding, Themes } from '../Themes/color';

const CartBoxDetails = ({ orderitems, navigation }: any) => {
  const { fetchdata } = useData();

  const handleDecrese = useCallback(() => {
    OrderApiFunction({ product:orderitems.product.id, functionality: 'add',order: orderitems.order.id, }, navigation, fetchdata);
    }, [orderitems.product.id,orderitems.order.id,navigation, fetchdata]);
  
    const handleIncrese = useCallback(() => {
      OrderApiFunction({ product:orderitems.product.id, functionality: 'remove' ,order: orderitems.order.id, }, navigation, fetchdata);
    }, [orderitems.product.id,orderitems.order.id,navigation, fetchdata]);

  return (
    <View style={styles.CartBox2}>
      <View style={styles.CartBox3}>
        <Text style={styles.ProductName} allowFontScaling={false}>
          {orderitems.product.product_name.slice(0, 50)}
        </Text>
        <Text style={styles.ProductSize} allowFontScaling={false}>
          {orderitems.product.size.slice(0, 30)}
        </Text>
      </View>
      <View style={styles.CartBox4}>
        <View style={styles.CartBox5}>
          <Text style={styles.Count} allowFontScaling={false}>
            ₹ {Math.round(orderitems.product.price)}
          </Text>
        </View>
        <View style={styles.CartBox5}>
          <TouchableOpacity onPress={handleIncrese}>
            <CustomIcons color={Themes.color14} name="minuscircleo" size={dynamicIconSize*0.6} />
          </TouchableOpacity>
          <View style={styles.CartBox6}>
            <Text style={styles.Count} allowFontScaling={false}>{orderitems.quantity}</Text>
          </View>
          <TouchableOpacity onPress={handleDecrese}>
            <CustomIcons color={Themes.color2} name="pluscircleo" size={dynamicIconSize*0.6} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CartBox2: {
    height: "100%",
    width: '55%',
    paddingLeft: dynamicPadding*0.5
  },
  CartBox3: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  CartBox4: {
    height: "30%",
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  CartBox5: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CartBox6: {
    height: "100%",
    width: "30%",
    aspectRatio:1,
    display: 'flex',
    borderRadius: "50%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Themes.color3
  },
  Count: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize*1.2,
  },
  ProductName: {
    flex: 1,
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
  ProductSize: {
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
});

export default CartBoxDetails;
