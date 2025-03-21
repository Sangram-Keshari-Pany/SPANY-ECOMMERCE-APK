import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import FlashShaleBox from '../BoxComponents/FlashShaleBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicFontSize, dynamicMargin,dynamicPadding } from '../Themes/color';
import { demo } from '../functionality/APICall';

const FlashSale = ({ navigation, flashshales }: any) => {

  const renderItem = ({ item }: { item: any }) => (
    <FlashShaleBox
      key={'FlashShaleBox' + item.id}
      flashshale={item}
      navigation={navigation}
    />
  );

  return (
    <View>
      <HeadingBox title="FlashSale" display="none" textSize={dynamicFontSize * 2} functionality={demo} />
      <FlatList
        data={flashshales}
        numColumns={2} 
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
        contentContainerStyle={styles.NewSliderBox}
        columnWrapperStyle={styles.columnBox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columnBox: {
    marginHorizontal:dynamicMargin,
    marginVertical:dynamicMargin*0.25
  },
  NewSliderBox: {
    flexDirection: 'column', 
    gap: dynamicPadding*0.5,
  },
});

export default FlashSale;
