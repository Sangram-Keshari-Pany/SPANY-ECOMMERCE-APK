import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomIcons from '../Themes/CustomIcons';
import { dynamicBorderRadius, dynamicMargin, dynamicPadding, Themes } from '../Themes/color';



const StarRating = ({ rating,size }:any) => {
  const fullStars = Math.floor(rating); 
  const hasHalfStar = (rating - fullStars) >= 0.5;
  const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0)); 

  return (
    <View style={styles.ratingContainer}>
      {[...Array(fullStars)].map((_, index) => (
      <CustomIcons key={`full-${index}`} name="star" size={size} color={Themes.color18} />
      ))}
      {hasHalfStar && <CustomIcons name="star-half-o" size={size} color={Themes.color18}  />}
      {[...Array(emptyStars)].map((_, index) => (
        <CustomIcons key={`empty-${index}`} name="star-o" size={size} color={Themes.color18}  />
      ))}
      <Text style={{fontSize:size*0.7,...styles.ratingText}}>{rating}/5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft:dynamicMargin*0.25,
    color:Themes.color9,
    backgroundColor:Themes.color3,
    paddingVertical:dynamicPadding*0.15,
    paddingHorizontal:dynamicPadding*0.25,
    borderRadius:dynamicBorderRadius*0.25,
  },
});

export default StarRating
