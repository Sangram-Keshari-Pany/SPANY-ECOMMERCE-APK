import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, Themes } from '../Themes/color';
import ProfilePhotos from './ProfilePhoto';

interface Product {product_name: string;product_image1: string;price: number;}
interface PaymentItemsBoxProps {item: { product: Product };}

const PaymentItemsBox: React.FC<PaymentItemsBoxProps> = ({ item }) => {
  const { product_name, product_image1, price } = item.product;
  const imageUrl = product_image1 || ''; 
  const displayPrice = price && price > 0 ? Math.round(price) : 0;

  return (
    <View style={styles.item}>
      <View style={styles.itemImage}>
        <ProfilePhotos imageurl={imageUrl} />
      </View>
      <View style={styles.itemTextBox}>
        <Text style={styles.itemText}>{product_name}</Text>
      </View>
      <View style={styles.itemPriceBox}>
        {displayPrice > 0 ? (
          <Text style={styles.itemPrice}>₹{displayPrice}</Text>
        ) : (
          <Text style={styles.itemPrice}>₹0</Text> 
        )}
      </View>
    </View>
  );
};

export default PaymentItemsBox;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: dynamicWidth,
    marginHorizontal: dynamicMargin,
    marginVertical: dynamicMargin * 0.25,
  },
  itemImage: {
    height: dynamicWidth * 0.17,
    width: dynamicWidth * 0.17,
    borderRadius: "50%",
    overflow: 'hidden',
    shadowColor: Themes.color4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: Themes.color10,
    backgroundColor: Themes.color1,
  },
  itemTextBox: {
    flex: 1,
    padding: dynamicPadding * 0.25,
  },
  itemText: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
  },
  itemPriceBox: {
    width: dynamicWidth * 0.2,
  },
  itemPrice: {
    fontSize: dynamicFontSize * 1.5,
    fontWeight: 'bold',
    color: Themes.color9,
    textAlign:"right"
  },
});
