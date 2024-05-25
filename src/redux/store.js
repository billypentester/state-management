import { configureStore } from '@reduxjs/toolkit'
import { categoriesAPI } from './features/category/api'
import { itemsAPI } from './features/item/api';
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from './features/cart/slice'

export const store = configureStore({
  reducer: {
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
    [itemsAPI.reducerPath]: itemsAPI.reducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(categoriesAPI.middleware, itemsAPI.middleware)
})

setupListeners(store.dispatch);