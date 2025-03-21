import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomIcons from '../Themes/CustomIcons';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicPadding, Themes, dynamicWidth, dynamicMargin, contentWidth } from '../Themes/color';

interface PaymentMethodProps {Component?: any;dynamicComponent?: any;cards?: any[];setSelectedCard?: any;selectedcard?: any;}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ Component, dynamicComponent, cards, setSelectedCard, selectedcard }) => {
  const title = "Payment Methods"
  function perform() {
    dynamicComponent(Component, { setSelectedCard, selectedcard, title }, cards);
  }
  return (
    <View style={styles.maincontainer}>
      <View style={styles.paymentContainer}>
        <Text style={styles.heading}>Payment Methods</Text>
      </View>
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={perform}
        accessibilityLabel="Select payment method"
      >
        <Text style={styles.paymentText}>Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  maincontainer: {
    marginHorizontal: dynamicMargin,
    marginVertical:dynamicMargin*0.25,
  },
  heading: {
    fontSize: dynamicFontSize * 2,
    fontWeight: "bold",
    color:Themes.color9
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical:dynamicMargin*0.5,
  },
  paymentButton: {
    height: contentWidth * 0.1,
    width: contentWidth * 0.2,
    borderRadius:dynamicBorderRadius*0.5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Themes.color10,
    backgroundColor: Themes.color3,
    alignItems:"center",
    justifyContent:"center",
  },
  paymentText: {
    color: Themes.color2,
    fontWeight: 'bold',
    fontSize: dynamicFontSize,
  },
  icon: {
    alignItems: 'center',
    padding: dynamicPadding * 0.4,
    backgroundColor: Themes.color2,
    borderRadius: "50%",
  },
});
