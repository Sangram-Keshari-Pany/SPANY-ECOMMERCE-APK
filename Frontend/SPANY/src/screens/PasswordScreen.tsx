import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, StatusBar, Platform, Image } from 'react-native';
import { userlogin } from '../functionality/authentication';
import { useData } from '../functionality/APICall';
import { dynamicWidth, dynamicBorderRadius, dynamicFontSize, dynamicPadding, height, Textcolor, Themes, dynamicMargin, dynamicIconSize } from '../Themes/color';
import { PasswordScreenSvg } from '../Themes/SVGIcons';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';
import LinearGradient from 'react-native-linear-gradient';

interface PasswordScreenProps {navigation: any;}

const PasswordScreen = ({ navigation }: PasswordScreenProps) => {
  const { fetchdata } = useData();
  const route = useRoute();
  const userData = route.params as any;

  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userData?.user?.username) {
      setUsername(userData.user.username);
    }
  }, [userData]);

  const handleLogin = async () => {
    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Password is required',
      });
      return;
    }
    setLoading(true);

    const userCredentials = {
      username,
      password,
    };

    try {
      await userlogin(navigation, userCredentials, userData, fetchdata);
    } catch (error) {
      console.error('Login Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotYou = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden={true} />
        <Toast config={toastConfig} />
        <View style={styles.svgContainer}>
          <PasswordScreenSvg />
        </View>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userData?.profile_picture }} style={styles.avatar} onError={() => console.log('Image failed to load')}/>
          </View>
          <View style={styles.usertext}>
            <Text style={styles.greeting}>{userData?.user?.username}</Text>
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Themes.color7} textContentType="password" secureTextEntry onChangeText={(text) => setPassword(text.trim())} value={password}/>
          </View>

          <LinearGradient colors={Themes.gradient1} style={styles.doneButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
            <TouchableOpacity style={styles.doneButton} onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator size="small" color={Themes.color6} />
              ) : (
                <Text style={styles.doneButtonText}>
                  Proceed
                </Text>
              )}
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity style={styles.notYouButton} onPress={handleNotYou}>
            <Text style={styles.notYouText}>Not you?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.color1,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: Themes.color1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    width: dynamicWidth * 0.3,
    height: dynamicWidth * 0.3,
    overflow: 'hidden',
    borderWidth: dynamicBorderRadius*0.25,
    borderColor: Themes.color2,
    borderRadius: 100,
  },
  avatar: {
    height: '100%',
    width: '100%',
    marginBottom: dynamicMargin,
  },
  usertext: {
    height: dynamicWidth * 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  greeting: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize * 1.5,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: dynamicWidth,
    color: Themes.color9,
    fontSize: dynamicFontSize,
    height: dynamicFontSize * 3.5,
    marginBottom: dynamicPadding,
    borderRadius: dynamicBorderRadius,
    paddingHorizontal: dynamicPadding,
    backgroundColor: Themes.color5,
  },
  doneButton: {
    width: dynamicWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dynamicPadding,
    height: dynamicFontSize * 3.5,
  },
  doneButtonText: {
    fontWeight: '200',
    color: Themes.color6,
    fontSize: dynamicFontSize * 1.5,
  },
  notYouButton: {
    width: dynamicWidth * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    height: dynamicFontSize * 3.5,
    justifyContent: 'center',
  },
  notYouText: {
    color: Themes.color9,
    fontSize: dynamicFontSize * 1.5,
  },
});

export default PasswordScreen;
