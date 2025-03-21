import { StatusBar, StyleSheet, View, Animated,FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useData } from '../functionality/APICall';
import ToRecive from '../BoxComponents/ToRecive';
import OrderHistory from '../components/OrderHistory';
import {dynamicFontSize, dynamicPadding,Mode,Themes } from '../Themes/color';
import ReviewItems from '../BoxComponents/ReviewItems';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';

const ReciveScreen = ({ navigation }: any) => {
    const {userDetails,deliveritems}: any = useData();
    const [trackorder, setTrackorder] = useState(false);
    const [currentorders, Setcurrentorders] = useState([]); 
    const [slideAnim] = useState(new Animated.Value(0)); 

    useEffect(() => {
        if (trackorder) {Animated.timing(slideAnim, {toValue: 1,duration: 500,useNativeDriver: true}).start();} 
        else {Animated.timing(slideAnim, {toValue: 0,duration: 500,useNativeDriver: true,}).start();}
    }, [trackorder]);

    const renderOrderHistory = ({ item }: any) => (
        <OrderHistory 
            navigation={navigation} 
            deliveritem={item} 
            Setcurrentorders={Setcurrentorders} 
            setTrackorder={setTrackorder} 
        />
    );

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} translucent={false} />
            <ToRecive navigation={navigation} imageurl={userDetails.profile_picture} />
            <FlatList 
                data={deliveritems}
                renderItem={renderOrderHistory}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: dynamicPadding }}
            />
            <Toast config={toastConfig} />

            {trackorder && (
                <ReviewItems currentorders={currentorders} navigation={navigation} setTrackorder={setTrackorder}  />
            )}
        </View>
    );
}; 

export default ReciveScreen;

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: Themes.color1,
    },
    TrackOrderbox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '60%', 
        zIndex: 10,
        overflow: 'hidden',
    },
    trackOrderText: {
        fontSize: dynamicFontSize + 2,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});
