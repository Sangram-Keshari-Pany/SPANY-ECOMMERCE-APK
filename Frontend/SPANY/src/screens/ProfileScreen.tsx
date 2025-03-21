import { FlatList, StatusBar, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import MyActivity from '../BoxComponents/MyActivity';
import TopProduct from '../components/TopProduct';
import NewItems from '../components/NewItems';
import MostPopular from '../components/MostPopular';
import CategoryComponent from '../components/CategoryComponent';
import FlashSale from '../components/FlashSale';
import JustForYou from '../components/JustForYou';
import StoryComponent from '../components/StoryComponent';
import HeadingBox from '../BoxComponents/HeadingBox';
import { useData } from '../functionality/APICall'
import { demo } from '../functionality/APICall';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, Mode, Themes } from '../Themes/color';
import AnouncementBox2 from '../BoxComponents/AnouncementBox2';

// Get the screen width and height
const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
  const { categories, subcategories, products, flashshales, favorites, reviews, cartitems, deliveritems, loading, error, userDetails, fetchdata }: any = useData();

  const Announcemnet = "🚀 Exciting New Feature: We’re thrilled to announce the launch of [feature name]! This new update will enhance your experience by [brief description]. Try it out today and let us know what you think!";

  const mostpopulars = useMemo(() => {
    return [...products].sort((a, b) => b.like - a.like).slice(0, 10);
  }, [products]);

  function torecive() {
    navigation.navigate("Profile", { screen: "ReciveScreen" });
  }

  const componentsArray = [
    <MyActivity name="My Activity" imageurl={userDetails.profile_picture} navigation={navigation} />,
    <Text style={[styles.greetingText]}>{'Hello \n' + userDetails.username} !</Text>,
    <AnouncementBox2 Announcement={Announcemnet} title="Announcement" icon="arrowright" />,
    <TopProduct name="Recently viewed" products={products} navigation={navigation} />,
    <HeadingBox title="Orders" display='none' textSize={dynamicFontSize * 2} functionality={demo} />,
    <View style={styles.ordercontainer}>
      <TouchableOpacity style={styles.myactivity}><Text style={styles.myactivitytext}>To Pay</Text></TouchableOpacity>
      <TouchableOpacity style={styles.myactivity} onPress={() => { navigation.navigate("Profile", { screen: "ReciveScreen" }) }}><Text style={styles.myactivitytext}>To Recive</Text></TouchableOpacity>
      <TouchableOpacity style={styles.myactivity}><Text style={styles.myactivitytext}>To Review</Text></TouchableOpacity>
    </View>,
    <StoryComponent reviews={reviews} />,
    <NewItems products={products} navigation={navigation} />,
    <MostPopular mostpopulars={mostpopulars} navigation={navigation} />,
    <CategoryComponent categories={categories} subcategories={subcategories} navigation={navigation} />,
    <FlashSale flashshales={flashshales} navigation={navigation} />,
    <TopProduct name="Top Product" products={products} navigation={navigation} />,
    <JustForYou products={products} navigation={navigation} title={"Just For You"} />
  ];

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} translucent={false} />
      
      <FlatList
        data={componentsArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}  
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={20}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Themes.color1,
  },
  ScrollViewContainer: {
    width: "100%",
    padding: 15,
  },
  greetingText: {
    fontSize: dynamicFontSize * 1.5,
    fontWeight: "bold",
    marginVertical: dynamicMargin * 0.25,
    marginHorizontal: dynamicMargin,
    color: Themes.color9,
  },
  ordercontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: dynamicMargin,
  },
  myactivity: {
    paddingHorizontal: dynamicPadding,
    paddingVertical: dynamicPadding * 0.4,
    backgroundColor: Themes.color3,
    borderRadius: dynamicBorderRadius,
    alignItems: "center",
    justifyContent: "center"
  },
  myactivitytext: {
    fontSize: dynamicFontSize * 1.5,
    color: Themes.color2,
  },

});

export default ProfileScreen;
