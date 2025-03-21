import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useData } from '../functionality/APICall'


const Button = ({name,height,width,backgroundColor,borderRadius,color,size,Function,functiondata,navigation}) => {
  const { categories, subcategories, products, flashshales,orderitems,favorites,loading, error,fetchdata } = useData();

  const styles = StyleSheet.create({
    button:{
    height:height,
    width:width,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:borderRadius,
    backgroundColor:backgroundColor,
  },
  buttonText:{
    fontSize:size,
    color:color,
    textAlign:"center"
  } 
  })
  function perform (){    
    Function(functiondata,navigation,fetchdata)
  }
  
  return (
    <TouchableOpacity style={styles.button}  onPress={perform}>
        <Text style={styles.buttonText} allowFontScaling={false}>{name}</Text>
    </TouchableOpacity>
  )
}
// ()=>navigation.navigate('reviewscreen')
export default Button

