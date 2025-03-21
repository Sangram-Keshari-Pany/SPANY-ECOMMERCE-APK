import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import Entypo from 'react-native-vector-icons/Octicons';
import { HelloCardScreenSvg } from '../Themes/SVGIcons';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, dynamicWidth, height, Themes } from '../Themes/color';
import LinearGradient from 'react-native-linear-gradient';

const HelloCardScreen = ({ navigation }: any) => {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      title: 'Hello',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
      image: require('../assets/photos/hellocard1.png')
    },
    {
      title: 'Welcome',
      description: 'Proin eu varius arcu. Vivamus id lorem id metus scelerisque malesuada id eget nulla.',
      image: require('../assets/photos/hellocard2.png')
    },
    {
      title: 'Get Started',
      description: 'Curabitur a magna at ligula efficitur tincidunt nec quis ligula. Nulla facilisi.',
      image: require('../assets/photos/hellocard3.png')
    },
  ];

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);   
  };

  const navigateToTab = () => {
    navigation.navigate('Tab');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden={true} />
        <View style={styles.svgContainer}>
          <HelloCardScreenSvg />
        </View>
        <View style={styles.content}>
          <TouchableWithoutFeedback onPress={handleNext}>
            <View style={styles.card}>
              <Image
                source={cards[currentCard].image}
                style={styles.image}
              />
              <Text style={styles.title}>{cards[currentCard].title}</Text>
              <Text style={styles.description}>{cards[currentCard].description}</Text>
              {currentCard === cards.length - 1 && (
                <LinearGradient colors={Themes.gradient1} style={styles.button} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                  <TouchableOpacity onPress={navigateToTab}>
                    <Text style={styles.buttonText}>Get Started</Text>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.paginationContainer}>
            {cards.map((_, index) => (
              <Entypo
                key={index}
                name="dot-fill"
                size={dynamicIconSize - 10}
                color={index === currentCard ? Themes.color2 : Themes.color6}
                style={styles.paginationDot}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Themes.color1
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: dynamicPadding,
  },
  card: {
    width: dynamicWidth * 0.9,
    height: dynamicWidth * 1.5,
    backgroundColor: Themes.color5,
    borderRadius: dynamicBorderRadius,
    borderWidth: 1,
    borderColor: Themes.color10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: dynamicBorderRadius,
    elevation: 15,
  },
  image: {
    width: '100%',
    flex: 1,
    borderRadius: dynamicBorderRadius,
    marginBottom: dynamicMargin,
    resizeMode: 'cover',
  },
  title: {
    fontSize: dynamicFontSize * 1.5,
    fontWeight: 'bold',
    color: Themes.color9,
    padding: dynamicPadding,
  },
  description: {
    fontSize: dynamicFontSize,
    marginBottom: dynamicMargin,
    color: Themes.color9,
    textAlign: 'center',
    paddingHorizontal: dynamicPadding,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: dynamicMargin,
    justifyContent: 'center',
  },
  paginationDot: {
    marginHorizontal: 5,
  },
  button: {
    width: '50%',
    height: dynamicFontSize * 3.5,
    borderRadius: dynamicBorderRadius,
    marginHorizontal: dynamicMargin,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dynamicMargin,
  },
  buttonText: {
    color: Themes.color6,
    fontSize: dynamicFontSize * 1.5,
    fontWeight: '200',
  },
});

export default HelloCardScreen;
