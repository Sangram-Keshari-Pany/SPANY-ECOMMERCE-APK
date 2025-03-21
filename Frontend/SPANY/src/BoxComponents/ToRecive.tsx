import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ProfilePhotos from './ProfilePhoto';
import { contentWidth, dynamicFontSize, dynamicMargin, Themes } from '../Themes/color';
import OptionBox from './OptionBox';

const ToRecive = ({ navigation, imageurl }: any) => {
  return (
    <View style={styles.firstView}>
      <View style={styles.profileBox}>
        <TouchableOpacity style={styles.touchableOpacity}>
          <ProfilePhotos imageurl={imageurl} />
        </TouchableOpacity>
        <View style={styles.nameBox}>
          <Text style={styles.titleText}>To Recieve</Text>
          <Text style={styles.subtitleText}>My Orders</Text>
        </View>
      </View>
      <OptionBox navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  firstView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: contentWidth,
    height: contentWidth * 0.15,
    marginHorizontal: dynamicMargin,
  },
  profileBox: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameBox: {
    marginHorizontal: dynamicMargin * 0.5,
  },
  touchableOpacity: {
    height: '100%',
    width: '30%',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Themes.color1,
  },
  titleText: {
    fontSize: dynamicFontSize * 1.5,
    fontWeight: 'bold',
    color: Themes.color9,
  },
  subtitleText: {
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
    color: Themes.color9,
  },
});

export default ToRecive;
