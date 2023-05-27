import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useShop } from '../context/shop-context';
import { ProductService } from '../services/product-service';
import { ShopService } from '../services/shop-service';
import { ProductCartItem } from '../types/product-cart.types';
import { Product } from '../types/product.types';
import Loader from './loader';
import ProductCard from './product-card';

type ProductsProps = {
  shoppingCart?: boolean;
};

function Products({ shoppingCart }: ProductsProps) {
  const { shopId, setCartProducts } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const { isSuccess, isLoading } = useQuery({
    queryKey: ['products', shopId],
    queryFn: () => ShopService.getProducts(shopId),
    select: (data) =>
      shoppingCart && data
        ? data.filter((product) =>
            ProductService.getProducts().some(
              (item: ProductCartItem) => item.id === product.productId
            )
          )
        : data,
    onSuccess: (data) => data && setProducts(data),
  });

  const addNewProduct = (productId: number, price: number) => {
    ProductService.addNewProduct(productId, price);
    setCartProducts(ProductService.getProducts());
  };
  const removeProductByType = (productId: number) => {
    setProducts(products.filter((product) => product.productId !== productId));
    ProductService.removeProductByType(productId);
    setCartProducts(ProductService.getProducts());
  };

  const previewImg =
    'https://images.unsplash.com/photo-1486485764572-92b96f21882a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';
  return (
    <ul
      className={`d-flex flex-wrap ${
        shoppingCart && 'w-50'
      } m-1 p-3 gap-2 column-gap-3 overflow-y-auto border border-4 ms-3 rounded bg-warning-subtle`}
      style={{ width: '1010px', height: `${shoppingCart ? '495px' : '610px'}` }}
    >
      {!products.length && <img className="w-100 h-100" src={previewImg} alt="preview img" />}
      {isLoading && <Loader />}
      {isSuccess &&
        products.map((product) => (
          <ProductCard
            key={product.productId}
            addNewProduct={addNewProduct}
            removeProductByType={removeProductByType}
            product={product}
            shoppingCart={shoppingCart}
          />
        ))}
    </ul>
  );
}

export default Products;
