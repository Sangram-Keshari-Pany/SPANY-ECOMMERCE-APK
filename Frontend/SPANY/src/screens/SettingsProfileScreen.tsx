import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import HeadingBox from '../BoxComponents/HeadingBox';
import { 
  dynamicBorderRadius, 
  dynamicFontSize, 
  dynamicMargin, 
  dynamicPadding, 
  dynamicWidth, 
  Themes 
} from '../Themes/color';
import { demo, useData } from '../functionality/APICall';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SettingsProfileScreen = () => {
  const { userDetails, updateUserDetails }: any = useData(); 
  const [username, setUsername] = useState(userDetails.username);
  const [email, setEmail] = useState(userDetails.email);
  const [password, setPassword] = useState('***********'); 
  
  const handleSaveChanges = () => {
    const updatedDetails = {
      username,
      email,
    };    
  };

  return (
    <View style={styles.mainbox}>
      <HeadingBox title={"Settings"} display='none' textSize={dynamicFontSize * 3} functionality={demo} />
      <HeadingBox title={"Your Profile"} display='none' textSize={dynamicFontSize * 1.5} functionality={demo}/>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: userDetails.profile_picture }} 
            style={styles.avatar} 
          />
        </View>
        <View style={styles.profileInfo}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={Themes.color9}
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={Themes.color9}
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={Themes.color9}
          />
        </View>
      </View>

      <LinearGradient colors={Themes.gradient1} style={styles.saveButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
      <TouchableOpacity  onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>   
      </LinearGradient>
    </View>
  );
}

export default SettingsProfileScreen;

const styles = StyleSheet.create({
  mainbox: {
    flex: 1,
    backgroundColor: Themes.color1, 
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: dynamicMargin,
    padding: 10,
    borderRadius: dynamicBorderRadius,
  },
  avatarContainer: {
    width: dynamicWidth * 0.4,
    height: dynamicWidth * 0.4,
    alignItems: 'center', 
    marginBottom: dynamicMargin,
    borderRadius: "50%",
    borderColor: Themes.color16,
    borderWidth: dynamicBorderRadius*0.5,
    shadowColor: Themes.color4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    overflow:"hidden"
  },
  avatar: {
    height:"100%",
    width:"100%"
  },
  profileInfo: {
    marginVertical: dynamicMargin*0.5,
    gap: 5
  },
  input: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
    backgroundColor: Themes.color3,
    width: dynamicWidth,
    padding: dynamicPadding*0.5,
    borderRadius: dynamicBorderRadius,
    marginVertical: dynamicMargin / 4,
  },
  saveButton: {
    height: dynamicFontSize * 3.5,
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: "center",
    marginHorizontal:dynamicMargin
  },
  saveButtonText: {
    color:Themes.color6,
    fontSize: dynamicFontSize * 1.5,
  },
});
