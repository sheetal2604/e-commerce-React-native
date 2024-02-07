import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeItemFromFavorite} from '../redux/favorites';
import {addItem} from '../redux/cartSlice';

const FavoriteProducts = ({products}: any) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleMoveToCart = (products: any) => {
    dispatch(removeItemFromFavorite(products));
    dispatch(addItem(products));
  };
  const hasFavorites = Object.keys(products).length > 0;
  return (
    <SafeAreaView style={styles.safeAreView}>
      {hasFavorites ? (
        <View style={styles.outerContainer}>
          <View style={styles.Container}>
            <View style={styles.firstInnerContainer}>
              <Image source={{uri: products.images[0]}} style={styles.image} />
            </View>
            <View style={styles.secondInnerContainer}>
              <Text style={styles.title}>{products.title}</Text>
              <Text style={styles.description}>{products.description}</Text>
              <Text>{products.rating}</Text>
              <Text style={styles.price}>${products.price}</Text>
            </View>
          </View>
          <View style={styles.thirdContainer}>
            <Text
              style={styles.text}
              onPress={() => dispatch(removeItemFromFavorite(products))}>
              Remove from favorites
            </Text>
            <Text>|</Text>
            <Text
              style={styles.text}
              onPress={() => handleMoveToCart(products)}>
              Move to Cart
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <Text>No Favorite Items added!!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoriteProducts;

const styles = StyleSheet.create({
  safeAreView: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
    padding: 6,
  },
  Container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  image: {
    height: 200,
    width: 150,
  },
  firstInnerContainer: {
    flex: 2,
  },
  secondInnerContainer: {
    flex: 3,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 3,
    fontSize: 16,
  },
  description: {
    color: 'black',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  thirdContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    padding: 4,
  },
  outerContainer: {
    marginBottom: 20,
    padding: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});
