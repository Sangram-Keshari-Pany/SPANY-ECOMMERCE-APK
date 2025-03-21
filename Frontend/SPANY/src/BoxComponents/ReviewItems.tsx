import { Animated, PanResponder, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import OrderBoxDetails from './OrderBoxDetails'
import { contentWidth, dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicWidth, Themes } from '../Themes/color'
import ReviewproductBox from './ReviewproductBox'
import ReviewPostBox from './ReviewPostBox'

const ReviewItems = ({ currentorders, navigation, setTrackorder }: any) => {
    const [review, setReview] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (e, gestureState) => gestureState.dy !== 0,
            onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dy > 100) {
                    setTrackorder(false);
                }
                pan.setValue({ x: 0, y: 0 });
            },
        })
    ).current;

    return (
        <View style={{ alignItems: "center" }} {...panResponder.panHandlers}>
            <View style={styles.ReviewBox}>
                <Text style={styles.ReviewBoxText}>Which item you want to review?</Text>
            </View>
            <ScrollView>
                {currentorders.map((currentorder: any) => {
                    return (
                        <View style={styles.cart} key={currentorders.order_id}>
                            <ReviewproductBox product={currentorder.product} navigation={navigation} />
                            <OrderBoxDetails navigation={navigation} orderitems={currentorder} setReview={setReview} setSelectedOrder={setSelectedOrder} setTrackorder={setTrackorder} />
                        </View>
                    )
                })}
            </ScrollView>
            {review && <ReviewPostBox setReview={setReview} selectedOrder={selectedOrder} />}
        </View>
    )
}

export default ReviewItems

const styles = StyleSheet.create({
    cart: {
        width: contentWidth,
        height: dynamicWidth * 0.28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: dynamicMargin,
        marginVertical: dynamicMargin * 0.25
    },
    ReviewBox: {
        height: dynamicWidth * 0.15,
        width: "100%",
        backgroundColor: Themes.color3,
        alignItems: "center",
        justifyContent: "center" ,
        borderTopLeftRadius:dynamicBorderRadius,
        borderTopRightRadius:dynamicBorderRadius,
    },
    ReviewBoxText: {
        fontSize: dynamicFontSize * 2,
        fontWeight: "bold",
        color:Themes.color9
    },
})