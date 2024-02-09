import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './cartSlice';
import FavoriteReducer from './favorites';
import ProductReducer from './productSlice';

const appStore = configureStore({
  reducer: {
    cart: CartReducer,
    favorites: FavoriteReducer,
    products: ProductReducer,
  },
});

// export type RootState = ReturnType<typeof appStore.getState>;
// export type AppDispatch = typeof appStore.dispatch;
export default appStore;
