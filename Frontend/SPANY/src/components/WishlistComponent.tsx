import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import WishlistTotalBox from '../BoxComponents/WishlistTotalBox';
import WishlistEmpty from '../BoxComponents/WishlistEmpty';

interface Favorite {id: string;}
interface WishlistComponentProps {favorites: Favorite[];navigation: any;}

const WishlistComponent: React.FC<WishlistComponentProps> = ({ favorites, navigation, keys = 'wishlist' }) => {
  if (!Array.isArray(favorites)) {
    return <View style={styles.wishlist} />;
  }

  const renderItem = ({ item }: { item: Favorite }) => (
    <WishlistTotalBox
      key={`${keys}-${item.id}`} 
      favorite={item}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.wishlist}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => `${keys}-${item.id}`} 
        />
      ) : (
        <WishlistEmpty svgname={"EmptyWishlist"} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wishlist: {
    justifyContent: 'space-between',
  },
});

export default WishlistComponent;
