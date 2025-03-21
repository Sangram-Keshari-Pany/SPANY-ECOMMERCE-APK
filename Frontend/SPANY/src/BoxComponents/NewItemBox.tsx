import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { dynamicMargin, Themes, dynamicWidth, dynamicFontSize, dynamicPadding, dynamicBorderRadius } from '../Themes/color';
import { EmptyCart } from '../Themes/SVGIcons';

const NewItemBox = ({ navigation, product }: any) => {
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    navigation.navigate('productscreen', product);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.NewSliderBox}>
        <View style={styles.NewSliderBoxImage}>
          {!imageError ? (
            <Image
              source={{ uri: product.product_image1 }}
              style={styles.image}
              onError={() => setImageError(true)} // Set error flag if image fails to load
            />
          ) : (
            <EmptyCart height={dynamicWidth * 0.35 * 0.7} width={dynamicWidth * 0.35 * 0.7} /> // Fallback EmptyCart with dynamic size
          )}
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.NewSliderProductName} allowFontScaling={false}>
            {product.product_name.length > 40
              ? product.product_name.slice(0, 40) + '...' 
              : product.product_name}
          </Text>
          <Text style={styles.NewSliderProductPrice} allowFontScaling={false}>
            ₹{Math.round(product.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  NewSliderBox: {
    height: dynamicWidth * 0.5,
    width: dynamicWidth * 0.35,
    marginRight: dynamicMargin * 0.5,
  },
  NewSliderBoxImage: {
    height: '80%',
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Themes.color10,
    backgroundColor: Themes.color1,
    borderRadius: dynamicBorderRadius * 0.5,
    shadowColor: Themes.color4,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 12,
    borderWidth: 1,
  },
  TextContainer: {
    justifyContent: 'center', 
  },
  NewSliderProductName: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
  NewSliderProductPrice: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: dynamicBorderRadius,
  },
});

export default NewItemBox;
