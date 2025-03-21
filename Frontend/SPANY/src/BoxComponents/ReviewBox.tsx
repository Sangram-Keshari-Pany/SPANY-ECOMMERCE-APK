import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfilePhotos from './ProfilePhoto'
import StarRating from './StarRatingBox'
import TextBox from './TextBox'
import { dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, Themes } from '../Themes/color'

const ReviewBox = ({productreview}:any) => {    
    return (
        <View style={styles.reviewbox}>
            <View style={styles.reviewbox1}><ProfilePhotos imageurl={productreview&& productreview.customuser.profile_picture} /></View>
            <View style={styles.reviewbox2}>
                <Text style={styles.name}>{productreview&& productreview.user.username}</Text>
                <StarRating rating={productreview?Number(productreview.rating):0} size={dynamicFontSize} />
                <TextBox text={productreview&& productreview.comment} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    reviewbox: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginHorizontal: dynamicMargin,
        marginVertical: dynamicMargin * 0.5
    },
    reviewbox1: {
        height: dynamicWidth * 0.1,
        width: dynamicWidth * 0.1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderWidth:1,
        borderColor:Themes.color10,
        borderRadius:"50%"
    },
    reviewbox2: {
        height: "100%",
        width: "80%",
    },
    name: {
        fontSize: dynamicFontSize * 1.5,
        fontWeight: "bold"
    }
})

export default ReviewBox
