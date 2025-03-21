import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { contentWidth, dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, Themes } from '../Themes/color';
import { EmptyCart } from '../Themes/SVGIcons'; // Assuming EmptyCart is an SVG component
import LinearGradient from 'react-native-linear-gradient';

const FlashShaleBox = ({ navigation, flashshale }: any) => {
  const [imageError, setImageError] = useState(false); // State to track if the image fails to load

  const handleImageError = () => {
    setImageError(true); // Set error flag if image fails
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('FlashshaleScreen')}>
      <View style={styles.NewSlidergrid}>
        {imageError ? (
          <EmptyCart /> 
        ) : (
          <Image
            source={{ uri: flashshale.product.product_image1 }}
            style={styles.image}
            onError={handleImageError} 
          />
        )}
        <LinearGradient colors={Themes.gradient1} style={styles.FlashOffer} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
        <Text style={styles.FlashOffer} allowFontScaling={false}>
          {Math.ceil(flashshale.discount_percentage)}% off
        </Text>
        </LinearGradient>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  NewSlidergrid: {
    overflow: 'hidden',
    height: contentWidth * 0.25,
    width: contentWidth * 0.25,
    backgroundColor: Themes.color1,
    borderRadius: dynamicBorderRadius * 0.5,
    shadowColor: Themes.color4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginRight: dynamicMargin * 0.5,
    borderWidth: 1,
    borderColor: Themes.color10,
  },
  FlashOffer: {
    right: 0,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    width: contentWidth * 0.12,
    height: contentWidth * 0.04,
    fontSize: dynamicFontSize - 3,
    borderRadius: dynamicBorderRadius * 0.25,
    color: Themes.color6,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: dynamicBorderRadius,
  },
});

export default FlashShaleBox;
