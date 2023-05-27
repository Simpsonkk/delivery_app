import { ProductCartItem } from './product-cart.types';

export type Order = {
  shopId: number;
  productsIdsAndQuantity: ProductCartItem[];
  totalPrice: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};
