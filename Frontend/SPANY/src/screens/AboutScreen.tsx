import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { dynamicFontSize, dynamicMargin, dynamicWidth, Themes } from '../Themes/color'
import MyIcon from '../Themes/SVGIcons'
import { Icon } from 'react-native-paper'

const AboutScreen = () => {
  return (
    <View style={styles.about}>
      <View style={styles.Icon}>
        <View style={styles.IconBox}>
          <MyIcon/>
        </View>
      </View>
      <View style={styles.About}>
        <Text style={styles.heading}>About SPANY</Text>
        <Text style={styles.heading2}>Welcome to SPANY – The Future of Shopping</Text>
        <Text style={styles.heading3}>SPANY is a modern, user-friendly e-commerce platform that connects you with a wide range of products, from fashion to electronics, all in one place. Our goal is to make shopping easier, more fun, and more personalized for every user.</Text>
        <Text style={styles.heading3}>With SPANY, you can:</Text>
        <Text style={styles.heading4}>Discover thousands of high-quality products from trusted sellers.</Text>
        <Text style={styles.heading4}>Take advantage of exclusive deals, discounts, and promotions.</Text>
        <Text style={styles.heading4}>Enjoy a seamless and secure shopping experience, from browsing to checkout.</Text>
        <Text style={styles.heading3}>Our Mission We strive to offer a smooth, reliable, and enjoyable shopping journey. We believe that shopping should be stress-free and accessible to everyone, and we're constantly improving Spany to ensure it meets your needs.</Text>
        <Text style={styles.heading3}>Thank you for choosing Spany! We are dedicated to bringing the best shopping experience to your fingertips.</Text>
      </View>
      <Text style={styles.footer}>SPANY{"\n"}Version 1.0 March, 2025</Text>
      
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
    about:{
        flex:1,
        backgroundColor:Themes.color1,
    },
    Icon:{
      height:dynamicWidth,
      width:dynamicWidth,
      alignItems:"center",
      justifyContent:"center",
      marginHorizontal:dynamicMargin,
    },
    IconBox:{
      height:"50%",
      width:"50%",
    },
    About:{
      flex:1,
      marginHorizontal:dynamicMargin,
      
    },
    heading:{
      fontSize:dynamicFontSize*2,
      fontWeight:"bold",
      textAlign:"center",
      color:Themes.color9
    },
    heading2:{
      fontSize:dynamicFontSize*1.2,
      fontWeight:"bold",
      textAlign:"center",
      color:Themes.color9

    },
    heading3:{
      fontSize:dynamicFontSize,
      fontWeight:"bold",
      marginVertical:dynamicMargin*0.25,
      textAlign:"justify",
      color:Themes.color9

    },
    heading4:{
      fontSize:dynamicFontSize,
      textAlign:"justify",
      color:Themes.color9
    },
    footer: { 
      fontSize:dynamicFontSize, 
      textAlign: "center", 
      color:Themes.color7, 
    },
})