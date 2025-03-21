import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { userfetchdata } from '../functionality/authentication';
import { dynamicWidth, dynamicBorderRadius, dynamicFontSize, dynamicPadding, Themes } from '../Themes/color';
import CustomIcons from '../Themes/CustomIcons';
import { LoginscreenSvg } from '../Themes/SVGIcons';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

interface LoginScreenProps {navigation: any; }

const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [username, setUsername] = useState<string>('');
    const [placeholder, setPlaceholder] = useState<string>('Enter Your Email');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        if (username.trim() === '') {
            setPlaceholder('* This field is required');
            return;
        }
        try {
            setLoading(true);            
            await userfetchdata(navigation, username.trim());
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Login failed!',
                text2: 'Something went wrong. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAccount = () => {
        navigation.navigate('CreateAccount');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.scrollViewContent}>
                <StatusBar showHideTransition="slide" hidden={true} />
                <View style={styles.svgContainer}>
                    <LoginscreenSvg />
                </View>
                <View style={styles.content}>
                    <Toast config={toastConfig} />
                    <View style={styles.loginContainer}>
                        <Text style={styles.heading} >Login</Text>
                        <View style={styles.greetingContainer}>
                            <Text style={styles.title} >Good to see you back!</Text>
                                <CustomIcons color={Themes.color8} name="heart" size={dynamicWidth < 600 ? 20 : 38} />
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput  style={styles.input} placeholder={placeholder} placeholderTextColor={placeholder !== 'Enter Your Email' ? 'red' : Themes.color7} onChangeText={(text) => setUsername(text.trim())} value={username} autoCapitalize="none"  keyboardType="email-address" />
                    </View>
                    <View style={styles.buttonBox}>
                        <LinearGradient colors={Themes.gradient1} style={styles.doneButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
                        <TouchableOpacity style={styles.doneButton} onPress={handleLogin}>
                            {loading ? (
                                <ActivityIndicator size="small" color={Themes.color6} />
                            ) : (
                                <Text style={styles.doneButtonText} >Next</Text>
                            )}
                        </TouchableOpacity>
                        </LinearGradient>
                        
                        
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCreateAccount}>
                            <Text style={styles.cancelButtonText} >Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        position: 'relative',
        backgroundColor: Themes.color1,
    },
    svgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    content: {
        flex: 1,
        padding: dynamicPadding,
    },
    loginContainer: {
        width: dynamicWidth,
        height: dynamicWidth,
        justifyContent: 'flex-end',
    },
    heading: {
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        color: Themes.color9,
        fontSize: dynamicFontSize*5,
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: dynamicFontSize,
    },
    title: {
        color: Themes.color9,
        fontSize: dynamicFontSize*1.5,
    },
    inputBox: {
        height: dynamicWidth * 0.3,
        justifyContent: 'flex-end',
    },
    input: {
        color: Themes.color9,
        width: dynamicWidth,
        fontSize: dynamicFontSize,
        height: dynamicFontSize * 3.5,
        backgroundColor: Themes.color5,
        borderRadius: dynamicBorderRadius,
        paddingHorizontal: dynamicPadding,
    },
    buttonBox: {
        width: dynamicWidth,
        alignItems: 'center',
        height: dynamicWidth * 0.4,
        justifyContent: 'center',
    },
    doneButton: {
        width: dynamicWidth,
        alignItems: 'center',
        justifyContent: 'center',
        height: dynamicFontSize * 3.5,
        borderRadius: dynamicBorderRadius,
        // backgroundColor: Themes.color2,
    },
    doneButtonText: {
        fontWeight: '200',
        fontSize: dynamicFontSize * 1.5,
        color: Themes.color6,
    },
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: dynamicWidth,
        height: dynamicFontSize * 3.5,
        borderRadius: dynamicBorderRadius,
        marginBottom: dynamicBorderRadius,
    },
    cancelButtonText: {
        fontSize: dynamicFontSize,
        color: Themes.color9,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
