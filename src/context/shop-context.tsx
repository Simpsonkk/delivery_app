import { createContext, ReactNode, useContext, useState } from 'react';

import { ProductService } from '../services/product-service';
import { ProductCartItem } from '../types/product-cart.types';

type Context = {
  shopId: number;
  setShopId: (shopId: number) => void;
  cartProducts: ProductCartItem[];
  setCartProducts: (cartProducts: ProductCartItem[]) => void;
  couponCode: string;
  setCouponCode: (couponCode: string) => void;
};

type ShopProviderProps = {
  children: ReactNode;
};

const ShopContext = createContext<Context>({
  shopId: 0,
  setShopId: () => '',
  cartProducts: [],
  setCartProducts: () => '',
  couponCode: '',
  setCouponCode: () => '',
});

export const useShop = () => useContext(ShopContext);

function ShopProvider({ children }: ShopProviderProps): JSX.Element {
  const [shopId, setShopId] = useState<number>(JSON.parse(localStorage.getItem('shopId') || '0'));
  const [cartProducts, setCartProducts] = useState<ProductCartItem[]>(ProductService.getProducts());
  const [couponCode, setCouponCode] = useState<string>('');

  return (
    <ShopContext.Provider
      value={{ shopId, setShopId, cartProducts, setCartProducts, couponCode, setCouponCode }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export default ShopProvider;
