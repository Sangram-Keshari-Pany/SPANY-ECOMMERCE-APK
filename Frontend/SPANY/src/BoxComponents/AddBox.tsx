import { Image, StyleSheet, TouchableOpacity, ImageSourcePropType, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

interface ImageBoxProps {
  source: ImageSourcePropType;
  navigation:any;
}

const ImageBox: React.FC<ImageBoxProps> = ({ source,navigation }) => {  
  return (
    <TouchableWithoutFeedback style={styles.imageContainer} onPress={()=>navigation.navigate("FlashshaleScreen")}>
      <Image source={source} style={styles.image} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageBox;
