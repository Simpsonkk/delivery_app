import { useEffect } from 'react';

import { ProductCartItem } from '../types/product-cart.types';

type TotalPriceProps = {
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  cartProducts: ProductCartItem[];
};

function TotalPrice({ totalPrice, setTotalPrice, cartProducts }: TotalPriceProps) {
  const calculateTotalPrice = () =>
    cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartProducts]);

  return (
    <div className="d-flex align-items-center ms-5 mt-2">
      <p className="fs-5 m-0 me-4">Total price: {totalPrice} $</p>
      <button type="submit" className="btn btn-secondary">
        Send order
      </button>
    </div>
  );
}

export default TotalPrice;
