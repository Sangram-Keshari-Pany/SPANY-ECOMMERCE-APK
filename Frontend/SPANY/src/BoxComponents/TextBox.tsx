import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { dynamicFontSize, Themes } from '../Themes/color'

const TextBox = ({text}:any) => {
  return (
      <Text style={styles.text}>
        {text}
      </Text>
  )
}

export default TextBox

const styles = StyleSheet.create({
  text:{
    fontSize:dynamicFontSize,
    color:Themes.color9,
    fontWeight:"bold",
    textAlign:"justify",
  }
})