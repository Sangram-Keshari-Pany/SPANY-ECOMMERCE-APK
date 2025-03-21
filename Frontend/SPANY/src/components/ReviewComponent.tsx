import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { dynamicBorderRadius, dynamicFontSize,dynamicMargin,Themes } from '../Themes/color'
import ReviewBox from '../BoxComponents/ReviewBox'
import LinearGradient from 'react-native-linear-gradient'

const ReviewComponent = ({ navigation ,productreviews}: any) => {
    return (
        <View style={styles.reviewbox}>
            <ReviewBox productreview={productreviews[0]} />
                <TouchableOpacity  onPress={()=>{navigation.navigate("Tab", { screen: "Home", params: { screen: "ReviewScreen" , params:{productreviews:productreviews}}})}}>
                <LinearGradient colors={Themes.gradient1} style={styles.TouchableOpacity} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
                    <Text style={styles.TouchableOpacityText}>View All Reviews</Text>
                </LinearGradient>
                </TouchableOpacity>
            
        </View>
    )
}

export default ReviewComponent

const styles = StyleSheet.create({
    reviewbox:{
        marginHorizontal:dynamicMargin,
        marginVertical:dynamicMargin*0.5
    },
    TouchableOpacity: {
        height: dynamicFontSize * 3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: dynamicBorderRadius
    },
    TouchableOpacityText: {
        color: Themes.color6,
        fontSize: dynamicFontSize*1.2,
    }
})