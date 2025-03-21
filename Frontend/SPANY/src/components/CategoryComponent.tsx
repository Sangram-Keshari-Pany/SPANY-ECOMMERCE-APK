import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import CategoryBox from '../BoxComponents/CategoryBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicFontSize, dynamicPadding, contentWidth,  dynamicBorderRadius, dynamicMargin } from '../Themes/color';


interface CategoryComponentProps {
  navigation: any;
  categories: any;
  subcategories: any;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({ navigation, categories, subcategories }) => {  
  const subcategoryMap = subcategories.reduce((acc:any, subcategory:any) => {
    if (!acc[subcategory.category]) {
      acc[subcategory.category] = [];
    }
    acc[subcategory.category].push(subcategory);
    return acc;
  }, {});

  const renderItem = ({ item }:any) => {
    const subcategory = subcategoryMap[item.id] || [];
    
    return (
      <CategoryBox
        key={item.id}
        name={item.category_name}
        subcategory={subcategory}
        navigation={navigation}
      />
    );
  };
   
  function ViewAll(){
    navigation.navigate('App')
  }

  return (
    <View >
      <HeadingBox title="Categories" display="flex" textSize={dynamicFontSize * 2} functionality={ViewAll} />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.categoryComponentBlock}
        contentContainerStyle={{paddingVertical:dynamicPadding*0.6,gap:dynamicPadding*0.6}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryComponentBlock: {
    justifyContent: 'space-between',
    marginHorizontal: dynamicMargin ,
  },
  categorybox:{
    gap:dynamicPadding*0.6
  }
});

export default CategoryComponent;
