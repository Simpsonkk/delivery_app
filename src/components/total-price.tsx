import { ChangeEvent, useEffect } from 'react';

import { DiscountsSize } from '../enums';
import { ProductCartItem } from '../types/product-cart.types';

type TotalPriceProps = {
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  cartProducts: ProductCartItem[];
  couponCode: string;
  setCouponCode: (couponCode: string) => void;
};

function TotalPrice({
  totalPrice,
  setTotalPrice,
  cartProducts,
  couponCode,
  setCouponCode,
}: TotalPriceProps) {
  const calculateTotalPrice = () =>
    cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handleCouponCode = (e: ChangeEvent<HTMLInputElement>) => setCouponCode(e.target.value);

  useEffect(() => {
    let newTotalPrice = 0;
    const priceWithoutCoupon = calculateTotalPrice();
    const discountSize = DiscountsSize[couponCode as keyof typeof DiscountsSize];
    if (discountSize) {
      const decreaseAmount = priceWithoutCoupon * discountSize;
      newTotalPrice = priceWithoutCoupon - decreaseAmount;
    }
    setTotalPrice(newTotalPrice ? newTotalPrice : priceWithoutCoupon);
  }, [cartProducts, couponCode]);

  return (
    <div className="row align-items-center mt-2">
      <input
        onChange={handleCouponCode}
        value={couponCode}
        className="col form-control ms-3"
        type="text"
        placeholder="Paste coupon code"
      />
      <p className="col-4 fs-6 m-0">Total price: {totalPrice} $</p>
      <button type="submit" className="col-2 btn btn-secondary">
        Order
      </button>
    </div>
  );
}

export default TotalPrice;