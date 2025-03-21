import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcons from '../Themes/CustomIcons'
import { dynamicIconSize, dynamicPadding, Themes } from '../Themes/color'

const OptionBox = ({navigation}:any) => {
    return (
        <View style={styles.FirstView3}>
            <TouchableOpacity style={styles.iconbox}>
                <CustomIcons name="credit-card" color={Themes.color2} size={dynamicIconSize * 0.7} onPress={() => { navigation.navigate("Profile", { screen: "SetttingsVouchersScreen" }) }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconbox}>
                <CustomIcons name="menu" color={Themes.color2} size={dynamicIconSize * 0.7} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconbox} onPress={() => { navigation.navigate("Profile", { screen: "SettingsScreen" }) }}>
                <CustomIcons name="settings" color={Themes.color2} size={dynamicIconSize * 0.7} />
            </TouchableOpacity>
        </View>
    )
}

export default OptionBox

const styles = StyleSheet.create({
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