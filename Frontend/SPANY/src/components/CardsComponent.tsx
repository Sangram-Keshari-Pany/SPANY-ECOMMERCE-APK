import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dynamicBorderRadius, dynamicFontSize, dynamicPadding, dynamicWidth, Themes } from '../Themes/color';
import AddCardBox from '../BoxComponents/AddCardBox';
import CardBox from '../BoxComponents/CardBox';
import LinearGradient from 'react-native-linear-gradient';

const CardsComponent = ({ setSelectedCard, selectedcard, setOperation, Data }: any) => {
  const [addNewCard, setAddNewCard] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <View style={styles.cardsbox}>
      {addNewCard ? (
        <AddCardBox setSelectedCard={setSelectedCard} selectedcard={selectedcard} setOperation={setOperation} />
      ) : (
        <>
          {Data.length > 0 ? (
            <FlatList
              horizontal
              data={Data}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => (
                <CardBox setSelectedCard={setSelectedCard} selectedcard={selectedcard} setOperation={setOperation} Data={item} flip={isFlipped}/>
              )}
            />
          ) : (
            <Text>No card found</Text>
          )}
          <LinearGradient colors={Themes.gradient1} style={styles.Addbox} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}  >
          <TouchableOpacity style={styles.Addbox} onPress={() => setAddNewCard(true)}>
            <Text style={styles.addtext}>+</Text>
          </TouchableOpacity>
          </LinearGradient>
          
        </>
      )}
    </View>
  );
};

export default CardsComponent;

const styles = StyleSheet.create({
  cardsbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dynamicBorderRadius * 2,
    marginVertical: dynamicPadding * 0.25,
    gap: 5,
  },
  Addbox: {
    width: dynamicWidth * 0.1,
    height: dynamicWidth * 0.45,
    borderRadius: dynamicBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addtext: {
    fontSize: dynamicFontSize * 2,
    color: Themes.color6,
  },
});
