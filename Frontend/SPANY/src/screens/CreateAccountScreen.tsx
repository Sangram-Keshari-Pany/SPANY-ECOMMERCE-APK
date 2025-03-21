import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { userregistration } from '../functionality/authentication';
import { dynamicWidth, dynamicBorderRadius, dynamicFontSize, dynamicPadding, Themes, dynamicMargin } from '../Themes/color';
import CustomIcons from '../Themes/CustomIcons';
import { useData } from '../functionality/APICall';
import { CreateScreenSvg } from '../Themes/SVGIcons';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const CreateAccountScreen = ({ navigation }: any) => {
  const { fetchdata } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage]: any = useState(null);
  const [loading, setLoading] = useState(false);

  const openImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        setImage(response.assets[0]);
      }
    });
  };

  const validateForm = () => {
    if (!username || !password || !phone) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all the fields',
      });
      return false;
    }
    return true;
  };

  const perform = async () => {
    if (!validateForm()) return; 

    setLoading(true);
    const formData = new FormData();
    formData.append('user', JSON.stringify({ username, password, email: username }));
    formData.append('phone_number', phone);

    if (image && image.uri) {
      formData.append('profile_picture', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    }

    try {
      await userregistration(navigation, formData, fetchdata);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error occurred during registration. Please try again!',
      });
      console.error('Registration error:', error);
    }
  };

  const Login = () => navigation.navigate('Login');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollViewContent}>
        <StatusBar hidden={true} />
        <View style={styles.svgContainer}>
          <CreateScreenSvg />
        </View>
        <Toast config={toastConfig} />
        <View style={styles.content}>
          <View style={styles.titleBox}>
            <Text style={styles.title} >Create</Text>
            <Text style={styles.title} >Account</Text>
          </View>
          <View style={styles.cameraBox}>
            <TouchableOpacity style={styles.profilePicture} onPress={openImagePicker}>
              {image ? (
                <Image source={{ uri: image.uri }} style={styles.image} />
              ) : (
                <CustomIcons name="camera" size={dynamicWidth < 600 ? 35 : 70} color={Themes.color2} />
              )}
            </TouchableOpacity>
          </View>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Themes.color7} textContentType="emailAddress" keyboardType="email-address" onChangeText={setUsername} value={username} />
          <TextInput placeholder="Password" placeholderTextColor={Themes.color7} style={styles.input} textContentType="password" secureTextEntry onChangeText={setPassword} value={password} />
          <View style={styles.phoneInputContainer}>
            <Image source={{ uri: 'https://flagcdn.com/w320/in.png' }} style={styles.flag} />
            <TextInput style={styles.phoneInput} placeholder="Your number" placeholderTextColor={Themes.color7} textContentType="telephoneNumber" keyboardType="phone-pad" onChangeText={setPhone} value={phone} />
          </View>
          <LinearGradient colors={Themes.gradient1} style={styles.doneButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
          <TouchableOpacity style={styles.doneButton} onPress={perform} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={Themes.color6} />
            ) : (
              <Text style={styles.doneButtonText} >Proceed</Text>
            )}
          </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity style={styles.cancelButton} onPress={Login}>
            <Text style={styles.cancelButtonText} >Login</Text>
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
  titleBox: {
    width: dynamicWidth,
    height: dynamicWidth * 0.7,
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    color: Themes.color9,
    fontSize: dynamicFontSize*5,
  },
  cameraBox: {
    width: dynamicWidth,
    justifyContent: 'center',
    height: dynamicWidth * 0.5,
  },
  profilePicturecolor:{
    backgroundColor:"#fff"
  },
  profilePicture: {
    width: "25%",
    height: "50%",
    alignItems: 'center',
    borderStyle: 'dashed',
    justifyContent: 'center',
    borderColor: Themes.color2,
    borderWidth: dynamicBorderRadius*0.6,
    borderRadius:"50%",
    overflow:"hidden"
  },
  image: {
    height: '99%',
    width: '99%',
    resizeMode: 'cover',
  },
  input: {
    color: Themes.color9,
    width: dynamicWidth,
    fontSize: dynamicFontSize,
    marginBottom: dynamicPadding,
    backgroundColor: Themes.color5,
    height: dynamicFontSize * 3.5,
    borderRadius: dynamicBorderRadius,
    paddingHorizontal: dynamicPadding,
  },
  phoneInputContainer: {
    height: dynamicFontSize * 3.5,
    width: dynamicWidth,
    borderRadius: dynamicBorderRadius,
    marginBottom: dynamicMargin,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dynamicPadding,
    backgroundColor: Themes.color5,
    color: Themes.color9,
  },
  flag: {
    width: dynamicFontSize * 3,
    height: dynamicFontSize * 2,
    borderRadius: 3,
    marginRight: dynamicMargin,
  },
  phoneInput: {
    flex: 1,
    fontSize: dynamicFontSize,
    color: Themes.color9,
  },
  doneButton: {
    width: dynamicWidth,
    height: dynamicFontSize * 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dynamicBorderRadius,
  },
  doneButtonText: {
    color: Themes.color6,
    fontSize: dynamicFontSize*1.5,
    fontWeight: '200',
  },
  cancelButton: {
    width: dynamicWidth,
    height: dynamicFontSize * 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dynamicBorderRadius,
  },
  cancelButtonText: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
    fontWeight: 'bold',
  },
});

export default CreateAccountScreen;
