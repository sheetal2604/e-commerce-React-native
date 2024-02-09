import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const productData = createAsyncThunk('categories/products', async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
});

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    products: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(productData.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
