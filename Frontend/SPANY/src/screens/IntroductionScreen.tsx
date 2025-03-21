import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View,ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';  
import { Mode, Themes } from '../Themes/color';
import RNSecureStorage from 'rn-secure-storage';


const IntroductionScreen = ({navigation}:any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const AccessToken = await RNSecureStorage.getItem('access_token');
                if (AccessToken) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log('Error fetching token:', error);
            } finally {
                setIsLoading(false);  
            }
        };
        checkAuthStatus();
    },[])

    const handleAnimationFinish = () => {
        setAnimationFinished(true); 
        setIsLoading(true)
    };

    useEffect(() => {
        if (isLoading && animationFinished) {
            if (isAuthenticated) {
                navigation.navigate('Tab'); 
            } else {
                navigation.navigate('Login'); 
            }
        }
    }, [isLoading, animationFinished, isAuthenticated, navigation]);

    
    return (
        <View style={styles.container}>
            <StatusBar hidden={false} barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} />
            <LottieView
                source={Mode
                    ? require('../Themes/SPANY_Logo Dark.json')
                    : require('../Themes/SPANY_LOGO.json')}
                autoPlay
                loop={false}
                speed={1}
                onAnimationFinish={handleAnimationFinish}
                style={styles.animation}
            />
            {isLoading && <ActivityIndicator size="large" color={"#006BFF"} style={styles.ActivityIndicator}/>}
        </View>
    );
};

export default IntroductionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Themes.color1,
        position:"relative"
    },
    animation: {
        width: '100%', 
        height: '100%',
    },
    ActivityIndicator:{
        position: 'absolute', 
        top: '50.5%',  
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }]
    }
});
