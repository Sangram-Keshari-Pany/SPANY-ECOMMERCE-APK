import { StyleSheet, View, Text, PanResponder } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import CustomIcons from '../Themes/CustomIcons';
import {  dynamicIconSize, dynamicMargin, dynamicWidth, Themes } from '../Themes/color';
import ProductImageBox from '../BoxComponents/ProductImageBox';

const ProductImageComponent = ({ productData }: any) => {
    const [productImageUrls, setProductImageUrls] = useState<string[]>([]);
    const [currentCard, setCurrentCard] = useState(0);

    useEffect(() => {
        if (productData) {
            const urls = [productData.product_image1,productData.product_image2,productData.product_image3,productData.product_image4,productData.product_image5].filter(Boolean); 
            setProductImageUrls(urls);
        }
    }, [productData]);

    const handleSwipe = useCallback(
        (gestureState: any) => {
            const { dx } = gestureState;
            if (dx > 100) {
                setCurrentCard((prev) => (prev - 1 + productImageUrls.length) % productImageUrls.length);
            } else if (dx < -100) {
                setCurrentCard((prev) => (prev + 1) % productImageUrls.length);
            }
        },
        [productImageUrls.length]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {},
        onPanResponderRelease: (e, gestureState) => {
            handleSwipe(gestureState); 
        },
    });


    if (productImageUrls.length === 0) {
        return <Text>No images available</Text>; 
    }

    return (
        <View style={styles.container}>
            <View
                style={styles.SlidingContainer}
                {...panResponder.panHandlers} 
            >
                <ProductImageBox imageurl={productImageUrls[currentCard]} />
            </View>

            <View style={styles.paginationContainer}>
                {productImageUrls.map((_, index) => (
                    <CustomIcons
                        key={index}
                        name={index === currentCard ? 'dash' : 'dot-fill'}
                        size={dynamicIconSize*0.7}
                        color={index === currentCard ? Themes.color2 : Themes.color5}
                        style={styles.paginationDot}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Center all components inside
        justifyContent: 'center',
    },
    SlidingContainer: {
        height: dynamicWidth,
        width: dynamicWidth,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: dynamicMargin,
        overflow: 'hidden',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: dynamicMargin * 0.5,
    },
    paginationDot: {
        marginHorizontal:dynamicMargin,
    },
});

export default ProductImageComponent;
