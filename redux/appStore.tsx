import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './cartSlice';
import FavoriteReducer from './favorites';

const appStore = configureStore({
  reducer: {
    cart: CartReducer,
    favorites: FavoriteReducer,
  },
});

export default appStore;
