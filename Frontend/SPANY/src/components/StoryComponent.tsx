import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import HeadingBox from '../BoxComponents/HeadingBox';
import StoryBox from '../BoxComponents/StoryBox';
import { dynamicFontSize, dynamicMargin } from '../Themes/color';
import { demo } from '../functionality/APICall';

const StoryComponent = ({ reviews }: any) => {
  const renderItem = ({ item }: any) => (
    <StoryBox key={item.id} videourl={item.video_review} />
  );

  return (
    <View>
      <HeadingBox title="Stories" display='none' textSize={dynamicFontSize * 2} functionality={demo}/>
      <FlatList
        horizontal
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default StoryComponent;

const styles = StyleSheet.create({
  container:{
    marginHorizontal:dynamicMargin,
    marginVertical:dynamicMargin*0.25
  }
});
