import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { dynamicBorderRadius, dynamicFontSize, dynamicPadding, dynamicWidth, Themes } from '../Themes/color';
import { EmptyCart } from '../Themes/SVGIcons';
import LinearGradient from 'react-native-linear-gradient';

const ProductBox = ({ navigation, product}: any) => {
  const [imageError, setImageError] = useState(false); 

  const handleImageError = () => {
    setImageError(true); 
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('productscreen', product)} style={styles.TouchableOpacity}>
      <View style={styles.imageBox}>
        <LinearGradient colors={Themes.gradient1} style={styles.FlashOffer} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
          <Text style={styles.FlashOffertext} allowFontScaling={false}>{Math.ceil(product.discount)}%off</Text>
        </LinearGradient>
        
        {!imageError ? (
          <Image
            style={styles.image}
            source={{ uri: product.product_image1 }}
            onError={handleImageError} 
          />
        ) : (
          <EmptyCart height={"70%"} width={"70%"} /> 
        )}
      </View>
        <View style={styles.QuaterBoxTexts}>
          <Text style={styles.QuaterBoxText} allowFontScaling={false}>{product.product_name.slice(0, 50)}</Text>
          <Text style={styles.QuaterBoxTextprice} allowFontScaling={false}>₹{Math.round(product.price)}</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TouchableOpacity: {
    marginBottom:5,
    width: dynamicWidth* 0.48,
    height: dynamicWidth*0.68
   },
   imageBox:{
    width:"100%",
    height: "85%",
    borderRadius:dynamicBorderRadius*0.5,
    borderWidth:1,
    borderColor:Themes.color10,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    backgroundColor: Themes.color1,
    alignItems:"center",
    justifyContent:"center"
   },
   FlashOffer: {
    top:0,
    right: 0,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    borderRadius:dynamicBorderRadius*0.25,
    borderBottomRightRadius:0,
    paddingHorizontal:dynamicPadding*0.5,
    paddingVertical:dynamicPadding*0.15

  },
  FlashOffertext:{
    color: Themes.color6,
    fontSize:dynamicFontSize,
  },
  QuaterBoxTexts: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight:dynamicPadding,
  },
  QuaterBoxText: {
    fontWeight: 'bold',
    color:Themes.color9,
    fontSize:dynamicFontSize,
  },
  QuaterBoxTextprice: {
    fontWeight: 'bold',
    color:Themes.color9,
    fontSize:dynamicFontSize,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius:dynamicBorderRadius,
  },
});

export default ProductBox;
