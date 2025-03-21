import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { demo, useData } from '../functionality/APICall';
import CategoryItemComponent from '../components/CategoryItemComponent';
import { dynamicFontSize, dynamicMargin, Themes } from '../Themes/color';
import { useRoute } from '@react-navigation/native';
import HeadingBox from '../BoxComponents/HeadingBox';

export default function AppScreen({ navigation }: any) {
  const { categories, subcategories } = useData();
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const route: any = useRoute();

  useEffect(() => {
    if (route.params?.categoryId) {
      setExpandedCategory(route.params.categoryId); 
    } else {
      setExpandedCategory(null);
    }
  }, [route.params]);

  return (
    <FlatList
      ListHeaderComponent={
        <HeadingBox 
          title="All Categories" 
          display="none" 
          textSize={dynamicFontSize * 3} 
          functionality={demo} 
        />
      }
      data={categories}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }) => (
        <CategoryItemComponent
          category={item}
          subcategories={subcategories.filter((sub: any) => sub.category === item.id)}
          expanded={expandedCategory?expandedCategory === item.id:true} 
          onPress={() => setExpandedCategory(expandedCategory === item.id ? null : item.id)} 
          navigation={navigation}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: Themes.color1,
    flex:1,
  },
  header: { 
    fontSize: dynamicFontSize * 3, 
    fontWeight: 'bold', 
    marginBottom: dynamicMargin, 
    color: Themes.color9 
  },
});
