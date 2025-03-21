import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FavoriteScreen from '../screens/FavoriteScreen'
import AppScreen from '../screens/AppScreen'

import Icon from 'react-native-vector-icons/AntDesign';
import { Themes } from '../Themes/color'
import HomeNavigators from './HomeNavigators'
import OrderNavigator from './OrderNavigator'
import OrderScreen from '../screens/OrderScreen'
import ProfileNavigator from './ProfileNavigator'

const Tab=createBottomTabNavigator()

const TabNavigator = () => {
  return (
      <Tab.Navigator 
      screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown:false,
        tabBarShowLabel:true,
        tabBarStyle:styles.tabBarStyle,
        tabBarLabelStyle:styles.tabBarLabelStyle,
        tabBarActiveTintColor: Themes.color2,
        tabBarInactiveTintColor: 'gray',        
      }}
      >
          <Tab.Screen name="Home" component={HomeNavigators} 
          options={{headerShown: false,
                    tabBarIcon:({focused,color,size})=>(
                      <Icon name="home" size={size} color={focused?Themes.color2:color}  />
                    )
          }}/>
          <Tab.Screen name="Favorite" component={FavoriteScreen}
          options={{headerShown: false,
                    tabBarIcon:({focused,color,size})=>(
                      <Icon name="hearto" size={size} color={focused?Themes.color2:color}  />
                    )
          }}/>
          <Tab.Screen name="App" component={AppScreen} 
          options={{headerShown: false,
                    tabBarIcon:({focused,color,size})=>(
                      <Icon name="appstore-o" size={size} color={focused?Themes.color2:color}/>
                    )
          }}/>
          <Tab.Screen name="Order" component={OrderNavigator}
          options={{headerShown: false,
                    tabBarIcon:({focused,color,size})=>(
                      <Icon name="shoppingcart" size={size} color={focused?Themes.color2:color}/>
                    )
          }}/>
          <Tab.Screen name="Profile" component={ProfileNavigator} 
          options={{headerShown: false,
                    tabBarIcon:({focused,color,size})=>(
                      <Icon name="user" size={size} color={focused?Themes.color2:color}/>
                    )
          }}/>
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: { 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor:Themes.color1
  },
  tabBarIconStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    fontWeight:"bold",
  },
  tabBarLabelStyle: {
    textAlign: 'center', 
  }
})
export default TabNavigator

