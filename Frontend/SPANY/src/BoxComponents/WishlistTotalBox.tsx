import React, { useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import CartBox from './CartBox';
import WishlistBoxdetails from './WishlistBoxdetails';
import { contentWidth, dynamicMargin, dynamicWidth } from '../Themes/color';
import { useData } from '../functionality/APICall';
import { FavoriteApiFunction } from '../functionality/apifunctions';

interface Product {product_image1: string;id:number}
interface Favorite {product: Product;}
interface WishlistTotalBoxProps {favorite: Favorite;navigation: any; }

const WishlistTotalBox: React.FC<WishlistTotalBoxProps> = ({ favorite, navigation }) => {
  const {fetchdata} = useData()

   const handleFavorites = useCallback(() => {
    FavoriteApiFunction({product: favorite.product.id}, navigation, fetchdata);
    }, [favorite]);
  
  return (
    <View style={[styles.cart, { height: dynamicWidth * 0.28 }]}>
      {favorite.product && favorite.product.product_image1 ? (
        <CartBox product={favorite.product} navigation={navigation}  DeleteFunction={handleFavorites}/>
      ) : (
        <View style={styles.imagePlaceholder} /> 
      )}
      <WishlistBoxdetails product={favorite.product} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    height: dynamicWidth * 0.28,
    width: contentWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', 
    marginHorizontal:dynamicMargin,
    marginVertical:dynamicMargin*0.5
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: 'lightgray', // Placeholder background color when image is missing
    borderRadius: 5, 
  },
});

export default WishlistTotalBox;
