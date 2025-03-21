// App.jsx
import { StyleSheet, Text, View } from 'react-native';
import { dynamicBorderRadius, dynamicFontSize, dynamicWidth, Themes, } from './color';
import CustomIcons from './CustomIcons';

/*
  1. Create the config
*/
export const toastConfig = {
    success: ({ text1, text2 }: any) => {
        return (
            <View style={[styles.BaseToast,{backgroundColor:"#00781c"}]}>
                <CustomIcons name={"checkbox-marked-circle-outline"} color={"#fff"} size={20} />
                <Text style={styles.toastText}>{text1}</Text>
            </View>
        )
    },
    error: ({ text1, text2 }: any) => {
        return (
            <View style={[styles.BaseToast,{backgroundColor:"#b9302b"}]}>
                <CustomIcons name={"error-outline"} color={"#fff"} size={20} />
                <Text style={styles.toastText}>{text1}</Text>
            </View>
        )
    },
    warning: ({ text1, text2 }: any) => {
        return (
            <View style={styles.BaseToast}>
                <CustomIcons name={"warning"} color={"#ffdc00"} size={40} />
                <Text style={styles.toastText}>{text1}</Text>
            </View>
        )
    },
    increse:()=>{
        return null
    }
}

const styles = StyleSheet.create({
    BaseToast: {
        backgroundColor: Themes.color1,
        borderRadius: dynamicBorderRadius,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding:5,
        paddingHorizontal:30,
    },
    BaseToast2: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    toastText: {
        fontSize:dynamicFontSize*1.5,
        fontWeight: '200',
        color: Themes.color6,
        paddingLeft:10
    },

})
