import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, useColorScheme, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// SCREENS //
import TabNavigator from './src/navigators/TabNavigator';
import ProductScreen from './src/screens/ProductScreen';
import DataProvider from './src/functionality/APICall';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import LoginScreen from './src/screens/LoginScreen';
import PasswordScreen from './src/screens/PasswordScreen';
import PasswordRecoveryScreen from './src/screens/PasswordRecoveryScreen';
import PasswordRecoveryCode from './src/screens/PasswordRecoveryCode';
import SetupPasswordScreen from './src/screens/SetupPasswordScreen';
import HelloCardScreen from './src/screens/HelloCardScreen';
import IntroductionScreen from './src/screens/IntroductionScreen';
import { ColorMode } from './src/Themes/color';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <DataProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Introduction" component={IntroductionScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="Password" component={PasswordScreen} />
          <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
          <Stack.Screen name="PasswordRecoveryCode" component={PasswordRecoveryCode} />
          <Stack.Screen name="SetupPasswordScreen" component={SetupPasswordScreen} />
          <Stack.Screen name="HelloCardScreen" component={HelloCardScreen} />

          <Stack.Screen name="Tab" component={TabNavigator} />
          <Stack.Screen name="productscreen" component={ProductScreen} />
        </Stack.Navigator>
      </DataProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
