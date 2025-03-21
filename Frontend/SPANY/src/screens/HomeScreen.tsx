import { StatusBar, StyleSheet, Text, View, BackHandler, ToastAndroid, FlatList, RefreshControl } from 'react-native';
import React, { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SlidingRow from '../components/SlidingRow';
import CategoryComponent from '../components/CategoryComponent';
import TopProduct from '../components/TopProduct';
import NewItems from '../components/NewItems';
import FlashSale from '../components/FlashSale';
import MostPopular from '../components/MostPopular';
import JustForYou from '../components/JustForYou';
import { useData } from '../functionality/APICall';
import { dynamicMargin, Mode, Themes } from '../Themes/color';
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen({ navigation }: any) {
  const { categories, subcategories, products, flashshales, fetchdata } = useData();
  
  const [exitApp, setExitApp] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const mostpopulars = useMemo(() => {
    return [...products].sort((a: any, b: any) => b.like - a.like).slice(0, 10);
  }, [products]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (exitApp) {
          BackHandler.exitApp();
        } else {
          setExitApp(true);
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          setTimeout(() => setExitApp(false), 2000);
        }
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [exitApp])
  );

  const refreshHandler = async () => {
    try {
      setRefreshing(true);
      await fetchdata("product");
      await fetchdata("sub_category");
      await fetchdata("category");
    } catch (error) {
      console.error("Error refreshing home:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItems = [
    <SearchBar key="search" title={"Shop"} navigation={navigation} />,
    <SlidingRow key="slidingRow" navigation={navigation}/>,
    <CategoryComponent key="categoryComponent" categories={categories} subcategories={subcategories} navigation={navigation} />,
    <TopProduct key="topProduct" name="Top Products" products={products} navigation={navigation} />,
    <NewItems key="newItems" products={products} navigation={navigation} />,
    <FlashSale key="flashSale" flashshales={flashshales} navigation={navigation} />,
    <MostPopular key="mostPopular" mostpopulars={mostpopulars} navigation={navigation} />,
    <JustForYou key="justForYou" products={products} navigation={navigation} title={"Just For You"} />
  ];

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar hidden={false} barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} />
      <FlatList
        data={renderItems}
        renderItem={({ item }) => item}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={refreshHandler}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshHandler}
            colors={Themes.gradient1}
            progressBackgroundColor={Themes.color1}
            progressViewOffset={50}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Themes.color1,
  },
  container:{
    marginBottom:dynamicMargin
  }
});

export default HomeScreen;
