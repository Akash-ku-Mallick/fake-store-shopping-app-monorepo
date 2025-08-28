import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../type";
import type { Product } from "@shared/api/productsApi/type";
import type { MyCartState } from "./type";

const initialState: MyCartState = {
  cart: [],
};

const myCart = createSlice({
  name: "myCart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ product: action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
    },

    increaseQuantity: (state, action: PayloadAction<string | number>) => {
      const item = state.cart.find((i) => i.product.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<string | number>) => {
      const item = state.cart.find((i) => i.product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove if quantity is 0
        state.cart = state.cart.filter((i) => i.product.id !== action.payload);
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = myCart.actions;

export const getMyCart = (state: RootState) => state.myCart.cart;

export default myCart.reducer;
