import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrderScreen from '../screens/OrderScreen'
import PaymentScreen from '../screens/PaymentScreen'
 const Stack=createNativeStackNavigator()
const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OrdeerScreen" component={OrderScreen}></Stack.Screen>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default OrderNavigator

