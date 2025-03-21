import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import CustomIcons from '../Themes/CustomIcons';
import { dynamicFontSize, dynamicMargin, dynamicWidth, Themes } from '../Themes/color';
import { LinearGradient } from 'react-native-linear-gradient';

const CustomProgressBar = ({ progress }: any) => {
  const stages = [
    { label: 'Confirmed', icon: 'check' },
    { label: 'Shipped', icon: 'truck' },
    { label: 'Out for Delivery', icon: 'delivery' },
    { label: 'Delivered', icon: 'package' },
  ];

  const animatedWidth = useRef(new Animated.Value(0)).current;
  const animatedGradient = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: (progress / 3) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.loop(
      Animated.timing(animatedGradient, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      })
    ).start();
  }, [progress]);



  const gradientBackground = animatedGradient.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '75%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        {stages.map((stage, index) => {
          const isIconVisible = index == progress;
          return (
            <View key={index} style={styles.labelWrapper}>
              {isIconVisible && (
                <CustomIcons
                  name={"truck-delivery"}
                  size={25}
                  color={Themes.color2}
                />
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.progressbarContainer} >
        <Animated.View
          style={[
            styles.progressbar,
            {
              width: animatedWidth.interpolate({
                inputRange: [-12, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          <LinearGradient
              style={styles.progressbarContainer}
              colors={[Themes.color3, Themes.color2]} 
              start={{ x: 0, y: 1 }} 
              end={{ x: 1, y: 0 }} 
            >
            </LinearGradient>
          <Animated.View
            style={[
              styles.gradientOverlay,
              {
                left: gradientBackground,
              },
            ]}
          >
            <LinearGradient
              style={styles.progressbarContainer}
              colors={[Themes.color3, Themes.color2]} 
              start={{ x: 1, y: 1 }} 
              end={{ x: 1, y: 1}} 
            >
            </LinearGradient>

          </Animated.View>
          
        </Animated.View>
      </View>
      <View style={styles.labelsContainer}>
        <View style={styles.labelWrapper}><Text style={styles.label}>Confirmed</Text></View>
        <View style={styles.labelWrapper}><Text style={styles.label}>Shipped</Text></View>
        <View style={styles.labelWrapper}><Text style={styles.label}>Out for Delivery</Text></View>
        <View style={styles.labelWrapper}><Text style={styles.label}>Delivered</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: dynamicMargin,
  },
  progressbarContainer: {
    height:10,
    width: '100%',
    backgroundColor: Themes.color2,
  },
  progressbar: {
    height: '100%',
    backgroundColor: 'gray',
    position: 'relative',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 3,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems:"center",
  },
  labelWrapper: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: dynamicFontSize,
    fontWeight: "bold",
    color:Themes.color9
  },
});

export default CustomProgressBar;
