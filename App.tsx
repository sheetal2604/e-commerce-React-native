/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import CreateAccount from './screens/CreateAccount';
import ProductDetails from './screens/ProductDetails';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Favorites from './screens/Favorites';
import Cart from './screens/Cart';
import {Provider} from 'react-redux';
import appStore from './redux/appStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  const [initialRoute, setInitialRoute] = useState<
    'login' | 'HomeTabs' | 'loading'
  >('loading');
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      setInitialRoute(isLoggedIn === 'true' ? 'HomeTabs' : 'login');
    } catch (e) {
      console.log(e);
    }
  };
  const HomeTabs = () => {
    return (
      <Provider store={appStore}>
        <BottomTabs.Navigator
          screenOptions={{
            tabBarIconStyle: {display: 'none'},
            tabBarLabelStyle: {
              fontSize: 16,
              padding: 8,
              margin: 4,
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: '#555',
          }}>
          <BottomTabs.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <BottomTabs.Screen
            name="favorites"
            component={Favorites}
            options={{headerShown: false}}
          />
          <BottomTabs.Screen
            name="cart"
            component={Cart}
            options={{headerShown: false}}
          />
        </BottomTabs.Navigator>
      </Provider>
    );
  };
  if (initialRoute === 'loading') {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="productDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
