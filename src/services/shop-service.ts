import { Order } from '../types/order.types';
import { Product } from '../types/product.types';
import { Shop } from '../types/shop.types';
import { createAPI } from './api';

const api = createAPI();

export const ShopService = {
  async getShops() {
    const { data } = await api.get<Shop[]>('/shops');
    return data;
  },
  async getProducts(shopId: number) {
    if (!shopId) return null;
    const { data } = await api.get<Product[]>(`/products/${shopId}`);
    return data;
  },
  async postOrder(order: Order) {
    const { data } = await api.post<[]>('/orders', order);
    return data;
  },
};
