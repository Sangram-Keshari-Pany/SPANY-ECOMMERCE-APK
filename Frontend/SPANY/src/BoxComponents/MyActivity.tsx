import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ProfilePhotos from './ProfilePhoto'
import { contentWidth, dynamicBorderRadius, dynamicFontSize,dynamicMargin, dynamicPadding, dynamicWidth, Textcolor, Themes } from '../Themes/color'
import OptionBox from './OptionBox'
import LinearGradient from 'react-native-linear-gradient'

const MyActivity = ({ navigation, imageurl, name }: any) => {
  return (
    <View style={styles.FirstView}>
      <View style={styles.profilebox}>
        <TouchableOpacity style={styles.TouchableOpacity}>
          <ProfilePhotos imageurl={imageurl} />
        </TouchableOpacity>

        <LinearGradient colors={Themes.gradient1} style={styles.myactivity} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
          <TouchableOpacity style={styles.myactivity}>
            <Text style={styles.myactivitytext}>My Activity</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <OptionBox navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  FirstView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: contentWidth,
    height: contentWidth * 0.15,
    marginHorizontal:dynamicMargin
  },
  profilebox: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

  },
  TouchableOpacity: {
    height: "100%",
    width: "30%",
    marginRight: dynamicMargin*0.25,
    borderRadius: "50%",
    overflow: 'hidden',
    backgroundColor: Themes.color1,
  },
  myactivity:{
    height:dynamicWidth*0.1,
    width:dynamicWidth*0.4,
    borderRadius:dynamicBorderRadius,
    alignItems: "center",
    justifyContent:"center"
  },
  myactivitytext:{
    fontSize:dynamicFontSize*1.5,
    color:Themes.color6,
  },
  FirstView3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap:dynamicPadding*0.25,
  },
  iconbox:{
    backgroundColor:Themes.color5,
    padding:dynamicPadding*0.25,
    borderRadius:"50%"
  }

})

export default MyActivity

