import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { demo, useData } from '../functionality/APICall';
import ToRecive from '../BoxComponents/ToRecive';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, Themes } from '../Themes/color';
import ProgressBarBox from '../BoxComponents/ProgressBarBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { useRoute } from '@react-navigation/native';

const Deliveredscreen = ({ navigation }: any) => {
  const { params }: any = useRoute();
  const { order } = params; 
  const { shippingupdate, userDetails }: any = useData();

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [progressbar, setProgressBar] = useState(0);

  useEffect(() => {
    const result = shippingupdate.filter(item => item.order === order);
    setFilteredData(result);
  }, [shippingupdate, order]);

  useEffect(() => {
    let newProgressBar = progressbar; 
    filteredData.forEach((data) => {
      if (data.status === 'Pending' || data.status === 'Confirmed') {
        newProgressBar = Math.max(newProgressBar, 0); 
      }
      if (data.status === 'Shipped') {
        newProgressBar = Math.max(newProgressBar, 1); 
      }
      if (data.status === 'Out for Delivery') {
        newProgressBar = Math.max(newProgressBar, 2); 
      }
      if (data.status === 'Delivered') {
        newProgressBar = Math.max(newProgressBar, 3); 
      }
    });
    setProgressBar(newProgressBar);
  }, [filteredData, progressbar]);

  const renderTimelineItem = ({ item }: any) => (
    <View style={styles.timelineItem}>
      <View style={styles.timelineRow}>
        <Text style={styles.status}>{item.status}</Text>
        <Text style={styles.date}>{item.timestamp}</Text>
      </View>
      <Text style={styles.description}>{item.location}</Text>
    </View>
  );

  const componentsArray = [
    <View key="header" >
      <ToRecive navigation={navigation} imageurl={userDetails.profile_picture} />
      <View >
        <ProgressBarBox progress={progressbar} />
      </View>
      <View style={styles.trackingBox}>
        <Text style={styles.trackingLabel}>Tracking Number</Text>
        <Text style={styles.trackingNumber}>SPANY-92927839300763731</Text>
      </View>
    </View>,

    <FlatList
      key="timeline"
      data={filteredData}
      keyExtractor={(item, index) => index.toString()} 
      contentContainerStyle={styles.flatListContainer}
      renderItem={renderTimelineItem}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
    />,

    <View key="footer" style={styles.buttonBox}>
      <TouchableOpacity style={styles.button}><Text style={styles.buttontext}>Cancel</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text style={styles.buttontext}>Need Help?</Text></TouchableOpacity>
    </View>,

    // Shipping Details Section
    <HeadingBox
      key="shippingDetails"
      title="Shipping Details"
      textSize={dynamicFontSize * 1.5}
      display="none"
      functionality={demo}
    />,

    // Address Section
    <View key="address" style={styles.addressBox}>
      <Text style={styles.Name}>SANGRAM KESHARI PANY</Text>
      <Text style={styles.addressDetails}>Address with landmark city</Text>
      <Text style={styles.addressDetails}>State with 789456</Text>
      <Text style={styles.addressDetails}>Country</Text>
      <Text style={styles.addressDetails}>Phone Number-7978359909</Text>
    </View>
  ];

  return (
    <FlatList
      data={componentsArray}
      keyExtractor={(item, index) => index.toString()} 
      renderItem={({ item }) => item} 
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  trackingBox: {
    backgroundColor: Themes.color3,
    borderRadius: dynamicBorderRadius * 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: dynamicMargin * 0.5,
    paddingVertical: dynamicPadding * 0.25,
    marginHorizontal: dynamicMargin,

  },
  trackingLabel: {
    fontWeight: 'bold',
    color: Themes.color9,
  },
  trackingNumber: { 
    flex: 1, 
    marginLeft: dynamicMargin*0.25,
    color:Themes.color9
   },
  timelineItem: {
    marginVertical:dynamicMargin*0.25,
    borderBottomWidth:dynamicBorderRadius*0.01,
    marginHorizontal: dynamicMargin,
    borderColor:Themes.color7

  },
  timelineRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: dynamicMargin*0.25
   },
  status: { 
    fontWeight: 'bold', 
    fontSize: dynamicFontSize*1.2 ,
    color:Themes.color9,
  },
  date: { 
    fontSize: dynamicFontSize, 
    color: Themes.color7
  },
  description: { 
    fontSize: dynamicFontSize*1.2, 
    color: Themes.color7 
   },
  flatListContainer: {
    backgroundColor: Themes.color1,
    flex: 1,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: dynamicMargin,

  },
  button: {
    borderWidth: 0.5,
    paddingHorizontal: dynamicPadding,
    paddingVertical: dynamicPadding * 0.25,
    borderRadius: dynamicBorderRadius,
    borderColor:Themes.color9
  },
  buttontext: {
    color:Themes.color9
  },
  addressBox: {
    borderRadius: dynamicBorderRadius,
    marginHorizontal: dynamicMargin,
    marginVertical: dynamicMargin * 0.25,
  },
  addressBoxText: {
    borderRadius: dynamicBorderRadius,
    marginHorizontal: dynamicMargin,
    marginVertical: dynamicMargin * 0.25,
  },
  Name: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
  },
  addressDetails: {
    fontSize: dynamicFontSize,
    color: Themes.color7 
  },
});

export default Deliveredscreen;
