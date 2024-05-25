import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        state.total += existingItem.price;
        return;
      }
      newItem.quantity = 1;
      state.items.push(newItem);
      state.total += newItem.price;
    },
    removeItem(state, action) {
      const removedItem = action.payload;
      state.items = state.items.filter(item => item.id !== removedItem.id);
      state.total -= removedItem.price;
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
