import { ProductCartItem } from './product-cart.types';

export type Order = {
  shopId: number;
  productsIdsAndQuantity: ProductCartItem[] | string;
  totalPrice: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orderNumber?: number;
};
