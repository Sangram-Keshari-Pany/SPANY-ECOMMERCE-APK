import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeadingBox from '../BoxComponents/HeadingBox'
import StarRating from '../BoxComponents/StarRatingBox'
import { dynamicFontSize, dynamicPadding } from '../Themes/color'
import { demo } from '../functionality/APICall'

const RatingComponent = ({productData}:any) => {
  return (
    <View>
      <HeadingBox title="Rating & Reviews" display='none' textSize={dynamicFontSize *1.5} functionality={demo}/>
      <View style={{paddingHorizontal:dynamicPadding}}>
        <StarRating rating={productData.rating} size={dynamicFontSize*1.5}/>
      </View>
    </View>
  )
}

export default RatingComponent

const styles = StyleSheet.create({})