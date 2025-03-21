import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen'
import ReciveScreen from '../screens/ReciveScreen'
import Deliveredscreen from '../screens/DeliveredScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SettingsProfileScreen from '../screens/SettingsProfileScreen'
import SettingsAddCardScreen from '../screens/SettingsAddCardScreen'
import SettingsShippingAddressScreen from '../screens/SettingsShippingAddressScreen'
import SetttingsVouchersScreen from '../screens/SetttingsVouchersScreen'
import AboutScreen from '../screens/AboutScreen'

 const Stack=createNativeStackNavigator()
const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}></Stack.Screen>
        <Stack.Screen name="ReciveScreen" component={ReciveScreen}></Stack.Screen>
        <Stack.Screen name="DeliveredScreen" component={Deliveredscreen}></Stack.Screen>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen}></Stack.Screen>
        <Stack.Screen name="SettingsProfileScreen" component={SettingsProfileScreen}></Stack.Screen>
        <Stack.Screen name="SettingsAddCardScreen" component={SettingsAddCardScreen}></Stack.Screen>
        <Stack.Screen name="SettingsShippingAddressScreen" component={SettingsShippingAddressScreen}></Stack.Screen>
        <Stack.Screen name="SetttingsVouchersScreen" component={SetttingsVouchersScreen}></Stack.Screen>
        <Stack.Screen name="AboutScreen" component={AboutScreen}></Stack.Screen>
    </Stack.Navigator> 
  )
}

export default ProfileNavigator