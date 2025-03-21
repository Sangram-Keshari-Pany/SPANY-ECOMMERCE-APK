import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React from 'react';
import ProfilePhotos from '../BoxComponents/ProfilePhoto';
import HeadingBox from '../BoxComponents/HeadingBox';
import { dynamicFontSize, dynamicMargin, Themes } from '../Themes/color';
import { contentWidth, dynamicPadding } from '../Themes/color';
import { demo } from '../functionality/APICall';



interface TopProductProps {
  navigation: any;
  name: string;
  products: Product[];
  display?: any;
}

const TopProduct: React.FC<TopProductProps> = ({ navigation, name, products, display = "none" }) => {
  const handleProductPress = (product: any) => {
    try {
      navigation.navigate('productscreen', product);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const renderItem = ({ item }: { item: any}) => (
    <TouchableOpacity
      key={'TopProductButton' + item.id}
      style={styles.TouchableOpacity}
      onPress={() => handleProductPress(item)}
    >
      <ProfilePhotos key={'TopProductprofilephoto' + item.id} imageurl={item.product_image1} />
    </TouchableOpacity>
  );

  return (
    <View>
      <HeadingBox title={name} display={display} textSize={dynamicFontSize * 2} functionality={demo} />
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.TopProductscroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TopProductscroll: {
    paddingVertical: dynamicPadding*0.5,
    paddingHorizontal: dynamicPadding
  },
  TouchableOpacity: {
    height: contentWidth * 0.2,
    width: contentWidth * 0.2,
    marginRight: dynamicMargin*0.5,
    borderRadius: "50%",
    overflow: 'hidden',
    shadowColor: Themes.color4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: Themes.color10,
    backgroundColor: Themes.color1,
  },
});

export default TopProduct;
