import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import CustomIcons from '../Themes/CustomIcons'
import { dynamicFontSize, dynamicIconSize, dynamicPadding, Themes } from '../Themes/color'

const DynamicComponent = ({ Component, DynamicData, dynamicpramps, setOperation }: any) => {
    const pan = useRef(new Animated.ValueXY()).current; 
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (e, gestureState) => gestureState.dy !== 0, 
            onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }), 
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dy > 100) {
                    setOperation(false); 
                }
                pan.setValue({ x: 0, y: 0 });
            },
        })
    ).current;

    const title = dynamicpramps.title; 
    return (
        <View style={styles.dropdownouter} {...panResponder.panHandlers}>
            <View style={styles.dropdownheading} >
                <Text style={styles.heading}>{title}</Text>
                <TouchableOpacity style={styles.dropdownclose} onPress={() => setOperation(false)}>
                    <CustomIcons name="expand-more" size={dynamicIconSize * 0.6} color={Themes.color2} />
                </TouchableOpacity>
            </View>
            <View style={styles.dropdown}>
                <Component {...dynamicpramps} setOperation={setOperation} Data={DynamicData} />
            </View>
        </View>
    )
}

export default DynamicComponent;

const styles = StyleSheet.create({
    dropdownouter: {
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        overflow: "hidden",
        backgroundColor: Themes.color1,
    },
    dropdownheading: {
        width: "100%",
        padding: dynamicPadding * 0.25,
        paddingHorizontal: dynamicPadding,
        backgroundColor: Themes.color3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    heading: {
        fontSize: dynamicFontSize * 2,
        fontWeight: "bold",
        color: Themes.color9,
    },
    dropdown: {
        width: "100%",
        paddingHorizontal: dynamicPadding,
    },
    dropdownclose: {
        padding: dynamicPadding * 0.5,
        backgroundColor: Themes.color1,
        borderRadius: "50%",
    },
});
