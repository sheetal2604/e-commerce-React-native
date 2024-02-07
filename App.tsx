/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  const HomeTabs = () => {
    return (
      <Provider store={appStore}>
        <BottomTabs.Navigator>
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
  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <Stack.Navigator>
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
            name="homeTabs"
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="productDetails"
            component={ProductDetails}
            // options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
