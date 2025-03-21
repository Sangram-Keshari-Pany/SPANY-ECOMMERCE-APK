import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, dynamicWidth, Themes } from '../Themes/color';
import HeadingBox from './HeadingBox';
import CustomIcons from '../Themes/CustomIcons';
import { demo } from '../functionality/APICall';

const ShippingOptionBox = ({ shippingvalue, setShippingValue,total }: any) => {
  const [expressValue,SetexpressValue]=useState(0)
  useEffect(()=>{
    SetexpressValue( Math.round(total*1.5/100))
  },[])
  return (
    <View>
      <HeadingBox title="Shipping Options" display="none" textSize={dynamicFontSize * 2} functionality={demo} />

      <TouchableOpacity
        style={[styles.shippingOption, { opacity: shippingvalue === 0 ? 1 : 0.4 }]}
        onPress={() => setShippingValue(0)}
      >
        <CustomIcons
          name={shippingvalue === 0 ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
          color={Themes.color2}
          size={dynamicIconSize * 0.6}
        />
        <View style={styles.optionBox}>
          <Text style={styles.optionText}>Standard</Text>
          <Text style={styles.optionDetail}>5-7 days</Text>
        </View>
        <Text style={styles.optionPrice}>FREE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.shippingOption, { opacity: shippingvalue >0 ? 1 : 0.4 }]}
        onPress={() => setShippingValue(expressValue)}
      >
        <CustomIcons
          name={shippingvalue >0? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
          color={Themes.color2}
          size={dynamicIconSize * 0.6}
        />
        <View style={styles.optionBox}>
          <Text style={styles.optionText}>Express</Text>
          <Text style={styles.optionDetail}>1-2 days</Text>
        </View>
        <Text style={styles.optionPrice}>{expressValue}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingOptionBox;

const styles = StyleSheet.create({
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Themes.color3,
    width: dynamicWidth,
    justifyContent: 'space-between',
    borderRadius: dynamicBorderRadius,
    marginHorizontal: dynamicMargin,
    marginVertical: dynamicMargin * 0.15,
    padding: dynamicPadding * 0.25,
  },
  optionText: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
    fontWeight: 'bold',
  },
  optionDetail: {
    fontSize: dynamicFontSize,
    backgroundColor: Themes.color1,
    marginLeft: dynamicMargin,
    color: Themes.color2,
    padding: dynamicPadding * 0.25,
    borderRadius: dynamicBorderRadius * 0.25,
  },
  optionBox: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginLeft: dynamicMargin,
  },
  optionPrice: {
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
    color: Themes.color9,
    marginRight: dynamicMargin,
  },
});
