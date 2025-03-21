import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderImageBox from '../BoxComponents/OrderImageBox';
import {
  dynamicBorderRadius,
  dynamicFontSize,
  dynamicMargin,
  dynamicPadding,
  dynamicWidth,
  Themes,
} from '../Themes/color';
import LinearGradient from 'react-native-linear-gradient';

const OrderHistory = ({navigation,deliveritem,Setcurrentorders,setTrackorder,}: any) => {
  const [images_path, setImagePath] = useState([]);
  useEffect(() => {
    let iamge_path: any = [];
    deliveritem.map((orderitems: any) => {
      iamge_path.push(orderitems.product.product_image1);
    });
    setImagePath(iamge_path);
  }, [deliveritem]);
  return (
    <View style={styles.orderbox}>
      <View style={styles.orderimagebox}>
        <OrderImageBox images={images_path} />
      </View>
      <View style={styles.orderboxtext}>   
        <View style={styles.orderboxtext1}>
          <Text style={styles.orderid}>{deliveritem[0].order.order_id}</Text>
          <Text style={styles.orderstatus}>{deliveritem[0].order.status}</Text>
        </View>
        <View style={styles.orderboxtext2}>
          <Text style={styles.items}>{deliveritem.length} items</Text>
          {deliveritem[0].order.status == 'Delivered' ? (
            <TouchableOpacity
              style={styles.TouchableOpacityReview}
              onPress={() => {
                Setcurrentorders(deliveritem), setTrackorder(true);
              }}>
              <Text style={styles.Review}>Review</Text>
            </TouchableOpacity>
          ) : (
            <LinearGradient colors={Themes.gradient1} style={styles.TouchableOpacityTrack} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
            <TouchableOpacity  onPress={()=>{navigation.navigate('DeliveredScreen' ,{order:deliveritem[0].order.id})}}>
              <Text style={styles.Track}>Track</Text>
            </TouchableOpacity>
            </LinearGradient>
          )}
        </View>
      </View>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  orderbox: {
    marginVertical:dynamicMargin*0.25,
    marginHorizontal:dynamicMargin,
    height: dynamicWidth * 0.20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius:dynamicBorderRadius*0.5,
    alignItems:"center",
    backgroundColor: Themes.color1,
    borderColor: Themes.color10,
    padding: dynamicPadding*0.25,
    shadowColor: Themes.color4,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,


  },
  orderimagebox: {
    height:dynamicWidth * 0.18,
    width: dynamicWidth * 0.20,
    overflow: 'hidden',
    backgroundColor:"red",
    borderRadius:dynamicBorderRadius*0.5,
  },
  orderboxtext: {
    flex:1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderboxtext1: {
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal:dynamicMargin*0.5,
  },
  orderid: {
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
    color: Themes.color9,
  },
  orderstatus: {
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
    color: Themes.color9,
  },
  orderboxtext2: {
    marginHorizontal:dynamicMargin*0.1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  TouchableOpacityReview: {
    borderRadius: dynamicBorderRadius,
    borderColor: Themes.color2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:dynamicPadding*0.95,
    paddingVertical:dynamicPadding*0.15,
    marginVertical:dynamicMargin*0.25,
  },
  TouchableOpacityTrack: {
    borderRadius: dynamicBorderRadius,
    backgroundColor: Themes.color2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:dynamicPadding*1.25,
    paddingVertical:dynamicPadding*0.15,
    marginVertical:dynamicMargin*0.25,
  },
  items: {
    fontWeight: 'bold',
    fontSize: dynamicFontSize,
    paddingHorizontal:dynamicPadding*0.5,
    paddingVertical:dynamicPadding*0.15,
    borderRadius: dynamicBorderRadius*0.25,
    backgroundColor: Themes.color3,
    color: Themes.color9,
    marginVertical:dynamicMargin*0.25,
  },
  Review: {
    fontSize: dynamicFontSize*1.2,
    color: Themes.color2,
  },
  Track: {
    fontSize: dynamicFontSize*1.2,
    color: Themes.color6,
  },
});
