import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VoucherCard from '../BoxComponents/VoucherCard'

const VouchersComponent = ({setVoucherValue,setOperation,Data}:any) => {
  return (
    <View>
      <FlatList
          data={Data}
          keyExtractor={(item: any) => item.id}
          renderItem={(item) => <VoucherCard setVoucherValue={setVoucherValue}  setOperation={setOperation} Data={item.item} />}
      />
    </View>
  )
}
export default VouchersComponent

const styles = StyleSheet.create({})