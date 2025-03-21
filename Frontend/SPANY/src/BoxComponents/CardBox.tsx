import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, ImageBackground, Image } from 'react-native';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, dynamicWidth, Themes } from '../Themes/color';
import MyIcon, { CardChip, EmptyCart } from '../Themes/SVGIcons';


const FrontCard = React.memo(({ Data }: any) => {
  const formatCardNumber = (cardNumber: string) => {
    const cleanCardNumber = cardNumber.replace(/\D/g, "");
    return cleanCardNumber.replace(/(\d{4})(?=\d)/g, '$1    '); 
  };
  
  return (
    <View style={styles.frontCard}>
      <View style={styles.cardfront1}>
        <View style={{ height: '100%', width: '40%' }}>
          <Image style={{ height: '100%', width: '100%' }} source={require('../assets/photos/visa.png')} />
        </View>
      </View>
      <View style={styles.cardfront2}>
        <CardChip height="100%" width="20%" />
      </View>
      <View style={styles.cardfront3}>
        <Text style={styles.cardnumber}>{formatCardNumber(Data?.card_number||"0000000000000000")}</Text>
      </View>
      <View style={styles.cardfront4}>
        <Text style={styles.validname}>{`Valid\nTill`}</Text>
        <Text style={styles.cardholdername}>{Data?.expiration_date||'MM/YY'}</Text>
      </View>
      <View style={styles.cardfront5}>
        <Text style={styles.cardholdername}>{Data?.card_holder_name||"Anonymous"}</Text>
      </View>
    </View>
  );
});

const BackCard = React.memo(({ Data }: any) => (
  <View style={styles.backCard}>
    <View style={styles.cardback1} />
    <View style={styles.cardback2} />
    <View style={styles.cardback3}>
      <View style={styles.col1}>
        <View style={styles.col1row}>
          <Text style={styles.col1text}>{Data.cvv}</Text>
        </View>
      </View>
      <View style={styles.col2}>
        <Text style={styles.col2text}>AUTHORISED SIGNATURE NOT VALID UNLESS SIGNED</Text>
      </View>
    </View>
    <View style={styles.cardback4}>
      <View style={styles.col3}>
        <Image style={styles.hologram} source={require('../assets/photos/hologram.jpg')} />
      </View>
      <View style={styles.col4}>
        <Text style={styles.col2text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A maxime quibusdam repellat ad veniam doloremque vero maiores eveniet nemo.
        </Text>
      </View>
    </View>
  </View>
));

const CardBox: React.FC = React.memo(({ Data, setSelectedCard, selectedcard, setOperation, flip }: any) => {
  const [isFlipped, setIsFlipped] = useState(flip);  

  useEffect(() => {
    setIsFlipped(flip); 
  }, [flip]);

  const flipCard = useCallback(() => {
    setIsFlipped(prev => !prev);  
  }, []);

  const selectFunction = useCallback(() => {
    setSelectedCard({ ...Data });
    setOperation(false);
  }, [Data, setSelectedCard, setOperation]);

  const borderColor = selectedcard?.id === Data?.id ? Themes.color2 : 'transparent';

  return (
    <View style={[styles.container,{borderColor}]}>
      <TouchableNativeFeedback onLongPress={selectFunction} onPress={flipCard} style={{ flex: 1}}>
        <View style={styles.card}>
          <View style={styles.iconsvg}>
            <MyIcon></MyIcon>
          </View>

          {isFlipped ? (
            <BackCard Data={Data} />
          ) : (
            <FrontCard Data={Data} />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    width: dynamicWidth * 0.85,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: dynamicBorderRadius*0.5,
    borderWidth: 4,
    overflow:"hidden",
    marginRight:dynamicMargin*0.25,
    backgroundColor:Themes.color3
  },
  card: {
    width: dynamicWidth * 0.85,
    height: dynamicWidth * 0.45,
    borderRadius: dynamicBorderRadius*0.5,
   
  },
  iconsvg:{
    position:"absolute",
    // left:50,
    height:"100%",
    width:"50%",
    opacity:0.5,
  },
  frontCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dynamicPadding*0.5,
    paddingVertical:dynamicPadding*0.25
  },
  backCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardfront1: {
    height: '25%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardfront2: {
    height: '30%',
    width: '100%',
  },
  cardfront3: {
    height: '18%',
    width: '100%',
    justifyContent: 'center',
  },
  cardfront4: {
    height: '14%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardfront5: {
    height: '14%',
    width: '100%',
    justifyContent: 'center',
  },
  cardnumber: {
    fontSize: dynamicFontSize*1.5,
    color: Themes.color9,
    fontWeight:"bold",
    paddingHorizontal:dynamicPadding*0.5

  },
  cardholdername: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
    fontWeight:"bold",
    paddingHorizontal:dynamicPadding*0.5
  },
  validname: {
    color: Themes.color9,
    fontWeight:"bold",
    fontSize: dynamicFontSize*0.7,
  },
  cardback1: {
    height: '5%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardback2: {
    height: '25%',
    width: '100%',
    backgroundColor: 'black',
  },
  cardback3: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: dynamicPadding*0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardback4: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: dynamicPadding*0.5,
  },
  col1: {
    height: '100%',
    width: '60%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: dynamicPadding*0.5,
  },
  col1row: {
    height: '70%',
    width: '100%',
    backgroundColor: Themes.color6,
    alignItems: 'flex-end',
    paddingHorizontal: dynamicPadding * 0.5,
    justifyContent: 'center',
  },
  col1text: {
    fontSize: dynamicFontSize,
    color:Themes.color9,
  },
  col2: {
    height: '100%',
    width: '40%',
    justifyContent: 'center',
  },
  col2text: {
    fontSize: dynamicFontSize * 0.7,
    color:Themes.color9,

  },
  col3: {
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col4: {
    height: '100%',
    width: '70%',
  },
  hologram: {
    height: '60%',
    width: '80%',
    borderRadius: dynamicBorderRadius*0.5,
  },
});

export default CardBox;
