import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomIcons from '../Themes/CustomIcons';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, dynamicMargin,dynamicWidth,Themes } from '../Themes/color';
import { useData } from '../functionality/APICall';
import StopWatchBox from '../BoxComponents/StopWatchBox';

const ProductPrice = ({ productData }: any) => {
  const { flashshales }: any = useData();

  const [selectedFlashshale, setSelectedFlashshale] = useState<any>(null);

  useEffect(() => {
    if (flashshales && productData && productData.id) {
      const selected = flashshales.find((flashshale: any) => flashshale.product.id === productData.id);
      setSelectedFlashshale(selected || null);
    }
  }, [flashshales, productData]);

  return (
    <View style={styles.mainblock}>
      <View style={styles.priceblock}>
        <View style={styles.block1}>
          <View style={styles.block4}>
            <Text style={styles.price}>₹ {Math.round(productData.price)}</Text>
          </View>
          <View style={styles.block5}>
            {selectedFlashshale ? (
              <StopWatchBox flashshales={selectedFlashshale} />
            ) : (
              <Text></Text>
            )}
          </View>
          <TouchableOpacity style={styles.block6}>
            <CustomIcons color={Themes.color7} name="share-outline" size={dynamicIconSize * 0.7} />
          </TouchableOpacity>
        </View>
        <View style={styles.block2}>
          <Text style={styles.specialprice}>{productData.cost_price}</Text>
          <Text style={styles.specialprice2}>{Math.round(productData.discount)}% off</Text>
        </View>
      </View>
      <View>
        <Text style={styles.specialname}>{productData.product_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainblock: {
    flex: 1,
    marginHorizontal: dynamicMargin,
    marginVertical: dynamicMargin * 0.5,
  },
  priceblock: {
    height: dynamicWidth * 0.2,
    width: dynamicWidth,
  },
  block1: {
    height: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block2: {
    height: '40%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  block4: {
    height: '100%',
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  block5: {
    height: '100%',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  block6: {
    padding: 5,
    aspectRatio: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Themes.color5,
  },
  price: {
    fontWeight: 'bold',
    color: Themes.color9,
    fontSize: dynamicFontSize * 1.8,
  },
  specialprice: {
    fontSize: dynamicFontSize * 1.2,
    textDecorationLine: 'line-through',
    color: Themes.color14,
    fontWeight: 'bold',
  },
  specialprice2: {
    fontSize: dynamicFontSize,
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: Themes.color6,
    backgroundColor: 'green',
    textAlign: 'center',
    borderRadius: dynamicBorderRadius * 0.25,
    marginLeft: dynamicMargin * 0.5,
    fontWeight: 'bold',
  },
  specialname: {
    fontSize: dynamicFontSize*1.5,
    fontWeight: 'bold',
    color: Themes.color9,
  },
});

export default ProductPrice;
