import { ChangeEvent, useEffect, useState } from 'react';

import { useShop } from '../context/shop-context';
import { ProductService } from '../services/product-service';
import { Product } from '../types/product.types';

type ProductCartProps = {
  product: Product;
  addNewProduct: (productId: number, price: number, name: string) => void;
  removeProductByType: (productId: number) => void;
  shoppingCart?: boolean;
};

function ProductCart({
  product,
  shoppingCart,
  addNewProduct,
  removeProductByType,
}: ProductCartProps) {
  const { setCartProducts, cartProducts } = useShop();
  const [productQuantity, setProductQuantity] = useState<number>(
    ProductService.getProduct(product.productId)
  );
  const handleProductQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(+e.target.value);
    ProductService.addProduct(product.productId, +e.target.value);
  };
  const isProductInCart = !!cartProducts.find((cartProd) => cartProd.id === product.productId);

  useEffect(() => {
    setCartProducts(ProductService.getProducts());
  }, [productQuantity]);

  return (
    <li
      className="card align-items-center position-relative"
      style={{ width: '300px', height: '300px' }}
    >
      {shoppingCart && (
        <button
          onClick={() => removeProductByType(product.productId)}
          type="button"
          className="btn-close position-absolute top-0 end-0 pt-4 pe-4"
          aria-label="Close"
        ></button>
      )}

      <img src={product.img} className="card-img-top w-50 h-50" alt={product.name} />
      <div className="card-body d-flex flex-column align-items-center justify-content-center p-0">
        <h5 className="card-title">
          {product.name} {product.price} $
        </h5>
        {shoppingCart ? (
          <input
            type="number"
            onChange={handleProductQuantity}
            value={productQuantity}
            className="form-control"
            min={1}
          />
        ) : (
          <button
            onClick={() => addNewProduct(product.productId, product.price, product.name)}
            className={`btn ${
              isProductInCart ? 'bg-secondary-subtle' : 'bg-secondary text-white'
            } mb-1`}
            style={{ height: '50px', width: '160px' }}
          >
            {isProductInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        )}
      </div>
    </li>
  );
}

export default ProductCart;
