import React, {useMemo} from 'react';
import {View, FlatList, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import CartItems from '../components/CartItems';

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Shopping Cart</Text>
      {cartItems.length === 0 && (
        <View style={styles.inner}>
          <Text style={styles.cartText}>Your cart is Empty!!</Text>
        </View>
      )}
      <FlatList
        data={cartItems}
        renderItem={itemData => <CartItems products={itemData.item} />}
        contentContainerStyle={styles.listContent}
      />
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.price}>Total Price - ${totalPrice}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
    padding: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    backgroundColor: '#ffcc00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  listContent: {
    paddingBottom: 200,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    fontSize: 18,
    color: 'black',
  },
});
