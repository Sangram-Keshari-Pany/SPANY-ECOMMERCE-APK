import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { dynamicPadding, Themes } from '../Themes/color'

const LoadingScreen = () => {
    return (
        <ActivityIndicator size="small" color={Themes.color5} style={{backgroundColor:"black" ,flex:1}} />
    )
}

export default LoadingScreen

const styles = StyleSheet.create({

})