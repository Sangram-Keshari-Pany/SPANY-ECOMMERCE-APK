import { Animated, PanResponder, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { contentWidth, dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, dynamicWidth, Themes } from '../Themes/color'
import ProfilePhotos from './ProfilePhoto'
import CustomIcons from '../Themes/CustomIcons'
import HeadingBox from './HeadingBox'
import { demo, useData } from '../functionality/APICall'
import { SavedReviewApiFunction } from '../functionality/apifunctions'
import LinearGradient from 'react-native-linear-gradient'

const ReviewPostBox = ({ setReview, selectedOrder }: any) => {
    const {userDetails,fetchdata}:any =useData()
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [lastClickTime, setLastClickTime] = useState<number>(0);
    const fullStars = Math.floor(rating);
    const hasHalfStar = (rating - fullStars) >= 0.5;
    
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (e, gestureState) => gestureState.dy !== 0,
            onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dy > 100) {
                    setReview(false);
                }
                pan.setValue({ x: 0, y: 0 });
            },
        })
    ).current;

    const handleStarPress = (index: number) => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastClickTime;
        if (timeDifference < 300) {
            setRating(Math.ceil(rating));
        } else {
            setRating(() => Math.min(index + 0.5, 5));
        }
        setLastClickTime(currentTime);
    };

    const handleSubmit = async() => {
        const Data={
            product: selectedOrder.product.id,
            comment: comment,
            rating: rating,
            video_review: null,
            image_review: null
        }
        await SavedReviewApiFunction(Data,fetchdata)
        setRating(0);
        setComment('');
        setReview(false);
    };

    return (
        <View style={styles.popup} {...panResponder.panHandlers} >
            <View style={styles.headingbox}>
                <HeadingBox title="Review" textSize={dynamicFontSize * 2} display="none" functionality={demo} />
            </View>
            <View style={styles.productsection}>
                <View style={styles.Profilecontainer}>
                    <ProfilePhotos imageurl={selectedOrder.product.product_image1} />
                </View>
                <View style={styles.Textcontainer}>
                    <Text style={styles.Textcontainertext}>{selectedOrder.product.product_name.slice(0, 50)}</Text>
                </View>
            </View>
            <View style={styles.ratingsection}>
                {[...Array(5)].map((_, index) => {
                    let starIcon = "star-o";
                    if (index < fullStars) {
                        starIcon = "star"; 
                    } else if (index === fullStars && hasHalfStar) {
                        starIcon = "star-half-o"; 
                    }
                    return (
                        <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                            <CustomIcons name={starIcon} size={dynamicIconSize * 0.6} color={Themes.color18} />
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={styles.commentsection}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Comment"
                    placeholderTextColor={Themes.color9}
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    multiline={true}
                    numberOfLines={4}
                    autoCorrect={true}
                    maxLength={250}
                />
            </View>
            <LinearGradient colors={Themes.gradient1} style={styles.buttonsection} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
            <TouchableOpacity style={styles.buttonsection} onPress={handleSubmit}>
                <Text style={styles.buttntext}>Submit</Text>
            </TouchableOpacity>
            </LinearGradient>
        </View>
    )
};

export default ReviewPostBox;

const styles = StyleSheet.create({
    popup: {
        height: dynamicWidth * 0.9,
        width: dynamicWidth + dynamicMargin * 2,
        backgroundColor: Themes.color1,
        position: "absolute",
        bottom: "0%",
        borderRadius: dynamicBorderRadius * 0.5,
    },
    headingbox: {
        backgroundColor: Themes.color3,
        height: "15%",
        justifyContent: "center",
        borderTopLeftRadius: dynamicBorderRadius,
        borderTopRightRadius: dynamicBorderRadius,
    },
    productsection: {
        height: "15%",
        width: dynamicWidth,
        marginHorizontal: dynamicMargin,
        marginVertical: dynamicMargin * 0.25,
        flexDirection: "row",
    },
    ratingsection: {
        height: "10%",
        width: dynamicWidth,
        marginHorizontal: dynamicMargin,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: dynamicPadding * 0.5,
    },
    commentsection: {
        height: "35%",
        width: dynamicWidth,
        backgroundColor: Themes.color3,
        marginHorizontal: dynamicMargin,
        flexDirection: "row",
        marginVertical: dynamicMargin * 0.25,
        borderRadius: dynamicBorderRadius * 0.5,
        alignItems: "flex-start",
    },
    input: {
        height: "100%",
        width: "100%",
        paddingHorizontal: dynamicPadding * 0.5,
        paddingVertical: dynamicPadding * 0.5,
        fontSize: dynamicFontSize,
        textAlignVertical: 'top',
        color:Themes.color9
    },
    buttonsection: {
        height: dynamicFontSize*3,
        width: dynamicWidth,
        marginHorizontal: dynamicMargin,
        flexDirection: "row",
        marginVertical: dynamicMargin * 0.25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: dynamicBorderRadius,
    },
    buttntext: {
        fontSize: dynamicFontSize * 1.5,
        color: Themes.color6,
        fontWeight: 200,
    },
    Profilecontainer: {
        height: "100%",
        aspectRatio: 1,
        borderRadius: "50%",
        backgroundColor: Themes.color1,
        borderWidth: 1,
        borderColor: Themes.color10,
        padding: dynamicPadding * 0.25,
        shadowColor: Themes.color4,
        shadowOffset: { width: -1, height: -1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
    },
    Textcontainer: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: dynamicPadding * 0.5,
        paddingVertical: dynamicPadding * 0.5,
    },
    Textcontainertext:{
         color:Themes.color9
    }
});
