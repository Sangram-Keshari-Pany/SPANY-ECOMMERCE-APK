import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomIcons from '../Themes/CustomIcons';
import { dynamicFontSize, dynamicMargin, dynamicPadding, Themes, dynamicIconSize } from '../Themes/color';
import LinearGradient from 'react-native-linear-gradient';

type DisplayType = 'none' | 'flex' | 'contents' | undefined;

interface HeadingBoxProps {
  title: string;
  display: DisplayType;
  textSize: number;
  functionality:any
}

const HeadingBox: React.FC<HeadingBoxProps> = ({ title, display, textSize,functionality}) => {
  return (
    <View style={styles.categoryComponent}>
      <Text allowFontScaling={false} style={[styles.titleText, { fontSize: textSize }]}>{title}</Text>
      {display && (
        <View style={[styles.categoryIconPart, { display: display }]}>
          <Text style={styles.categoryComponentText2} allowFontScaling={false}>View All</Text>
          <LinearGradient colors={Themes.gradient1} style={styles.iconArrow} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
          <TouchableOpacity  onPress={functionality}>
            <CustomIcons name="arrowright" color={Themes.color6} size={dynamicFontSize * 2} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryComponent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: dynamicPadding 

  },
  categoryIconPart: {
    gap: dynamicPadding-15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    color: Themes.color9,
  },
  categoryComponentText2: {
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
  iconArrow: {
    padding: dynamicPadding - 18,
    display: 'flex',
    borderRadius: 50, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Themes.color2,
  },
});

export default HeadingBox;
