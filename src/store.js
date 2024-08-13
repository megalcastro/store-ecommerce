import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'; // Asegúrate de crear este archivo

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
