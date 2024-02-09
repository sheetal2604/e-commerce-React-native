import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
// import {useDispatch} from 'react-redux';
// import {loggedOut} from '../redux/authSlice';

const Logout = () => {
  const navigation = useNavigation();
  const clearAsyncStorage = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    navigation.navigate('login');
  };
  const handleLogout = () => {
    clearAsyncStorage();
  };
  return (
    <View style={styles.container}>
      <Button title="Logout" color="#00e6e6" onPress={handleLogout} />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
  },
});
