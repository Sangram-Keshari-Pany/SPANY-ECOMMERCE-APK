import { StyleSheet, View, PanResponder } from 'react-native';
import React, { useState, useCallback } from 'react';
import AddBox from '../BoxComponents/AddBox';
import { dynamicPadding, Themes } from '../Themes/color';
import CustomIcons from '../Themes/CustomIcons';
import { dynamicWidth, dynamicIconSize, dynamicBorderRadius } from '../Themes/color';

interface Card {
  title: string;
  description: string;
  image: any;
}

const SlidingCardRow: React.FC = ({navigation}) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const cardList: Card[] = [
    {
      title: 'Hello',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: require("../assets/photos/image2.jpg"),
    },
    {
      title: 'Welcome',
      description: 'Proin eu varius arcu. Vivamus id lorem id metus.',
      image: require("../assets/photos/image4.jpg"),
    },
    {
      title: 'Welcome',
      description: 'Proin eu varius arcu. Vivamus id lorem id metus.',
      image: require("../assets/photos/image1.jpg"),
    },
    {
      title: 'Welcome',
      description: 'Proin eu varius arcu. Vivamus id lorem id metus.',
      image: require("../assets/photos/image5.jpg"),
    },
  ];

  const handleSwipeGesture = useCallback((gestureState: any) => {
    const { dx } = gestureState;
    if (dx > 100) {
      setActiveCardIndex((prevIndex) => (prevIndex - 1 + cardList.length) % cardList.length);
    } else if (dx < -100) {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % cardList.length);
    }
  }, [cardList.length]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gestureState) => {
      handleSwipeGesture(gestureState);
    },
  });

  return (
    <View style={{ paddingHorizontal: dynamicPadding }}>
      <View style={styles.cardContainer} {...panResponder.panHandlers}>
        <AddBox source={cardList[activeCardIndex].image} navigation={navigation}/>
      </View>
      <View style={styles.paginationContainer}>
        {cardList.map((_, index) => (
          <CustomIcons
            key={index}
            name={index === activeCardIndex ? 'dash' : 'dot-fill'}
            size={dynamicIconSize - 15}
            color={index === activeCardIndex ? Themes.color2 : Themes.color5}
            style={{ marginHorizontal: 5 }}
            accessibilityLabel={`Card ${index + 1}`}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: dynamicWidth,
    alignItems: 'center',
    justifyContent: 'center',
    height: dynamicWidth * 0.39,
    borderRadius: dynamicBorderRadius * 0.5,
    overflow: 'hidden',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default SlidingCardRow;
