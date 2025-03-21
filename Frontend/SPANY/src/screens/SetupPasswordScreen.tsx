import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StatusBar, Image } from 'react-native';
import { PasswordRecoveryScreenSvg } from '../Themes/SVGIcons';
import Toast from 'react-native-toast-message';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, height, Themes } from '../Themes/color';
import { toastConfig } from '../Themes/CustomTost';
import { useRoute } from '@react-navigation/native';
import { SetupPassword } from '../functionality/authentication';
import LinearGradient from 'react-native-linear-gradient';

const PasswordRecoveryCode = ({ navigation }: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { userData } = route.params as any;

  const handleSave = async () => {
    if (!newPassword || !repeatPassword) {
      return Toast.show({
        type: 'error',
        visibilityTime: 5000,
        text1: 'Fields cannot be empty',
        text2: 'Please fill both the password fields.',
      });
    }

    if (newPassword !== repeatPassword) {
      return Toast.show({
        type: 'error',
        visibilityTime: 5000,
        text1: 'Password Mismatch',
        text2: 'Your new password and retype password don’t match. Please try again. 🔑',
      });
    }

    try {
      setIsLoading(true);
      const data = {
        username: userData.user.username,
        newpassword: newPassword,
      };
      await SetupPassword(navigation, data);
    } catch (error) {
      Toast.show({
        type: 'error',
        visibilityTime: 5000,
        text1: 'Something went wrong',
        text2: 'We couldn’t update your password. Please try again later. 🔑',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.navigate('Password', userData);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar hidden={true} />
        <View style={styles.svgContainer}>
          <PasswordRecoveryScreenSvg />
        </View>
        <Toast config={toastConfig} />
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: userData.profile_picture }} style={styles.avatar} />
          </View>
          <Text style={styles.title}>Setup New Password</Text>
          <Text style={styles.subtitle}>Please, setup a new password for your account</Text>
          <Text style={styles.username}>{userData.user.username}</Text>

          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor={Themes.color7}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Repeat Password"
            placeholderTextColor={Themes.color7}
            secureTextEntry
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />

          <TouchableOpacity
            onPress={handleSave}
            disabled={isLoading}
          >
            <LinearGradient colors={Themes.gradient1} style={styles.saveButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
              <Text style={styles.saveButtonText}>{isLoading ? 'Saving...' : 'Save'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel}>
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
    backgroundColor: Themes.color1,
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
    padding: dynamicPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    borderRadius: dynamicWidth * 0.15, 
    width: dynamicWidth * 0.3,
    height: dynamicWidth * 0.3,
    borderColor: Themes.color2,
    borderWidth: dynamicBorderRadius - 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
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
    paddingHorizontal: dynamicPadding,
  },
  username: {
    fontSize: dynamicFontSize * 1.2,
    color: Themes.color9,
    fontWeight: "bold",
    marginBottom: dynamicMargin
  },
  input: {
    width: dynamicWidth,
    height: dynamicFontSize * 3.5,
    borderWidth: 1,
    borderColor: Themes.color7,
    borderRadius: dynamicBorderRadius,
    paddingHorizontal: dynamicPadding,
    marginBottom: dynamicMargin,
    backgroundColor: Themes.color5,
    color: Themes.color9
  },
  saveButton: {
    width: dynamicWidth,
    height: dynamicFontSize * 3.5,
    backgroundColor: Themes.color2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dynamicBorderRadius,
    marginBottom: dynamicMargin,
  },
  saveButtonText: {
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
