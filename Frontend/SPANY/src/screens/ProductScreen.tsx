import { StatusBar, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import MostPopular from '../components/MostPopular';
import { useData } from '../functionality/APICall';
import JustForYou from '../components/JustForYou';
import Specification from '../components/Specification';
import SimilarProduct from '../components/SimilarProduct';
import ProductPrice from '../components/ProductPrice';
import { FavoriteApiFunction, OrderApiFunction } from '../functionality/apifunctions';
import { dynamicBorderRadius, dynamicFontSize,dynamicWidth, Mode, Themes } from '../Themes/color';
import ProductImagecomponent from '../components/ProductImagecomponent';
import RatingComponent from '../components/RatingComponent';
import ReviewComponent from '../components/ReviewComponent';
import LinearGradient from 'react-native-linear-gradient';
import { EmptyLike, Like } from '../Themes/SVGIcons';
import { toastConfig } from '../Themes/CustomTost';
import Toast from 'react-native-toast-message';

const ProductScreen = ({ navigation }: any) => {
  const { products, favorites, error, reviews, fetchdata } = useData();
  const route = useRoute();
  const productData = route.params as { [key: string]: any };

  const [similarproducts, setSimilarproducts] = useState<any[]>([]);
  const [like, setLike] = useState(false);
  const [productreviews, setProductReviews] = useState([]);

  const mostpopulars = useMemo(() => {
    return [...products].sort((a: any, b: any) => b.like - a.like).slice(0, 10);
  }, [products]);

  useEffect(() => {
    const similarProducts = products.filter(
      (product: any) => product.product_name === productData.product_name && product.id !== productData.id
    );
    setSimilarproducts(similarProducts);

    const liked = favorites.some((favorite: any) => favorite.product.id === productData.id);
    setLike(liked);
  }, [productData, favorites, products]);

  useEffect(() => {
    const productreview = reviews.filter((review: any) => review.product === productData.id);
    setProductReviews(productreview);
  }, [reviews, productData.id]);

  const handleFavorites = useCallback(() => {
    FavoriteApiFunction({ product: productData.id }, navigation, fetchdata);
  }, [productData.id, navigation, fetchdata]);

  const handleAddToCart = useCallback(() => {
    OrderApiFunction({ product: productData.id, functionality: 'Add To Cart' }, navigation, fetchdata);
  }, [productData.id, navigation, fetchdata]);

  const handleBuyNow = useCallback(() => {
    OrderApiFunction({ product: productData.id, functionality: 'Buy Now' }, navigation, fetchdata);
  }, [productData.id, navigation, fetchdata]);

 
  const componentsArray = [
    <ProductImagecomponent productData={productData} />,
    <ProductPrice productData={productData} />,
    <FlatList
      data={similarproducts}
      keyExtractor={(product) => product.id.toString()}
      renderItem={({ item }) => <SimilarProduct product={item} navigation={navigation} />}
      horizontal
    />,
    <Specification productData={productData} />,
    <RatingComponent productData={productData} />,
    <ReviewComponent navigation={navigation} productreviews={productreviews} />,
    <MostPopular mostpopulars={mostpopulars} navigation={navigation} />,
    <JustForYou products={products} navigation={navigation} title={'Just For You'} />,
  ];

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} translucent={false} />
      <FlatList
        data={componentsArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
        ListFooterComponentStyle={styles.footerStyle}
      />
      <Toast config={toastConfig} />
      <View style={styles.ProductButtonSection}>
        <TouchableOpacity onPress={handleFavorites}>
          {like ? 
          (<Like width={dynamicFontSize*3} height={dynamicFontSize*3} color1={Themes.svgcolor3} color2={Themes.svgcolor4}/>) 
          :
          (<EmptyLike width={dynamicFontSize*3} height={dynamicFontSize*3} color1={Themes.svgcolor3} color2={Themes.svgcolor4}/>) 
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.addtocart} onPress={handleAddToCart}>
          <Text style={styles.AddtocartText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buynow} onPress={handleBuyNow}>
          <LinearGradient colors={Themes.gradient1} style={styles.buynow} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
          <Text style={styles.AddtocartText}>Buy Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Themes.color1,
  },
  actionButton: {
    height: dynamicFontSize * 3,
    width: dynamicWidth * 0.4,
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddtocartText: {
    color: Themes.color6,
    fontSize: dynamicFontSize * 1.5,
  },
  footerStyle: {
    marginTop: dynamicWidth * 0.05,
    marginBottom: dynamicWidth * 0.1,
  },
  ProductButtonSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: dynamicWidth * 0.13,
    backgroundColor: Themes.color3,
  },
  addtocart: {
    height: dynamicFontSize * 3,
    width: dynamicWidth * 0.4,
    backgroundColor: '#000000',
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buynow: {
    height: dynamicFontSize * 3,
    width: dynamicWidth * 0.4,
    backgroundColor: Themes.color2,
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: dynamicFontSize * 2,
  },

});

export default ProductScreen;
