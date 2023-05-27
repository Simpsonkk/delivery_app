import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { useShop } from '../context/shop-context';
import { ProductService } from '../services/product-service';
import { ShopService } from '../services/shop-service';
import { Order } from '../types/order.types';
import TotalPrice from './total-price';

function UserForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Order>({
    mode: 'onChange',
  });

  const { cartProducts, shopId, setShopId, setCouponCode, couponCode } = useShop();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { mutateAsync } = useMutation({
    mutationFn: (order: Order) => ShopService.postOrder(order),
  });

  const handleSubmitForm: SubmitHandler<Order> = async (order) => {
    order.shopId = shopId;
    order.productsIdsAndQuantity = cartProducts;
    order.totalPrice = String(totalPrice);
    await mutateAsync(order);
    reset();
    setCouponCode('');
    ProductService.removeAllProducts();
    setShopId(0);
    setTotalPrice(0);
    alert('Your order has been sent!');
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div
        className="border border-4 rounded m-1 p-4 bg-warning-subtle "
        style={{ width: '600px' }}
      >
        <div className="form-floating mb-3">
          <input
            {...register('name', {
              required: 'Required field',
              pattern: {
                value: /^[a-zA-Zа-яА-Я]+$/,
                message: 'invalid name, write only letters',
              },
            })}
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
          />
          <label htmlFor="name">Name</label>
          <div className="ms-1 mt-1" style={{ height: 15 }}>
            {errors?.name && <p>{errors?.name?.message || 'Error!'}</p>}
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
          />
          <label htmlFor="email">Email</label>
          <div className="ms-1" style={{ height: 15 }}>
            {errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            {...register('phone', {
              required: 'Required field',
              pattern: {
                value: /^[0-9()+]+$/,
                message: 'invalid phone number, write only numbers',
              },
            })}
            type="text"
            className="form-control"
            id="phone"
            placeholder="phone"
          />
          <label htmlFor="phone">Phone</label>
          <div className="ms-1" style={{ height: 15 }}>
            {errors?.phone && <p>{errors?.phone?.message || 'Error!'}</p>}
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            {...register('address', {
              required: 'Required field',
            })}
            type="text"
            className="form-control"
            id="address"
            placeholder="Address"
          />
          <label htmlFor="address">Address</label>
        </div>
      </div>
      <TotalPrice
        cartProducts={cartProducts}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
      />
    </form>
  );
}

export default UserForm;
