import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import PopularBox from '../BoxComponents/PopularBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicFontSize, dynamicPadding } from '../Themes/color';

const MostPopular = ({ navigation, mostpopulars }: any) => {

  const ViewAll =()=>{
    navigation.navigate("Tab",{screen:"Home",params:{ screen: "SearchScreen",params: { newItems:mostpopulars }}})
  }

  const renderItem = ({ item }: { item: any }) => (
    <PopularBox
      key={'MostPopular' + item.id}
      mostpopular={item}
      navigation={navigation}
    />
  );

  return (
    <View style={{ paddingTop: dynamicPadding }}>
      <HeadingBox title="Most Popular" display="flex" textSize={dynamicFontSize * 2} functionality={ViewAll} />
      <FlatList
        data={mostpopulars}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.NewSliderBox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  NewSliderBox: {
    paddingHorizontal:dynamicPadding,
    paddingVertical:dynamicPadding
  },
});

export default MostPopular;
