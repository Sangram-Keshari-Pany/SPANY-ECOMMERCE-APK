import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AnouncementBox from '../BoxComponents/AnouncementBox';
import HeadingBox from '../BoxComponents/HeadingBox';
import CartComponent from '../components/CartComponent';
import WishlistComponent from '../components/WishlistComponent';
import { useData, demo } from '../functionality/APICall';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicWidth, Mode, Themes } from '../Themes/color';
import AddressComponent from '../components/AddressComponent';
import DynamicComponent from '../components/DynamicComponent';
import LinearGradient from 'react-native-linear-gradient';
import NewItems from '../components/NewItems';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';

interface ShippingAddress {name: string; address: string; landmark: string; city: string; state: string; country: string; zipcode: string; phone: string; default: boolean;}
interface CartItem {product: { price: string }; quantity: number;}

const OrderScreen = ({ navigation }: any) => {
  const { cartitems, favorites, shippingaddress,products }: any = useData();

  const [totalprice, setTotalprice] = useState<number>(0);
  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [announcement, setAnnouncement] = useState<string>('Add your address');
  const [operation, setOperation] = useState<boolean>(false);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [dynamicpramps, setDynamicPramps] = useState<Record<string, any>>({});
  const [DynamicData, setDynamicData] = useState<any[]>([]);


  useEffect(() => {
    const total = cartitems.reduce((acc: number, cartitem: CartItem) => acc + Number(cartitem.product.price) * Number(cartitem.quantity), 0);
    setTotalprice(Math.round(total)); 
  }, [cartitems]);

  useEffect(() => {
    const defaultAddress = shippingaddress.find((shippingaddres: ShippingAddress) => shippingaddres.default);
    setAddress(defaultAddress || null);  
  }, [shippingaddress]);

  useEffect(() => {
    if (address !== null) {
      const addr = address;
      setAnnouncement(`${addr.name}, ${addr.address}, ${addr.landmark}, ${addr.city}, ${addr.state}, ${addr.country}, ${addr.zipcode}\n${addr.phone}`);
    }
  }, [address]);

  const dynamicComponent = (component: any, dynamicprops: any = {}, data: any[] = []) => {
    setComponent(() => component);
    setOperation(true);
    setDynamicPramps(dynamicprops);
    setDynamicData(data);
  };

  const handleCheckOut = () => {
    if (cartitems.length > 0) {
      navigation.navigate('Order', { screen: 'PaymentScreen', params: { totalprice, orderaddress: address, setOrdderAddress: setAddress } });
    }
  };

  const componentsArray = [
    <AnouncementBox Announcement={announcement} title="Shopping address" icon="pencil" Component={AddressComponent} dynamicComponent={dynamicComponent} address={address} setAddress={setAddress} fields="All" action={'post'}/>,
    <CartComponent orderitems={cartitems} navigation={navigation} />,
    <HeadingBox title="From Your Wishlist" display="none" textSize={dynamicFontSize *2} functionality={demo} />,
    <WishlistComponent favorites={favorites} navigation={navigation} key="OrderScreenWishlist" />,
    <NewItems key="newItems" products={products} navigation={navigation} />,

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
        ListHeaderComponent={() => (
          <HeadingBox title="Cart" display="none" textSize={dynamicFontSize * 3} functionality={demo} />
        )}
      />
      <Toast config={toastConfig} />
      {operation ? (
        <DynamicComponent Component={Component} DynamicData={DynamicData} dynamicpramps={dynamicpramps} setOperation={setOperation} />
      ) : (
        <View style={styles.PriceContainer}>
          <View style={styles.PriceBox}>
            <Text style={styles.PriceText} allowFontScaling={false}>
              ₹ {totalprice}
            </Text>
          </View>
          <View>
            <LinearGradient colors={Themes.gradient1} style={styles.addtocart} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} >
              <TouchableOpacity style={styles.addtocart} onPress={handleCheckOut}>
                <Text style={styles.AddtocartText}>Checkout</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Themes.color1,
  },
  PriceContainer: {
    flexDirection: 'row',
    backgroundColor: Themes.color1,
    marginVertical: dynamicMargin * 0.25,
    marginHorizontal:dynamicMargin,
    justifyContent: 'space-between',
  },
  PriceBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: Themes.color9,
  },
  PriceText: {
    fontWeight: 'bold',
    fontSize: dynamicFontSize * 1.5,
    color: Themes.color9,
  },
  addtocart: {
    height: dynamicFontSize * 3,
    width: dynamicWidth * 0.4,
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: Themes.color9,
  },
  AddtocartText: {
    color: Themes.color6,
    fontSize: dynamicFontSize * 1.5,
  },
});

export default OrderScreen;
