import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import NewItemBox from '../BoxComponents/NewItemBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicFontSize, dynamicMargin, dynamicPadding } from '../Themes/color';

const NewItems = ({ navigation, products }: any) => {
  const ViewAll =()=>{
    navigation.navigate("Home", { screen: "SearchScreen",params: { newItems:products }})
  }

  const renderItem = ({ item }: { item: any }) => (
    <NewItemBox
      key={'NewItemBox' + item.id}
      product={item}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <HeadingBox title="New Items" display={"flex"} textSize={dynamicFontSize * 2} functionality={ViewAll} />
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical:dynamicPadding*0.25,
    paddingHorizontal: dynamicPadding  ,
  },
  container:{
    marginVertical:dynamicMargin*0.25
  }
});

export default NewItems;
