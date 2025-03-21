import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomIcons from '../Themes/CustomIcons';
import { add, OrderApiFunction } from '../functionality/apifunctions';
import { useData } from '../functionality/APICall';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicPadding, Themes } from '../Themes/color';


interface WishlistBoxdetailsProps {product: any;navigation: any;}

const WishlistBoxdetails: React.FC<WishlistBoxdetailsProps> = ({ product, navigation }) => {
  const { fetchdata } = useData();

  const perform = (Function: any, functionality: string) => {
    const orderdetails = { product: product.id, functionality };
    Function(orderdetails, navigation, fetchdata);
  };

  return (
    <View style={styles.wishlistBox2}>
      <TouchableOpacity style={styles.wishlistBox3} onPress={() => navigation.navigate('productscreen', product )}>
        <Text style={styles.productName} allowFontScaling={false}>
          {product.product_name.slice(0, 50)}
        </Text>
        <View style={styles.wishlistBox5}>
          <Text style={styles.Count} allowFontScaling={false}>
            ₹ {Math.round(product.price)}
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.wishlistBox4}>
        <View style={styles.wishlistBox5}>
          <View style={styles.wishlistBox6}>
            <Text style={styles.Text} allowFontScaling={false}>
              Pink
            </Text>
          </View>
          <View style={styles.wishlistBox6}>
            <Text style={styles.Text} allowFontScaling={false}>
              M
            </Text>
          </View>
        </View>
        <View style={styles.wishlistBox7}>
          <TouchableOpacity onPress={() => perform(OrderApiFunction, 'wishlist')}>
            <CustomIcons color={Themes.color2} name="shoppingcart" size={dynamicIconSize * 0.7} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wishlistBox2: {
    height: '100%',
    width: '55%',
    paddingLeft: dynamicPadding * 0.5,
  },
  wishlistBox3: {
    height: "70%",
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productName: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
  wishlistBox4: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
  },
  wishlistBox5: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: dynamicPadding * 0.25,
  },
  wishlistBox6: {
    height: '90%',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.color3,
    borderRadius: dynamicBorderRadius * 0.25,
  },
  wishlistBox7: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Count: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: dynamicFontSize,
    color: Themes.color9,
  },
  Text: {
    fontSize: dynamicFontSize * 0.8,
    textAlign: 'center',
    color: Themes.color9,
  },
});

export default WishlistBoxdetails;
