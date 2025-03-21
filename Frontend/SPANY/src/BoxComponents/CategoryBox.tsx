import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dynamicBorderRadius, dynamicPadding, dynamicWidth, Themes, dynamicFontSize } from '../Themes/color';
import { EmptyCart } from '../Themes/SVGIcons';

interface Subcategory {
  sub_category_image: string;
  category: string;
}

interface CategoryBoxProps {
  navigation: any;
  name: string;
  subcategory: Subcategory[];
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ navigation, name, subcategory }) => {  
  const handlePress = () => {
    if (subcategory.length > 0) {
      navigation.navigate('App', { categoryId: subcategory[0].category });
    }
  };

  return (
    <TouchableOpacity style={styles.CategoryBox} onPress={handlePress}>
      <View style={styles.QuaterBox}>
        {subcategory.slice(0, 4).map((item, index) => (
          <View key={index} style={styles.SmallBox}>
            {item.sub_category_image?(
              <Image
              style={styles.image}
              source={{ uri:item.sub_category_image }}
            />
            ):(
              <EmptyCart height={"70%"} width={"70%"}/>
            )}
            
          </View>
        ))}
      </View>
      <View style={styles.QuaterBoxTexts}>
        <Text style={styles.QuaterBoxText} allowFontScaling={false}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CategoryBox: {
    borderRadius: dynamicBorderRadius * 0.5,
    borderWidth: 1,
    borderColor: Themes.color10,
    shadowColor: Themes.color4,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: dynamicBorderRadius * 0.5,
    elevation: 7,
    backgroundColor: Themes.color1,
    width: dynamicWidth * 0.49,
    height: dynamicWidth * 0.49,
  },
  QuaterBox: {
    gap: 4,
    height: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  SmallBox: {
    height: '48.5%',
    width: '48.5%',
    borderRadius: dynamicPadding,
    overflow: 'hidden',
    alignItems:"center",
    justifyContent:"center"
  },
  QuaterBoxTexts: {
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  QuaterBoxText: {
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
    color: Themes.color9,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: dynamicPadding,
  },
});

export default CategoryBox;
