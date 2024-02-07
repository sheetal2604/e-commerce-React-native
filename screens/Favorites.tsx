import React from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import {useSelector} from 'react-redux';
import FavoriteProducts from '../components/FavoriteProducts';

const Favorites = () => {
  const favoriteItems = useSelector(state => state.favorites.items);
  return (
    <View>
      <Text style={styles.text}>My Wishlist</Text>
      {favoriteItems.length === 0 && (
        <View style={styles.inner}>
          <Text style={styles.favoriteText}>
            Your wishlist is currently empty
          </Text>
        </View>
      )}
      <FlatList
        data={favoriteItems}
        renderItem={itemData => <FavoriteProducts products={itemData.item} />}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
    padding: 8,
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 18,
    color: 'black',
  },
});
