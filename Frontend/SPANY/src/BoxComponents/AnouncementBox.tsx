import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomIcons from '../Themes/CustomIcons';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, Themes } from '../Themes/color';
import LinearGradient from 'react-native-linear-gradient';


interface AnouncementBoxProps {
  Announcement: string;
  title: string;
  icon: string;
  Component: React.ComponentType<any>;
  dynamicComponent: any
  address: any;
  setAddress: React.Dispatch<React.SetStateAction<any>>;
  fields: 'Contact' | 'Address' | 'All';
  action:string
}

const AnouncementBox: React.FC<AnouncementBoxProps> = ({ Announcement, title, icon, Component, dynamicComponent, address, setAddress, fields,action}: AnouncementBoxProps) => {
  const EditAnnouncement = () => {
    dynamicComponent(Component, { setAddress, title, fields,action }, address);
  };
  return (
    <View style={styles.AnouncementBox}>
      <View style={styles.Box1}>
        <Text style={styles.Announcement} allowFontScaling={false}>{title}</Text>
        <Text style={styles.Announcementcontent} allowFontScaling={false}>{Announcement}</Text>
      </View>
      <TouchableOpacity style={styles.Box2} onPress={EditAnnouncement}>
        <LinearGradient colors={Themes.gradient1} style={styles.Button} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
          <CustomIcons name={icon} color={Themes.color6} size={dynamicIconSize * 0.6} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  AnouncementBox: {
    marginVertical: dynamicMargin * 0.5,
    marginHorizontal: dynamicMargin,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: dynamicPadding * 0.5,
    borderColor: Themes.color10,
    backgroundColor: Themes.color1,
    justifyContent: 'space-between',
    borderRadius: dynamicBorderRadius * 0.5,
    shadowColor: Themes.color9,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  Box1: {
    flex: 1,
  },
  Box2: {
    borderRadius: "50%",
    overflow: "hidden"
  },
  Button: {
    alignItems: "center",
    padding: dynamicPadding * 0.4,
  },
  Announcement: {
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
    color: Themes.color9,
  },
  Announcementcontent: {
    fontSize: dynamicFontSize * 0.9,
    color: Themes.color9,
  },
});

export default AnouncementBox;
