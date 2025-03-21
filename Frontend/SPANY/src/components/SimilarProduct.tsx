import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SameBox from '../BoxComponents/SameBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicFontSize, dynamicMargin } from '../Themes/color';
import { demo } from '../functionality/APICall';

const SimilarProduct = ({ similarProducts,navigation }: any) => {
  

  const renderItem = ({ item }: any) => (
    <SameBox product={item} key={`similarproduct_${item.id}`} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <HeadingBox title="Variations" display='none' textSize={dynamicFontSize * 1.5} functionality={demo}/>
      <FlatList
        horizontal
        data={similarProducts}
        renderItem={renderItem}
        keyExtractor={(item) => `similarproduct_${item.id}`}  
        showsHorizontalScrollIndicator={false}  
        contentContainerStyle={{marginVertical:dynamicMargin*0.5,
          marginHorizontal:dynamicMargin}}
      />
    </View>
  );
};

export default SimilarProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noProductsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containeerstyle:{
    marginVertical:dynamicMargin*0.5,
    marginHorizontal:dynamicMargin
  },
});
