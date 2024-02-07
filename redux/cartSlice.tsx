import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.find(product => product.title === item.title);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({...item, quantity: 1});
      }
    },
    removeItem(state, action) {
      return state.filter(product => product.title !== action.payload.title);
    },
    clearItem: state => {
      // Clear all items from the cart
      state.items = [];
    },
    incrementQuantity: (state, action) => {
      const {title} = action.payload;
      const product = state.find(product => product.title === title);
      if (product) {
        product.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const {title} = action.payload;
      const productIndex = state.findIndex(product => product.title === title);
      if (productIndex !== -1) {
        const product = state[productIndex];
        if (product.quantity > 1) {
          product.quantity--;
        } else {
          state.splice(productIndex, 1);
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  clearItem,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
