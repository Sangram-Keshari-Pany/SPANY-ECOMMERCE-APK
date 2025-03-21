import { StatusBar, StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import React, { useMemo, useState } from 'react';
import HeadingBox from '../BoxComponents/HeadingBox';
import TopProduct from '../components/TopProduct';
import WishlistComponent from '../components/WishlistComponent';
import MostPopular from '../components/MostPopular';
import { demo, useData } from '../functionality/APICall';
import { dynamicFontSize, Mode, Themes } from '../Themes/color';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';

const FavoriteScreen = ({ navigation }: any) => {
  const { products, favorites, fetchdata } = useData();

  const [refreshing, setRefreshing] = useState(false);

  const mostpopulars = useMemo(() => {
    return [...products].sort((a: any, b: any) => b.like - a.like).slice(0, 10);
  }, [products]);


  const refreshHandler = async () => {
    try {
      setRefreshing(true);
      await fetchdata("favorites");
    } catch (error) {
      console.error("Error refreshing Favorites:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItems = [
    <HeadingBox key="headingBox" title="Wishlist" display="none" textSize={dynamicFontSize * 3} functionality={demo} />,
    <TopProduct key="topProduct" name="Recent Viewed" products={products} navigation={navigation} />,
    <WishlistComponent key="wishlistComponent" favorites={favorites} navigation={navigation} />,
    <MostPopular key="mostPopular" mostpopulars={mostpopulars} navigation={navigation} />,
  ];

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} translucent={false} />
      <FlatList
        data={renderItems}
        renderItem={({ item }) => item}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={20}
        refreshing={refreshing}
        onRefresh={refreshHandler}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshHandler}
            colors={Themes.gradient1}
          />
        }
      />
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Themes.color1,
  },
});

export default FavoriteScreen;
