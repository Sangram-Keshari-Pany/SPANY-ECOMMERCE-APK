import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { PasswordRecoveryScreenSvg } from '../Themes/SVGIcons';
import Toast from 'react-native-toast-message';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, Mode, Themes } from '../Themes/color';
import { toastConfig } from '../Themes/CustomTost';
import { useData } from '../functionality/APICall';
import StopWatchBox from '../BoxComponents/StopWatchBox';
import JustForYou from '../components/JustForYou';
import SlidingRow from '../components/SlidingRow';
import MostPopular from '../components/MostPopular';
import NewItems from '../components/NewItems';
import { flashSaleProducts,  } from '../functionality/Programmeing';
import LinearGradient from 'react-native-linear-gradient';

const FlashshaleScreen = ({ navigation }: any) => {
  const { products, flashshales }: any = useData();
  const [selectedDiscount, setSelectedDiscount] = useState('All');
  const [selectedFlashshale, setSelectedFlashshale] = useState(null);

  const discountOptions = ['All', '10%', '20%', '30%', '40%', '50%'];

  useEffect(() => {
    if (flashshales && flashshales.length > 0) {
      const latestFlashshale: any = flashshales.reduce((latest, current) => {
        return new Date(current.end_time) > new Date(latest.end_time) ? current : latest;
      });
      setSelectedFlashshale(latestFlashshale);
    }
  }, [flashshales]);

  const filteredProducts = useMemo(() => flashSaleProducts(selectedDiscount, flashshales), [selectedDiscount, flashshales]);
  const mostpopulars = useMemo(() => [...products].sort((a, b) => b.like - a.like).slice(0, 10), [products]);

  const components = [
    <JustForYou key="justForYou" products={filteredProducts} navigation={navigation} title={`${selectedDiscount} Discount`} />,
    <SlidingRow key="slidingRow" navigation={navigation}/>,
    <NewItems key="newItems" products={filteredProducts} navigation={navigation} />,
    <MostPopular key="mostPopular" mostpopulars={mostpopulars} navigation={navigation} />
  ];

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent={true} />
      <View style={styles.svgContainer}>
        <PasswordRecoveryScreenSvg />
      </View>
      <Toast config={toastConfig} />
      <View style={styles.box1}>
        <View style={styles.box2}>
          <Text style={styles.flashshaletext}>Flash Shale</Text>
          <Text style={styles.flashshaletext2}>Choose Your Discount</Text>
        </View>
        <View style={styles.box3}>
          {selectedFlashshale && <StopWatchBox flashshales={selectedFlashshale} />}
        </View>
      </View>

      <View style={styles.filterContainer}>
        {discountOptions.map((discount) => (
          <TouchableOpacity key={discount} onPress={() => setSelectedDiscount(discount)}>
            <LinearGradient
              colors={selectedDiscount === discount ? Themes.gradient1 : Themes.gradient0}
              style={styles.filterButton}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.filterText, selectedDiscount === discount && styles.activeText]}>{discount}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={components}
        renderItem={({ item }) => item}  
        keyExtractor={(item, index) => index.toString()} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Themes.color1,
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box1: {
    marginTop: dynamicMargin,
    height: dynamicWidth * 0.3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dynamicPadding,
  },
  box2: {
    width: '60%',
  },
  flashshaletext: {
    fontSize: dynamicFontSize * 3,
    color: Themes.color9,
    fontWeight: 'bold',
  },
  flashshaletext2: {
    fontSize: dynamicFontSize * 1.5,
    color: Themes.color9,
    fontWeight: '400',
  },
  box3: {
    width: '40%',
    height: '40%',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Themes.color3,
    width: dynamicWidth,
    borderRadius: dynamicBorderRadius * 0.5,
    marginHorizontal: dynamicMargin,
    marginVertical: dynamicMargin * 0.5,
  },
  filterButton: {
    padding: dynamicPadding * 0.5,
    borderRadius: dynamicBorderRadius * 0.5,
  },
  filterText: {
    color: Themes.color9,
    fontWeight: 'bold',
  },
  activeText: {
    color: Themes.color6,
  },
});

export default FlashshaleScreen;
