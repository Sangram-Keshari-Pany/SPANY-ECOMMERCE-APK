import { StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import ProductBox from '../BoxComponents/ProductBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicFontSize, dynamicMargin, dynamicPadding } from '../Themes/color';
import { demo } from '../functionality/APICall';

const JustForYou = ({ navigation, products, title }: any) => {
  return (
    <View style={styles.container}>
      {title.length > 1 ? <HeadingBox title={title} display="none" textSize={dynamicFontSize * 2} functionality={demo} /> : null}
      <FlatList
        data={products}
        numColumns={2} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (<ProductBox key={'ProductBox' + item.id} product={item} navigation={navigation}/>)}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.CategoryContainer}
        contentContainerStyle={{marginVertical:dynamicMargin,gap:dynamicPadding*0.6,}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CategoryContainer: {
    justifyContent: 'space-between',
    paddingVertical: dynamicMargin*0.5,
    paddingHorizontal:dynamicMargin,
  },
  container:{
    marginBottom:dynamicMargin*0.25,
  }
});

export default JustForYou;
