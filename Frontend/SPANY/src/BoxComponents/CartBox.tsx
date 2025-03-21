import { Image, StyleSheet, TouchableOpacity, View, GestureResponderEvent } from 'react-native';
import React, { useEffect } from 'react';
import { dynamicBorderRadius, dynamicIconSize, dynamicPadding, Themes } from '../Themes/color';
import CustomIcons from '../Themes/CustomIcons';


interface CartBoxProps {
  product: any;
  navigation: any; 
  DeleteFunction:any
}

const CartBox: React.FC<CartBoxProps> = ({ product, navigation,DeleteFunction}) => {
  const handleDelete = (e: GestureResponderEvent) => {
    e.stopPropagation(); 
    DeleteFunction()
  };

  return (
    <View style={styles.CartBox}>
      <TouchableOpacity style={styles.deletebutton} onPress={handleDelete}>
        <CustomIcons color={Themes.color14} name="trash-o" size={dynamicIconSize * 0.6} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('productscreen', product )}>
        <Image source={{ uri: product.product_image1 }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CartBox: {
    width: '45%',
    height: '100%',
    borderRadius: dynamicBorderRadius * 0.5,
    backgroundColor: Themes.color1,
    borderWidth: 1,
    borderColor: Themes.color10,
    padding: dynamicPadding*0.25,
    shadowColor: Themes.color4,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    position: 'relative', 
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  deletebutton: {
    position: 'absolute',
    left: dynamicPadding * 0.25,
    bottom: dynamicPadding * 0.15,
    zIndex:2
  },
});

export default CartBox;
