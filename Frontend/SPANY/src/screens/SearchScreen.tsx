import { FlatList, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useData } from '../functionality/APICall';
import JustForYou from '../components/JustForYou';
import { Themes, Mode } from '../Themes/color';
import SearchBar from '../components/SearchBar';
import NewItems from '../components/NewItems';

const SearchScreen = ({ route, navigation }: any) => {
  const { products,fetchdata } = useData();

  const [searchproducts, setSearchproducts] = useState<any[]>([]);
  const [newproducts, setNewproducts] = useState<any[]>([]);
  const { subcategoryid, searchValue, newItems } = route.params || {};
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let filteredProducts = [...products];
    if (subcategoryid) {
      filteredProducts = filteredProducts.filter((product: any) => product.subcategory === subcategoryid);
    }

    if (newItems?.length > 0) {
      filteredProducts = newItems;
    }
    if (!subcategoryid && searchValue) {
      const searchRegex = new RegExp(`\\b${searchValue}\\b`, 'i');
      filteredProducts = filteredProducts.filter((product: any) =>
        searchRegex.test(product.product_name) || searchRegex.test(product.keyword)
      );
    }
    setSearchproducts(filteredProducts);
  }, [route.params, products]);

  useEffect(() => {
    if (searchproducts.length > 0) {
      const newProds = products.filter((product: any) => product.subcategory === searchproducts[0].subcategory);
      setNewproducts(newProds.slice(-10)); 
    } else {
      setNewproducts([]);
    }
  }, [searchproducts, products]);


  const refreshHandler = async () => {
    try {
      setRefreshing(true);
      await fetchdata("product");
    } catch (error) {
      console.error("Error refreshing home search:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }:any) => {
    if (item.type === 'searchBar') {
      return <SearchBar title={""} navigation={navigation} searchedValue={searchValue} />;
    }
    if (item.type === 'justForYou') {
      return <JustForYou products={searchproducts} navigation={navigation} title={""} />;
    }
    if (item.type === 'newItems' && !newItems) {
      return <NewItems products={newproducts} navigation={navigation} />;
    }
    return null;
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar hidden={false} barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} />
      <FlatList
        data={[{ type: 'searchBar' }, { type: 'justForYou' }, { type: 'newItems' }]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewContainer}
        scrollEventThrottle={20}
        refreshing={refreshing}
        onRefresh={refreshHandler}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshHandler}
            colors={Themes.gradient1}
            progressViewOffset={50}
          />
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Themes.color1,
  },
  ScrollViewContainer: {
    zIndex: -1,
  },
});
