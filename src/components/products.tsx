import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { previewAppImg } from '../constants';
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

function Products({ shoppingCart }: ProductsProps): JSX.Element {
  const { shopId, setCartProducts } = useShop();
  const [products, setProducts] = useState<Product[]>([]);

  const { isSuccess, isLoading } = useQuery({
    queryKey: ['products', shopId],
    queryFn: () => ShopService.getProducts(shopId),
    select: (data) =>
      shoppingCart
        ? data.filter((product) =>
            ProductService.getProducts().some(
              (item: ProductCartItem) => item.id === product.productId
            )
          )
        : data,
    onSuccess: (data) => setProducts(data),
  });

  const addProduct = (productId: number, price: number, name: string) => {
    ProductService.addProduct(productId, price, name);
    setCartProducts(ProductService.getProducts());
  };
  const removeProductByType = (productId: number) => {
    setProducts(products.filter((product) => product.productId !== productId));
    ProductService.removeProductByType(productId);
    setCartProducts(ProductService.getProducts());
  };

  return (
    <ul
      className={`d-flex flex-wrap ${
        shoppingCart && 'w-100 ps-5 column-gap-5'
      } m-0 p-3 ps-3 gap-2 column-gap-3 overflow-y-auto border border-4 ms-1 rounded bg-warning-subtle`}
      style={{ width: '1010px', height: `${shoppingCart ? '335px' : '560px'}` }}
    >
      {isLoading && <Loader />}
      {!shopId && <img className="w-100 h-100" src={previewAppImg} alt="preview img" />}
      {isSuccess &&
        products.map((product) => (
          <ProductCard
            key={product.productId}
            addProduct={addProduct}
            removeProductByType={removeProductByType}
            product={product}
            shoppingCart={shoppingCart}
          />
        ))}
    </ul>
  );
}

export default Products;
