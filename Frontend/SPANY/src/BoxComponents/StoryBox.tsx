import { Modal, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Video } from 'react-native-video';
import { dynamicBorderRadius, dynamicMargin, dynamicWidth, Themes } from '../Themes/color';

const StoryBox = ({ videourl }: any) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(true); 

  if (!videourl || videourl.trim() === '') {
    return null;  
  }

  const handleVideoPress = () => {
    setIsModalVisible(true);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsModalVisible(false);
    setIsFullscreen(false);
  };

  const handleVideoError = (error: any) => {
    setIsVideoLoaded(false);  
  };

  return (
    <View style={styles.StoryBox}>
      <TouchableOpacity onPress={handleVideoPress}>
        <Video
          source={{ uri: videourl }}
          style={[styles.video, isFullscreen ? styles.hidden : null]}
          resizeMode="cover"
          muted={true}
          onError={handleVideoError}  
        />
      </TouchableOpacity>

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          transparent={false}
          animationType="fade"
          onRequestClose={handleCloseFullscreen}
        >
          <StatusBar hidden={true} />
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseFullscreen}>
            <Video
              source={{ uri: videourl }}
              style={[styles.fullscreenVideo, isFullscreen ? styles.fullscreen : null]}
              resizeMode="cover"
              muted={false}
              onEnd={handleCloseFullscreen}
              onError={handleVideoError}  
            />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  StoryBox: {
    height: dynamicWidth * 0.5,
    width: dynamicWidth * 0.3,
    marginRight: dynamicMargin,
    borderRadius: dynamicBorderRadius,
    overflow: 'hidden',
    borderColor: Themes.color10,
    backgroundColor: Themes.color1,
    borderWidth: 1,
  },
  video: {
    height: '100%',
    width: '100%',
  },
  hidden: {
    display: 'none',
  },
  fullscreenVideo: {
    width: '100%',
    height: '100%',
  },
  fullscreen: {},
  closeButton: {
    width: '100%',
    height: '100%',
  },
});

export default StoryBox;
