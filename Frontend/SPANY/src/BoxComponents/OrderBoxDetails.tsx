import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomIcons from '../Themes/CustomIcons';
import { useData } from '../functionality/APICall';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, dynamicWidth, Themes } from '../Themes/color';

const OrderBoxDetails = ({ orderitems, navigation,setReview,setSelectedOrder }: any) => {
  return (
    <View style={styles.CartBox2}>
      <View style={styles.CartBox3}>
        <Text style={styles.ProductName} allowFontScaling={false}>
          {orderitems.product.product_name.slice(0, 50)}
        </Text>
        <Text style={styles.ProductSize} allowFontScaling={false}>
          {orderitems.order.order_id}
        </Text>
      </View>
      <View style={styles.CartBox4}>
        <View style={styles.estimatedate}>
            <Text style={styles.estimatedatetext}>{orderitems.date_added.slice(0,10)}</Text>
        </View>
        <TouchableOpacity style={styles.review} onPress={()=>{setReview(true); setSelectedOrder(orderitems);}}>
            <Text style={styles.reviewtext}>Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CartBox2: {
    height: "100%",
    width: '55%',
    marginLeft:dynamicMargin*0.5,
  },
  CartBox3: {
    height:"75%",
    flexDirection: 'column',
    justifyContent: 'center',
  },
  CartBox4: {
    height: "25%",
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems:"center",
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Themes.color3,
  },
  Count: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
  ProductName: {
    flex: 1,
    color: Themes.color9,
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
  },
  ProductSize: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
  estimatedate:{
    height:"100%",
    width:"49%",
    backgroundColor:Themes.color5,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:dynamicBorderRadius
  },
  review:{
    height:"100%",
    width:"45%",
    borderRadius:dynamicBorderRadius,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1,
    borderColor:Themes.color2
  },
  estimatedatetext:{
    fontSize:dynamicFontSize,
    color:Themes.color9,
    fontWeight:"bold"
  },
  reviewtext:{
    fontSize:dynamicFontSize*1.5,
    color:Themes.color2,
    fontWeight:"bold"
  },
});

export default OrderBoxDetails;
