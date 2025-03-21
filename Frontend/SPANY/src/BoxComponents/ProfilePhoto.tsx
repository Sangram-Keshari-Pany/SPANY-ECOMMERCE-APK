import { Image, StyleSheet, View,} from 'react-native';
import React, { useState } from 'react';
import { EmptyCart } from '../Themes/SVGIcons';

interface ProfilePhotosProps {
  imageurl?: string; 
}

const ProfilePhotos: React.FC<ProfilePhotosProps> = ({ imageurl = '' }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.PhotoContainer}>
      {imageError || !imageurl ? (
    <EmptyCart height={"70%"} width={"70%"}/> 
  ) : (
    <Image
      style={styles.Image}
      source={{ uri: imageurl }}
      onError={handleImageError} 
    />)}
    </View>
  );
};

const styles = StyleSheet.create({
  PhotoContainer: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    alignItems:"center",
    justifyContent:"center"
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 35,
  },
});

export default ProfilePhotos;
