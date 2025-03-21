import React, { useState, useCallback, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { demo, useData } from '../functionality/APICall';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, Mode, Themes } from '../Themes/color';
import CustomIcons from '../Themes/CustomIcons';
import AddressComponent from '../components/AddressComponent';
import HeadingBox from '../BoxComponents/HeadingBox';
import { PanResponder, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';
import { DeleteAddress, UpdateAddress } from '../functionality/apifunctions';

const RadioButton = ({ isSelected, onSelect }: any) => (
  <TouchableOpacity onPress={onSelect} >
    <View style={[styles.radioButton, isSelected && styles.selected]} />
  </TouchableOpacity>
);

const SettingsShippingAddressScreen = ({navigation}: any) => {
  const { shippingaddress,fetchdata } = useData();
  const [address, setAddress] = useState({});
  const [operation, setOperation] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [action,setAction]=useState('post')

  const handleSelectAddress = useCallback((address: any) => {
    address.default=true
    UpdateAddress(address,setAddress,navigation,fetchdata)
  }, [address]);

  const perform = useCallback((item: any) => {
    setAction('put')
    setAddress(item);
    setOperation(true);
  }, []);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (e, gestureState) => gestureState.dy !== 0,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          setOperation(false);
        }
        pan.setValue({ x: 0, y: 0 });
      },
    })
  ).current;

  // Function to render each item
  const renderComponents = ({ item }: any) => {
    return (
      <View style={styles.container}>
        <RadioButton isSelected={item.default} onSelect={() => handleSelectAddress(item)} />
        <TouchableOpacity style={styles.addressDetails} onPress={() => handleSelectAddress(item)}>
          <Text style={styles.addressText}>{item.name}</Text>
          <Text style={styles.addressText}>{item.address}, {item.landmark}, {item.city}</Text>
          <Text style={styles.addressText}>{item.zipcode}, {item.country}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOptionId(item.id)} >
          <CustomIcons
            name={'settings'}
            color={Themes.color9}
            size={dynamicIconSize * 0.5}
          />
        </TouchableOpacity>

        {selectedOptionId === item.id ? (
          <View>
            <TouchableOpacity onPress={() => perform(item)}>
              <Text style={{ color: Themes.color9 }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{DeleteAddress(item.id,fetchdata)}}>
              <Text style={{ color: Themes.color14 }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.mainBox}>
      <StatusBar barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} translucent={false} />
      <HeadingBox title="Settings" display="none" textSize={dynamicFontSize * 3} functionality={demo} />
      <HeadingBox title="Shipping Address" display="none" textSize={dynamicFontSize * 2} functionality={demo} />

      <FlatList
        data={shippingaddress}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderComponents}
      />

      {operation ? (
        <View style={styles.editadress} {...panResponder.panHandlers}>
          <AddressComponent Data={address} setAddress={setAddress} setOperation={setOperation} navigation={navigation} action={action}/>
          <Toast config={toastConfig} />
        </View>
      ) : (
        <TouchableOpacity onPress={() => setOperation(true)}>
          <LinearGradient colors={Themes.gradient1} style={styles.addAddressButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
            <Text style={styles.addAddressText}>ADD New Address</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: Themes.color1
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Themes.color7,
    alignItems: 'center',
    marginHorizontal: dynamicMargin,
    marginVertical: dynamicMargin * 0.25
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 4,
    backgroundColor: Themes.color7,
    borderColor: Themes.color10,
    padding: dynamicPadding * 0.25,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 12,
  },
  selected: {
    backgroundColor: Themes.color2
  },
  addressDetails: {
    flex: 1, marginHorizontal: dynamicMargin * 0.5
  },
  addressText: {
    fontSize: dynamicFontSize, color: Themes.color9
  },
  editadress: {
    marginHorizontal: dynamicMargin
  },
  addAddressButton: {
    height: dynamicFontSize * 3.5,
    backgroundColor: '#d95600',
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: dynamicMargin,
    marginVertical: dynamicMargin * 0.5
  },
  addAddressText: {
    fontSize: dynamicFontSize,
    color: Themes.color6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SettingsShippingAddressScreen;
