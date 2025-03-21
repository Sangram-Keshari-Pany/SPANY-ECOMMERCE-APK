import { StyleSheet, View, useWindowDimensions } from 'react-native';
import React from 'react';
import {  dynamicPadding, dynamicWidth, Textcolor, Themes } from '../Themes/color';
import { EmptyCart, EmptyWishlist } from '../Themes/SVGIcons';

const WishlistEmpty = ({svgname="EmptyCart"}) => {
  const AllSvg:any={
    EmptyWishlist:<EmptyWishlist width={dynamicWidth*0.2} height={dynamicWidth*0.2}/>,
    EmptyCart:<EmptyCart width={dynamicWidth*0.2} height={dynamicWidth*0.2}/>
  }
  return (
    <View style={styles.Wishlistempty}>
        <View style={styles.Wishlistemptybox}>
          {AllSvg[svgname]}
        </View>
    </View>
  );
};

export default WishlistEmpty;

const styles = StyleSheet.create({
  Wishlistempty: {
    height:dynamicWidth*0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wishlistemptybox:{
    padding:dynamicPadding*2,  
    borderRadius:"50%",     
    backgroundColor:Themes.color1,
    shadowColor:Themes.color4,
    shadowOffset: { width:0, height:2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:5,
    borderWidth:1,
    borderColor:Themes.color10,
  }
 
});
