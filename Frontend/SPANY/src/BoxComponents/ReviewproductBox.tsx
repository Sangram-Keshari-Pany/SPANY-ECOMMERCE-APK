import { Image, StyleSheet, TouchableOpacity, View, GestureResponderEvent } from 'react-native';
import React from 'react';
import { dynamicBorderRadius, dynamicIconSize, dynamicPadding, Themes } from '../Themes/color';


interface ReviewproductBoxProps {
  product: any;
  navigation: any; 
}

const ReviewproductBox: React.FC<ReviewproductBoxProps> = ({ product, navigation}:any) => {
  
  return (
    <View style={styles.ReviewproductBox}>
      <TouchableOpacity onPress={() => navigation.navigate('productscreen', product )}>
        <Image source={{ uri: product.product_image1 }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ReviewproductBox: {
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
  
});

export default ReviewproductBox;
