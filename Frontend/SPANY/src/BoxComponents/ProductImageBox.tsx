import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductImageBox = ({imageurl}:any) => {
  return (
    <Image source={{uri:imageurl}} style={styles.productimage}/>
  )
}

const styles = StyleSheet.create({    
    productimage:{
        height:"100%",
        width:"100%",
        resizeMode:"contain",
    },
})

export default ProductImageBox

