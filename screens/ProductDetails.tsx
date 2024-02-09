import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import CarouselCards from '../components/CarouselCards';
import {useDispatch} from 'react-redux';
import {addItem} from '../redux/cartSlice';
import {addItemToFavorite} from '../redux/favorites';
const ProductDetails = ({route}: any) => {
  const {products} = route.params;
  const images = products.images;
  const imagesArray = images.map((image: string, index: number) => ({
    id: index,
    imgURL: image,
  }));
  const dispatch = useDispatch();
  return (
    <View>
      <View>
        <CarouselCards data={imagesArray} />
      </View>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{products.title}</Text>
          <Text style={styles.description}>{products.description}</Text>
          <Text style={styles.price}>$ {products.price}</Text>
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => dispatch(addItemToFavorite(products))}
        android_ripple={{color: '#ccc'}}>
        <Text style={styles.buttonTitle}>Add to Favorites</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => dispatch(addItem(products))}
        android_ripple={{color: '#ccc'}}>
        <Text style={styles.buttonTitle}>Add to Cart</Text>
      </Pressable>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  innerContainer: {
    padding: 8,
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
  button: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    backgroundColor: '#ffcc00',
    marginHorizontal: 12,
    marginTop: 8,
    elevation: 2,
  },
  buttonTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },
});
