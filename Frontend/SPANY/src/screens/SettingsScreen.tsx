import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import HeadingBox from "../BoxComponents/HeadingBox";
import CustomIcons from '../Themes/CustomIcons';
import { dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, Mode, Themes } from '../Themes/color';
import { demo } from "../functionality/APICall";
import { logout } from "../functionality/authentication";

const SETTINGS_DATA = [
  { title: "Personal", items: [{ name: "Profile", screen: "SettingsProfileScreen" }, { name: "Shipping Address", screen: "SettingsShippingAddressScreen" }, { name: "Payment Methods", screen: "SettingsAddCardScreen" }] },
  { title: "Shop", items: [{ name: "Country", screen: "SettingsScreen" }, { name: "Currency", screen: "SettingsScreen" }, { name: "Sizes", screen: "SettingsScreen" }, { name: "Terms and Conditions", screen: "SettingsScreen" }] },
  { title: "Account", items: [{ name: "Language", screen: "SettingsScreen" }, { name: "About SPANY", screen: "AboutScreen" }] },
];

const SettingsScreen = ({ navigation }: any) => { 

  const renderItem = ({ item }: { item: { title: string; items: { name: string; screen: string }[] } }) => (
    <View style={styles.section}>
      <HeadingBox title={item.title} display='none' textSize={dynamicFontSize*1.5} functionality={demo}/>
      {item.items.map((subItem, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.item} 
          onPress={() => navigation.navigate(subItem.screen)}>
          <Text style={styles.itemText}>{subItem.name}</Text>
          <CustomIcons name={"right"} color={Themes.color9} size={dynamicIconSize*0.5}/>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar  barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} translucent={false} />
      <HeadingBox title="Settings" display='none' textSize={dynamicFontSize * 3} functionality={demo}/>
      <FlatList data={SETTINGS_DATA} renderItem={renderItem} keyExtractor={(item) => item.title} showsVerticalScrollIndicator={false} />
      <Pressable style={styles.deleteAccount} onPress={()=>logout(navigation)}>
        <Text style={styles.deleteText}>Log Out</Text>
      </Pressable>
      <Text style={styles.footer}>SPANY{"\n"}Version 1.0 March, 2025</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Themes.color1 },
  section: { marginVertical:dynamicMargin*0.5},
  item: { flexDirection: "row", justifyContent: "space-between", paddingVertical:dynamicPadding*0.5, borderBottomWidth: 0.5, borderColor: "#ddd",marginHorizontal:dynamicMargin},
  itemText: { fontSize: dynamicFontSize,fontWeight:"bold" ,color:Themes.color9},
  deleteAccount: {marginVertical:dynamicMargin*0.5,marginHorizontal:dynamicMargin },
  deleteText: { fontSize: dynamicFontSize, color: "red" ,fontWeight:"bold"},
  footer: { fontSize:dynamicFontSize, textAlign: "center", color: "#999", marginTop: 20 },
});

export default SettingsScreen;
