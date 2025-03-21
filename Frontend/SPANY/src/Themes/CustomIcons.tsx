import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const CustomIcons = ({name,color,size=45}:any) => {
  const Icons:any={
    'heart':<AntDesign name='heart' size={size} color={color}/>,
    'doubleright':<AntDesign name='doubleright' size={size} color={color}/>,
    'right':<AntDesign name='right' size={size} color={color}/>,
    'doubleleft':<AntDesign name='doubleleft' size={size} color={color}/>,
    'warning':<AntDesign name='warning' size={size} color={color}/>,
    'camera':<SimpleLineIcons  name="camera" size={size} color={color}/>,
    'arrow-u-left-top':<MaterialCommunityIcons name='arrow-u-left-top' size={size} color={color}/>,
    'arrowright':<AntDesign name='arrowright' size={size} color={color}/>,
    'pencil':<MaterialCommunityIcons name='pencil' size={size} color={color}/>,
    'checkbox-marked-circle-outline':<MaterialCommunityIcons name='checkbox-marked-circle-outline' size={size} color={color}/>,
    'checkbox-marked-circle':<MaterialCommunityIcons name='checkbox-marked-circle' size={size} color={color}/>,
    'truck-delivery':<MaterialCommunityIcons name='truck-delivery' size={size} color={color}/>,
    'checkbox-blank-circle-outline':<MaterialCommunityIcons name='checkbox-blank-circle-outline' size={size} color={color}/>,
    'expand-more':<MaterialIcons name='expand-more' size={size} color={color}/>,
    'error-outline':<MaterialIcons name='error-outline' size={size} color={color}/>,
    'expand-less':<MaterialIcons name='expand-less' size={size} color={color}/>,
    'credit-card':<Entypo name='credit-card' size={size} color={color}/>,
    'menu':<Entypo name='menu' size={size} color={color}/>,
    'settings':<Feather name='settings'  size={size} color={color}/>,
    'dash':<Octicons name='dash' size={size} color={color}/>,      
    'dot-fill':<Octicons name='dot-fill' size={size} color={color}/> ,
    'share-outline':<MaterialCommunityIcons name='share-outline' size={size}color={color}/>,
    'stopwatch':<Entypo name='stopwatch' size={size} color={color}/>,
    'star':<FontAwesome name='star' size={size} color={color}/>,
    'star-half-o':<FontAwesome name='star-half-o' size={size} color={color}/>,
    'star-o':<FontAwesome name='star-o' size={size} color={color}/>,
    'trash-o':<FontAwesome name='trash-o' size={size} color={color}/>,
    'hearto':<AntDesign name='hearto' size={size} color={color}/>,
    'shoppingcart':<AntDesign name='shoppingcart' size={size} color={color}/>,





    
    'pluscircleo':<AntDesign name='pluscircleo' size={size} color={color}/>,
    'minuscircleo':<AntDesign name='minuscircleo' size={size} color={color}/>,
    'arrow-with-circle-down':<Entypo name='arrow-with-circle-down' size={size} color="blue"/>,
    'arrow-with-circle-up':<Entypo name='arrow-with-circle-up' size={size} color="blue"/>,
  
  }
  return (
    <View style={{height:size,width:size,...styles.FirstView4}}>{Icons[name]}</View>
  )
}

const styles = StyleSheet.create({
    FirstView4:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"50%"
    },
})

export default CustomIcons
