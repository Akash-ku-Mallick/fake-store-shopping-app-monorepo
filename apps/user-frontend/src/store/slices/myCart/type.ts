import type { Product } from "@shared/api/productsApi/type";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface MyCartState {
  cart: CartItem[];
}