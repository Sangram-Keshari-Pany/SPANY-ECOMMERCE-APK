import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import ReviewBox from '../BoxComponents/ReviewBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicFontSize, Mode, Themes } from '../Themes/color';
import { demo } from '../functionality/APICall';
import { useRoute } from '@react-navigation/native';

interface Review {
  id: string;
  content: string;
  rating: number;
  user: string;
}

type ReviewScreenRouteParams = {
  productreviews: Review[];
};

const ReviewScreen = () => {
  const route = useRoute();
  
  const { productreviews } = route.params as ReviewScreenRouteParams; 

  const renderReviewItem = ({ item }: { item: Review }) => {
    return <ReviewBox productreview={item} />;
  }; 

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} translucent={false} />
      <HeadingBox title="Reviews" display="none" textSize={dynamicFontSize * 2} functionality={demo} />
      <FlatList
        data={productreviews}
        renderItem={renderReviewItem}
        keyExtractor={(item,index) => index.toString()}
        contentContainerStyle={styles.FlatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Themes.color1,
    width: '100%',
  },
  FlatListContainer: {
    paddingHorizontal: 15,
  },
});

export default ReviewScreen;
