import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {decrementQuantity, incrementQuantity} from '../redux/cartSlice';
import {removeItem} from '../redux/cartSlice';

const CartItems = ({products}: any) => {
  const dispatch = useDispatch();
  return (
    <View>
      {products ? (
        <View style={styles.outerContainer}>
          <View style={styles.Container}>
            <View style={styles.firstInnerContainer}>
              <Image source={{uri: products?.images[0]}} style={styles.image} />
            </View>
            <View style={styles.secondInnerContainer}>
              <Text style={styles.title}>{products.title}</Text>
              <Text style={styles.description}>{products.description}</Text>
              <Text>{products.rating}</Text>
              <Text style={styles.price}>
                ${products.price * products.quantity}
              </Text>
            </View>
          </View>
          <View style={styles.thirdContainer}>
            <Text
              style={styles.text}
              onPress={() => dispatch(removeItem(products))}>
              Delete
            </Text>
            <Text>|</Text>
            <View style={styles.box}>
              <Pressable>
                <Text
                  style={styles.button}
                  onPress={() =>
                    dispatch(decrementQuantity({title: products.title}))
                  }>
                  -
                </Text>
              </Pressable>
              <Text style={styles.count}>{products.quantity}</Text>
              <Pressable>
                <Text
                  style={styles.button}
                  onPress={() =>
                    dispatch(incrementQuantity({title: products.title}))
                  }>
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text>No Items added to Cart!!</Text>
        </View>
      )}
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
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
    color: 'black',
  },
  box: {
    flexDirection: 'row',
  },
  count: {
    paddingHorizontal: 25,
    fontSize: 16,
    color: 'black',
  },
  button: {
    fontSize: 16,
    color: 'black',
  },
});
