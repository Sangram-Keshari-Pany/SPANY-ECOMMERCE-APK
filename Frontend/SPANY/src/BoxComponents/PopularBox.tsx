import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomIcons from '../Themes/CustomIcons';
import {dynamicWidth, dynamicBorderRadius, dynamicFontSize, dynamicPadding, Textcolor, Themes, dynamicMargin } from '../Themes/color';
import { EmptyCart } from '../Themes/SVGIcons';

const PopularBox = ({ navigation, mostpopular }: any) => {
  const [imageError, setImageError] = useState(false); // State to track image load errors

  const handleImageError = () => {
    setImageError(true); // Set error flag if image fails
  };
  return (
    <TouchableOpacity style={styles.NewSliderBox}
      onPress={() => navigation.navigate('productscreen', mostpopular)}
    >
      <View style={styles.NewSliderBoxImage}>
      {!imageError ? (
          <Image
            source={{ uri: mostpopular.product_image1 }}
            style={styles.image}
            onError={handleImageError} // Set error flag if image fails to load
          />
        ) : (
          <EmptyCart height={"70%"} width={"70%"} /> // Fallback to EmptyCart if image fails
        )}

      </View>
      <View style={styles.NewSliderPrice}>
        <Text style={styles.PriceText} allowFontScaling={false}>{mostpopular.like}{' '}</Text>
        <CustomIcons name="heart" size={dynamicFontSize} color={Themes.color8} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  NewSliderBox: {
    borderWidth:1,
    height:dynamicWidth*0.4,
    width:dynamicWidth*0.3,
    borderColor:Themes.color10,
    marginRight:dynamicMargin*0.5,
    backgroundColor:Themes.color1,
    borderRadius:dynamicBorderRadius*0.5,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  NewSliderPrice: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
  PriceText:{
    fontWeight: 'bold',
    color:Themes.color9,
    paddingLeft:dynamicPadding-5,
    fontSize:dynamicFontSize,
  },
  NewSliderBoxImage: {
    height:"85%",
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

export default PopularBox;
