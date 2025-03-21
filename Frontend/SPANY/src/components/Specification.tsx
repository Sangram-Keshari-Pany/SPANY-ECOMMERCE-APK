import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomIcons from '../Themes/CustomIcons';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, Themes } from '../Themes/color';
import { demo } from '../functionality/APICall';

const Specification = ({productData}) => {
    const [showFull, setShowFull] = useState(false);
    const toggleText = () => {setShowFull(!showFull)};
  
    return (
      <View>
        <HeadingBox title="Specification" display='none' textSize={dynamicFontSize*1.5} functionality={demo}/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.specification}>
            {showFull ? productData.specification : productData.Highlights}
          </Text>

          <TouchableOpacity onPress={toggleText} style={styles.toggleText}>
                {showFull ? <CustomIcons color={Themes.color2} name="expand-less" size={dynamicFontSize*2}/>: <CustomIcons color={Themes.color2} name="expand-more" size={dynamicFontSize*2}/>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    scrollContainer: {
      backgroundColor:Themes.color1,
      marginHorizontal:dynamicMargin,

    },
    specification: {
      fontSize:dynamicFontSize,
      fontWeight:"bold",
      color:Themes.color9,
    },
    toggleText: {
      position:"absolute",
      bottom:0,
      end:0,
      right:10
    },
  });
  

export default Specification

