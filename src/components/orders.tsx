import { ChangeEvent, Fragment, useState } from 'react';
import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';

import { ShopService } from '../services/shop-service';
import { ProductCartItem } from '../types/product-cart.types';

function Orders() {
  const [email, setEmail] = useState<string>('');
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const {
    data: orders,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['orders', email],
    queryFn: () => ShopService.getOrders(email),
    enabled: false,
    cacheTime: 60 * 1000 * 10,
    staleTime: 60 * 1000 * 10,
    onSuccess: (data) => !data.length && toast.warning('Orders not found'),
  });
  const getOrders = () => refetch();

  return (
    <div className="bg-warning-subtle">
      <div className="row justify-content-center align-items-center">
        <div className="form-floating col-5">
          <input
            onChange={handleEmail}
            value={email}
            type="email"
            className="form-control mt-3"
            id="floatingInput"
            placeholder="Name"
          />
          <label className="ms-2 mt-3" htmlFor="floatingInput">
            Email
          </label>
        </div>
        <button onClick={getOrders} className="btn btn-secondary btn-lg col-2 mt-3" type="submit">
          Send
        </button>
      </div>

      <ul className="d-flex flex-wrap list-group m-1 p-3 gap-2 column-gap-3 ms-3 bg-warning-subtle">
        {isSuccess &&
          orders.map((order) => (
            <li key={order.orderNumber} className="list-group-item d-flex justify-content-around">
              <p>Order number: {order.orderNumber}</p>
              {JSON.parse(order.productsIdsAndQuantity as string).map(
                (product: ProductCartItem) => (
                  <Fragment key={product.id}>
                    <p>Product: {product.name}</p>
                    <p>Price: {product.price} $</p>
                    <p>Quantity: {product.quantity}</p>
                  </Fragment>
                )
              )}
              <p>Total price: {order.totalPrice} $</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Orders;
