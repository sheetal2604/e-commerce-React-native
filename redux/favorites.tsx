import {createSlice} from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favoriteSlice',
  initialState: {
    items: [],
  },
  reducers: {
    addItemToFavorite: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeItemFromFavorite: (state, action) => {
      state.items = state.items.filter(
        item => item.title !== action.payload.title,
      );
    },
  },
});

export const {addItemToFavorite, removeItemFromFavorite} =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
