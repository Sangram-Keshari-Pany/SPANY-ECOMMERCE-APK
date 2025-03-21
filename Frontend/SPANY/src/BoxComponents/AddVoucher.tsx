import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicWidth, Themes } from '../Themes/color';

interface AddVoucherProps {
  Component: React.ComponentType<any>;
  dynamicComponent: (component: React.ComponentType<any>, props: any, vouchers: any[]) => void;
  setDiscountApplied: (value: object) => void;
  vouchers: any[];
  totalitems: number;
}

const AddVoucher: React.FC<AddVoucherProps> = ({ Component, dynamicComponent, setDiscountApplied, vouchers, totalitems }) => {
  const [vouchervalue, setVoucherValue]: any = useState({});
  const title = "Active Vouchers";

  useEffect(() => {
    setDiscountApplied(vouchervalue);
  }, [vouchervalue, setDiscountApplied]);

  const voucherText = useMemo(() => {
    return Object.keys(vouchervalue).length > 0 ? vouchervalue.voucher_code : 'Add Voucher';
  }, [vouchervalue]);

  const perform = useCallback(() => {
    if (Component && dynamicComponent && Array.isArray(vouchers)) {
      dynamicComponent(Component, { setVoucherValue, title }, vouchers);
    }
  }, [Component, dynamicComponent, title, vouchers]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.itemsContainer}>
        <Text style={styles.items}>Items</Text>
        <Text style={styles.itemCount}>{totalitems}</Text>
      </View>
      <TouchableOpacity style={styles.voucherButton} onPress={perform}>
        <Text style={styles.voucherText}>{voucherText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddVoucher;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: dynamicMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  items: {
    fontSize: dynamicFontSize * 2,
    fontWeight: "bold",
    color: Themes.color9,
  },
  itemCount: {
    height: dynamicWidth * 0.1,
    width: dynamicWidth * 0.1,
    backgroundColor: Themes.color3,
    color: Themes.color9,
    borderRadius: 50,
    marginLeft: dynamicMargin * 0.5,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: dynamicFontSize * 1.5,
  },
  voucherButton: {
    height: dynamicFontSize * 2.5,
    width: dynamicWidth * 0.3,
    borderWidth: 2,
    borderColor: Themes.color2,
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voucherText: {
    color: Themes.color2,
    fontSize: dynamicFontSize,
  },
});
