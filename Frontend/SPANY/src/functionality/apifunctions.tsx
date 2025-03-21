import Toast from "react-native-toast-message";
import { SPANYaxios } from "./APICall";

export async function FavoriteApiFunction(product: any, navigation: any, fetchdata: any) {
  try {
    const response = await SPANYaxios.post('/favorites/', product);
    if (response.status === 200 || response.status === 201) {
      Toast.show({
        type: response.data.status,
        text1: response.data.message,
      });
      await fetchdata("favorites")
    } else {
      console.error("Error: Unable to add product. Status code:", response.status);
      return { status: 'error', message: 'Something Wents Wrong' }
    }
  } catch (err) {
    navigation.navigate('Login')
    return { status: 'error', message: 'Something Wents Wrong' }
  }
}

export async function OrderApiFunction(cartdetails: any, navigation: any, fetchdata: any) {
  try {
    const response = await SPANYaxios.post('/orderitems/', cartdetails);
    if (response.status === 200 || response.status === 201) {
      Toast.show({
        type: response.data.status,
        text1: response.data.message,
        visibilityTime: 3500
      });
      fetchdata("cartitems")
      if (response.data.status==="success"){
        setTimeout(() => {navigation.navigate('Tab', { screen: 'Order' });}, 3500);
      }else{
        navigation.navigate('Tab', { screen: 'Order' });
      }
    } else {
      console.error("Error: Unable to add product. Status code:", response.status);
    }
  } catch (err) {
    navigation.navigate('Login')
    console.error("Error while making request:", err);
  }

}

export async function SavedCardApiFunction(cartdetails: any, fetchdata: any) {
  console.log(cartdetails);
  try {
    const response = await SPANYaxios.post('/payment_cards/', cartdetails);
    if (response.status === 200 || response.status === 201) {
      fetchdata("payment_cards")
    } else {
      console.error("Error: Unable to add product. Status code:", response.status);
    }
  } catch (err) {
    console.error("Error while making request:", err);
  }

}

export async function HandleAddress(address: any,setAddress:any,navigation:any,fetchdata:any) {
  try {
    const response = await SPANYaxios.post(`/shippingadress/`, address)
    if (response.status === 200 || response.status === 201) {
      console.log(response.data);
      setAddress(response.data)
      fetchdata('shippingaddress')
    } else {
      console.error("Error: Unable to add delivery. Status code:", response.status);
    }
  } catch (err) {
    navigation.navigate('Login')
    console.error("Error while making request in delivery:", err);
  }
}


export async function HandlePayment(address: any, orderData: any, navigation: any, fetchdata: any) {
  try {
    const paymentresponse = await SPANYaxios.put(`/orderview/${orderData.order}`, orderData)
    if (paymentresponse.status === 200 || paymentresponse.status === 201) {
      console.log(paymentresponse);
      fetchdata("cartitems")
      fetchdata("deliveritems")
      Toast.show({
        type: "success",
        text1: "Payment Sucessfull",
        visibilityTime: 3500
      });
      fetchdata("cartitems")
      setTimeout(() => {navigation.navigate("Profile", { screen: "ReciveScreen" })}, 3500);
    } else {
      console.error("Error: Unable to add delivery. Status code:", paymentresponse.status);
    }
  } catch (err) {  
    navigation.navigate('Login')
    console.error("Error while making request in delivery:", err);
  }
}



export async function SavedReviewApiFunction(Data: any, fetchdata: any) {
  try {
    const response = await SPANYaxios.post('/review/', Data);
    if (response.status === 200 || response.status === 201) {
      fetchdata("review")
      Toast.show({
        type: "success",
        text1: "Added",
        visibilityTime: 3500
      });
    } else {
      console.error("Error: Unable to add product. Status code:", response.status);
    }
  } catch (err) {
    console.error("Error while making request:", err);
  }
}

export async function UpdateAddress(address: any,setAddress:any,navigation:any,fetchdata:any) {  
  try {
    const response = await SPANYaxios.put(`/shippingadress/${address.id}`, address)
    if (response.status === 200 || response.status === 201) {
      console.log(response.data);
      setAddress(response.data)
      fetchdata('shippingaddress')
    } else {
      console.error("Error: Unable to add delivery. Status code:", response.status);
    }
  } catch (err) {
    navigation.navigate('Login')
    console.error("Error while making request in delivery:", err);
  }
}

export async function DeleteAddress(id:number,fetchdata:any) {  
  try {
    const response = await SPANYaxios.delete(`/shippingadress/${id}`)
    if (response.status === 200 || response.status === 201) {
      console.log(response.data);
      fetchdata('shippingaddress')
    } else {
      console.error("Error: Unable to add delivery. Status code:", response.status);
    }
  } catch (err) {
    console.error("Error while making request in delivery:", err);
  }
}

