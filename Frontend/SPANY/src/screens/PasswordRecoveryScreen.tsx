import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PasswordRecoveryScreenSvg } from '../Themes/SVGIcons';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, height, Themes } from '../Themes/color';
import { useRoute } from '@react-navigation/native';
import { PasswordRecovery } from '../functionality/authentication';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';
import LinearGradient from 'react-native-linear-gradient';

// Define props type for navigation
interface PasswordRecoveryScreenProps { navigation: any; }

const PasswordRecoveryScreen = ({ navigation }: PasswordRecoveryScreenProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('SMS');
  const route = useRoute();
  const userData = route.params as any;

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const resetPassword = async () => {
    try {
      const data = {
        username: userData.user.username,
        selectedoption: selectedOption,
      };
      await PasswordRecovery(navigation, userData, data);
    } catch (error) {
      console.error('Password reset error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Unable to reset password. Please try again.',
      });
    }
  };

  const cancelReset = () => {
    navigation.navigate('Password', userData);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollViewContainer}>
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
          <Text style={styles.subtitle}>How would you like to restore your password?</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.option, selectedOption === 'SMS' && styles.selectedOption]}
              onPress={() => handleOptionChange('SMS')}
              accessibilityLabel="SMS option"
              accessibilityRole="button"
            >
              <Text style={[styles.optionText, selectedOption === 'SMS' && styles.selectedOptionText]}>SMS</Text>
              {selectedOption === 'SMS' && <Icon name="checkmark-circle" size={20} color="#004BFE" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.option, selectedOption === 'Email' && styles.selectedOption]}
              onPress={() => handleOptionChange('Email')}
              accessibilityLabel="Email option"
              accessibilityRole="button"
            >
              <Text style={[styles.optionText, selectedOption === 'Email' && styles.selectedOptionText]}>Email</Text>
              {selectedOption === 'Email' && <Icon name="checkmark-circle" size={20} color="#004BFE" />}
            </TouchableOpacity>
          </View>
          <LinearGradient colors={Themes.gradient1} style={styles.nextButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
            <TouchableOpacity style={styles.nextButton} onPress={resetPassword}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity onPress={cancelReset}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
    height,
    padding: dynamicPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    borderRadius: '50%',
    width: dynamicWidth * 0.3,
    height: dynamicWidth * 0.3,
    borderColor: Themes.color2,
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: dynamicMargin,
  },
  option: {
    width: dynamicWidth * 0.5,
    padding: dynamicPadding*0.5,
    backgroundColor: Themes.color7,
    borderRadius: dynamicBorderRadius * 2,
    marginVertical: dynamicMargin*0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: Themes.color3,
  },
  optionText: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
  },
  selectedOptionText: {
    color: Themes.color2,
    fontWeight: 'bold',
  },
  nextButton: {
    width: dynamicWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dynamicPadding,
    height: dynamicFontSize * 3.5,
    marginVertical: dynamicMargin,
  },
  nextButtonText: {
    fontWeight: '200',
    color: Themes.color6,
    fontSize: dynamicFontSize * 1.5,
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize,
  },
});

export default PasswordRecoveryScreen;
