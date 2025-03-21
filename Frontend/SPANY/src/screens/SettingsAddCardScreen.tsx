import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeadingBox from '../BoxComponents/HeadingBox'
import { dynamicFontSize, dynamicMargin, Themes } from '../Themes/color'
import { demo, useData } from '../functionality/APICall'
import CardsComponent from '../components/CardsComponent'

const SettingsAddCardScreen = () => {
  const {savedcards }: any = useData();
  const [selectedcard, setSelectedCard] = useState(savedcards[0]);
  const [operation, setOperation] = useState(true);  
  return (
    <View style={styles.mainbox}>
      <HeadingBox title={"Settings"} display='none' textSize={dynamicFontSize * 3} functionality={demo} />
      <HeadingBox title={"Payment Methods"} display='none' textSize={dynamicFontSize * 1.5} functionality={demo} />
      <View style={styles.container}>
        <CardsComponent setSelectedCard={setSelectedCard} selectedcard={selectedcard} setOperation={setOperation} Data={savedcards} />
      </View>
    </View>
  )
}

export default SettingsAddCardScreen

const styles = StyleSheet.create({
   mainbox: {
      flex: 1,
      backgroundColor: Themes.color1, 
    },
    container:{
      marginHorizontal:dynamicMargin,
    }
})