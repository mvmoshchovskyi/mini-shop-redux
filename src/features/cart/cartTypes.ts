import type { Product } from '../../types/product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
