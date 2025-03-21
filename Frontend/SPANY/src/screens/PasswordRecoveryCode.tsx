import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StatusBar, Image } from 'react-native';
import { PasswordRecoveryScreenSvg } from '../Themes/SVGIcons';
import Toast from 'react-native-toast-message';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, height, Themes } from '../Themes/color';
import { toastConfig } from '../Themes/CustomTost';
import { useRoute, RouteProp } from '@react-navigation/native';
import { PasswordRecovery } from '../functionality/authentication';
import LinearGradient from 'react-native-linear-gradient';

type PasswordRecoveryCodeRouteProp = RouteProp<any, 'PasswordRecoveryCode'>;

const PasswordRecoveryCode = ({ navigation }: { navigation: any }) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const route = useRoute<PasswordRecoveryCodeRouteProp>();
  const { generated_otp, userData, data }: any = route.params;

  const otp = code.join('');

  const inputRefs = useRef<(TextInput | null)[]>(new Array(6).fill(null));

  const handleInputChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number) => {
    const newCode = [...code];
    newCode[index] = '';
    setCode(newCode);

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      console.log(otp, "otp", generated_otp, "generated otp");

      if (Number(otp) === generated_otp) {
        Toast.show({
          type: 'success',
          visibilityTime: 5000,
          text1: 'OTP Matched Successfully!',
          text2: 'You’ve successfully verified your identity. Proceed with resetting your password. 💪🔐',
        });
        setTimeout(() => {
          navigation.navigate('SetupPasswordScreen', { userData });
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          visibilityTime: 5000,
          text1: 'OTP Does Not Match',
          text2: 'Please check the OTP and try again. ⏳🔐',
        });
      }
    }
  }, [otp, generated_otp, navigation, userData]);

  const sendAgain = async () => {
    try {
      setCode(['', '', '', '', '', ''])
      await PasswordRecovery(navigation, userData, data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to resend OTP. Please try again.',
      });
    }
  };

  const cancel = () => {
    navigation.navigate('Password', { userData });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}  contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden={true} />
        <View style={styles.svgContainer}>
          <PasswordRecoveryScreenSvg />
        </View>
        <Toast config={toastConfig} />
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: userData.profile_picture }} style={styles.avatar} />
          </View>
          <Text style={styles.title}>Password Recovery</Text>
          <Text style={styles.subtitle}>
            Enter 6-digits code we sent you on your phone number
          </Text>
          {data.selectedoption === 'SMS' ? (
            <Text style={styles.phoneNumber}>{`+91 ******${userData.phone_number.slice(6, 10)}`}</Text>
          ) : (
            <Text style={styles.phoneNumber}>{`${userData.user.email.slice(0, 5)}*******@gmail.com`}</Text>
          )}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={digit}
                onChangeText={(text) => handleInputChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') handleBackspace(index);
                }}
                maxLength={1}
                keyboardType="number-pad"
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
              />
            ))}
          </View>
            <TouchableOpacity  onPress={sendAgain} style={styles.sendAgainButton} >
            <LinearGradient colors={Themes.gradient1} style={styles.sendAgainButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
              <Text style={styles.sendAgainText}>Send Again</Text>
              </LinearGradient>
            </TouchableOpacity>
          <TouchableOpacity onPress={cancel}  style={styles.cancelebutton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
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
    height: height,
    padding: dynamicPadding,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    borderRadius: '50%',
    width: dynamicWidth * 0.3,
    height: dynamicWidth * 0.3,
    borderColor: Themes.color2,
    marginBottom: dynamicMargin,
    borderWidth: dynamicBorderRadius - 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: dynamicWidth * 0.3,
    height: dynamicWidth * 0.3,
    resizeMode: 'cover',
  },
  title: {
    fontSize: dynamicFontSize * 2,
    fontWeight: 'bold',
    color: Themes.color9,
  },
  subtitle: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
    textAlign: 'center',
    marginVertical: dynamicMargin * 0.25
  },
  phoneNumber: {
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
    color: Themes.color9,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginVertical: dynamicMargin
  },
  input: {
    width: '15%',
    height: '100%',
    borderWidth: 1,
    borderColor: Themes.color7,
    borderRadius: dynamicBorderRadius,
    textAlign: 'center',
    fontSize: dynamicFontSize * 1.5,
    backgroundColor: Themes.color5,
    color: Themes.color9
  },
  sendAgainButton: {
    width: dynamicWidth,
    height: dynamicFontSize * 3.5,
    backgroundColor: Themes.color2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dynamicBorderRadius,
  },
  cancelebutton:{
    width: dynamicWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dynamicPadding,
    height: dynamicFontSize * 3.5,
    marginVertical: dynamicMargin*0.25,
  },
  sendAgainText: {
    fontWeight: '200',
    color: Themes.color6,
    fontSize: dynamicFontSize * 1.5,
  },
  cancelText: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
});

export default PasswordRecoveryCode;
