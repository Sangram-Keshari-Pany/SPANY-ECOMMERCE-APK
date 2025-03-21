import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin, dynamicPadding, dynamicWidth, Themes } from "../Themes/color";
import Toast from 'react-native-toast-message'; // Optional: For toast feedback
import { toastConfig } from "../Themes/CustomTost";
import LinearGradient from "react-native-linear-gradient";

interface VoucherCardProps {
  setVoucherValue: (voucherCode: string) => void;
  setOperation: (operation: boolean) => void;
  Data: { expiration_date: string; offer_description: string; sub_description: string; voucher_code: string } | null;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ setVoucherValue, setOperation, Data }) => {
  const handleApplyVoucher = () => {
    if (Data?.voucher_code) {
      setVoucherValue(Data);
      setOperation(false);
      Toast.show({
        type: 'success',
        text1: 'Voucher Applied',
        text2: `You applied the voucher: ${Data.voucher_code}`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Voucher code is not available.',
      });
    }
  };

  return (
    <>
      {Data && Object.keys(Data).length > 0 ? (
        <View style={styles.voucherContainer}>
          <View style={styles.cutoutLeft} />
          <View style={styles.voucherContent}>
            <View style={styles.voucherHeader}>
              <Text style={styles.voucherTitle}>Voucher</Text>
              <View style={styles.expiryBadge}>
                <Text style={styles.expiryText}>Valid Until {Data?.expiration_date ?? "N/A"}</Text>
              </View>
            </View>
            <View style={styles.voucherBody}>
              <View style={styles.voucherDetails}>
                <Text style={styles.voucherIcon}>🛍️</Text>
                <View>
                  <Text style={styles.offerTitle}>{Data?.offer_description ?? "No offer description"}</Text>
                  <Text style={styles.offerDescription}>{Data?.sub_description ?? "No details available"}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyVoucher}>
              <LinearGradient colors={Themes.gradient1} style={styles.applyButtongradient} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
                <Text style={styles.applyButtonText}>Apply</Text>
              </LinearGradient>
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.cutoutRight} />
        </View>
      ) : (
        <View style={styles.emptyvoucher}>
          <Text style={styles.emptyvoucherText}>No Active Vouchers</Text>
        </View>
      )}
      <Toast config={toastConfig} />
    </>
  );
};

const styles = StyleSheet.create({
  voucherContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: dynamicWidth * 0.3,
    width: "100%",
    overflow: "hidden",
    marginVertical:dynamicMargin*0.25

  },
  voucherContent: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: dynamicPadding*0.25,
    borderRadius: dynamicBorderRadius*0.5,
    borderWidth: 2,
    borderColor: Themes.color2,
  },
  voucherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingVertical: dynamicPadding * 0.2,
    paddingHorizontal: dynamicPadding * 0.2,
    borderStyle: "dashed",
    borderColor: Themes.color2,
  },
  voucherTitle: {
    fontSize: dynamicFontSize,
    fontWeight: "bold",
    color: Themes.color2,
  },
  expiryBadge: {
    backgroundColor:Themes.color3,
    borderRadius: dynamicBorderRadius,
    paddingHorizontal:dynamicPadding*0.5,
    paddingVertical: dynamicPadding*0.20,
  },
  expiryText: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
  },
  voucherBody: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  voucherDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  voucherIcon: {
    fontSize:dynamicIconSize,
    marginRight:dynamicMargin*0.25,
  },
  offerTitle: {
    fontSize: dynamicFontSize,
    fontWeight: "bold",
    color: Themes.color9,
  },
  offerDescription: {
    fontSize: dynamicFontSize*0.8,
    color: Themes.color9,
  },
  applyButton: {
    height: "55%",
    width: "25%",
    borderRadius: dynamicBorderRadius*0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtongradient:{
    height: "100%",
    width: "100%",
    backgroundColor: Themes.color2,
    borderRadius: dynamicBorderRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color:Themes.color6,
    fontWeight: "400",
    fontSize: dynamicFontSize,
  },
  cutoutLeft: {
    width: dynamicWidth * 0.08,
    height: dynamicWidth * 0.08,
    borderRadius: dynamicWidth * 0.04,
    backgroundColor: Themes.color1,
    position: "absolute",
    zIndex: 1,
    left: "-4%",
    top: "35%",
    borderWidth: 2,
    borderColor: Themes.color2,
  },
  cutoutRight: {
    width: dynamicWidth * 0.08,
    height: dynamicWidth * 0.08,
    borderRadius: dynamicWidth * 0.04,
    backgroundColor: Themes.color1,
    position: "absolute",
    zIndex: 1,
    right: "-4%",
    top: "35%",
    borderWidth: 2,
    borderColor: Themes.color2,
  },
});

export default VoucherCard;
