import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';

const Product = ({products}: any) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.outerContainer}
      onPress={() => navigation.navigate('productDetails', {products})}>
      <View style={styles.firstInnerContainer}>
        <Image source={{uri: products.images[0]}} style={styles.image} />
      </View>
      <View style={styles.secondInnerContainer}>
        <Text style={styles.title}>{products.title}</Text>
        <Text style={styles.description}>{products.description}</Text>
        <Text style={styles.price}>${products.price}</Text>
      </View>
    </Pressable>
  );
};

export default Product;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 4,
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
});
