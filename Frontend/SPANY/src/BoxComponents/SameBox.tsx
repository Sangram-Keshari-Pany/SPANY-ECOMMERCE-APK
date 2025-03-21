import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { dynamicBorderRadius, dynamicMargin, dynamicWidth } from '../Themes/color';


const SameBox = ({ product, navigation }: any) => {
  return (
    <TouchableOpacity
      style={styles.productbox}
      onPress={() => navigation.navigate('productscreen', { product })}
    >
      <Image
        source={{ uri: product.product_image1 }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default SameBox;

const styles = StyleSheet.create({
  productbox: {
    height: dynamicWidth * 0.25,
    width: dynamicWidth * 0.25,
    borderRadius: dynamicBorderRadius * 0.5,
    marginRight: dynamicMargin * 0.5,
    overflow: 'hidden',
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});
