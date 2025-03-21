import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AnouncementBox from '../BoxComponents/AnouncementBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import { useData, demo } from '../functionality/APICall';
import { dynamicBorderRadius, dynamicFontSize, dynamicPadding, dynamicWidth, Mode, Themes } from '../Themes/color';
import PaymentItemsBox from '../BoxComponents/PaymentItemsBox';
import AddVoucher from '../BoxComponents/AddVoucher';
import ShippingOptionBox from '../BoxComponents/ShippingOptionBox';
import PaymentMethod from '../BoxComponents/PaymentMethod';
import { HandlePayment } from '../functionality/apifunctions';
import DynamicComponent from '../components/DynamicComponent';
import VouchersComponent from '../components/VouchersComponent';
import CardsComponent from '../components/CardsComponent';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';
import AddressComponent from '../components/AddressComponent';
import { generateUniqueId } from '../functionality/Programmeing';

interface Address { id: any; name: string; address: string; landmark: string; city: string; state: string; country: string; zipcode: string; default: boolean; phone: string; gmail: string; }

const PaymentScreen = ({ navigation, route }: any) => {
  const { userDetails, cartitems, vouchers, savedcards, fetchdata }: any = useData();
  const { totalprice, orderaddress, setOrdderAddress }: any = route.params;

  const [address, setAddress] = useState<Address | null>(orderaddress);
  const [total, setTotal] = useState(totalprice);
  const [announcement1, setAnnouncement1] = useState<string>('');
  const [announcement2, setAnnouncement2] = useState<string>('');
  const [operation, setOperation] = useState<boolean>(false);
  const [Component, setComponent] = useState<any>(null);
  const [dynamicpramps, setDynamicPramps] = useState<any>({});
  const [DynamicData, setDynamicData] = useState<any[]>([]);
  const [selectedcard, setSelectedCard] = useState<object>({});
  const [discountapplied, setDiscountApplied] = useState<any>({});
  const [shippingvalue, setShippingValue] = useState<number>(0);

  const dynamicComponent = (component: any, dynamicprops: any = {}, data: any[] = []) => {
    setComponent(() => component);
    setOperation(true);
    setDynamicPramps(dynamicprops);
    setDynamicData(data);
  };

  

  const handlePayment = () => {
    console.log(cartitems[0]?.order);

    try {
      const orderData = {
        order: cartitems[0]?.order.id,
        complete: true,
        voucher: discountapplied?.id || null,
        shipping_address: address?.id || null,
        order_id: generateUniqueId(),
      };

      HandlePayment(address, orderData, navigation, fetchdata);

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Payment Successful!',
        text2: 'Your order has been placed successfully.',
      });
    } catch (error) {
      console.log('Error fetching order ID');
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Payment Failed!',
        text2: 'There was an issue with your payment. Please try again.',
      });
    }
  };

  useEffect(() => {
    if (Object.keys(discountapplied).length > 0) {
      if (discountapplied.discount_type === 'percentage') {
        setTotal(totalprice - (totalprice * discountapplied.discount_amount) / 100);
      } else if (discountapplied.discount_type === 'flat') {
        setTotal(totalprice - discountapplied.discount_amount);
      }
    }
  }, [discountapplied]);

  useEffect(() => {
    setTotal(totalprice + shippingvalue);
  }, [shippingvalue]);

  useEffect(() => {
    setOrdderAddress(address);
    setAnnouncement1(`${address?.name || 'Add your contact details'}\n${address?.phone || ''}`);
    setAnnouncement2(`${address?.address || 'Add your address'}, ${address?.landmark || ''} ,${address?.city || ''},${address?.state || ''},${address?.country || ''},${address?.zipcode || ''}`);
  }, [address]);

  const renderComponents = [
    <HeadingBox key="heading" title="Payment" display="none" textSize={dynamicFontSize * 3} functionality={demo} />,
    <AnouncementBox key="announcement1" Announcement={announcement1} title="Contact Information" icon="pencil" Component={AddressComponent} dynamicComponent={dynamicComponent} address={address} setAddress={setAddress} fields="Contact" action={'post'}/>,
    <AnouncementBox key="announcement2" Announcement={announcement2} title="Shopping address" icon="pencil" Component={AddressComponent} dynamicComponent={dynamicComponent} address={address} setAddress={setAddress} fields="Address" action={'post'} />,
    <AddVoucher key="voucher" Component={VouchersComponent} dynamicComponent={dynamicComponent} setDiscountApplied={setDiscountApplied} vouchers={vouchers} totalitems={cartitems.length} />,
    <View style={styles.paymentItemcontainer}><FlatList key="cartItems" scrollEnabled={false} data={cartitems} keyExtractor={(item) => item.id} renderItem={({ item }) => <PaymentItemsBox item={item} />} contentContainerStyle={styles.paymentItemcontainer} /></View>,
    <ShippingOptionBox key="shippingOption" shippingvalue={shippingvalue} setShippingValue={setShippingValue} total={total} />,
    <PaymentMethod key="paymentMethod" Component={CardsComponent} dynamicComponent={dynamicComponent} cards={savedcards} selectedcard={selectedcard} setSelectedCard={setSelectedCard} />,
  ];

  return (
    <View style={[styles.ScreenContainer]}>
      <StatusBar barStyle={Mode ? 'light-content' : 'dark-content'} backgroundColor={Themes.color1} translucent={false} />

      <FlatList
        data={renderComponents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
      />
      <Toast config={toastConfig} />
      
      <View style={styles.PriceContainer}>
        <View style={styles.PriceBox}>
          <Text style={[styles.PriceText]} allowFontScaling={false}>
            ₹ {total}
          </Text>
        </View>
        <View style={styles.PriceBox}>
          <TouchableOpacity style={styles.payment} onPress={handlePayment}>
            <Text style={styles.paymentText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {operation && (
        <DynamicComponent Component={Component} DynamicData={DynamicData} dynamicpramps={dynamicpramps} setOperation={setOperation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Themes.color1,
  },
  paymentItemcontainer:{
    minHeight:dynamicWidth*0.77
  },
  PriceContainer: {
    flexDirection: 'row',
    padding: dynamicPadding * 0.5,
    backgroundColor: Themes.color1,
    justifyContent: 'space-between',
  },
  PriceBox: {
    height: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: Themes.color9,
  },
  PriceText: {
    fontWeight: 'bold',
    fontSize: dynamicFontSize * 1.5,
    color: Themes.color9,
  },
  payment: {
    height: dynamicFontSize * 3,
    width: dynamicWidth * 0.3,
    backgroundColor: Themes.color12,
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentText: {
    color: Themes.color6,
    fontSize: dynamicFontSize * 1.5,
  },
});

export default PaymentScreen;
