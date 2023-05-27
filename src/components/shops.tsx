import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';

import { useShop } from '../context/shop-context';
import { ProductService } from '../services/product-service';
import { ShopService } from '../services/shop-service';

function Shops() {
  const { setShopId } = useShop();

  const {
    data: shops,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['shops'],
    queryFn: () => ShopService.getShops(),
    cacheTime: 60 * 1000 * 10,
    staleTime: 60 * 1000 * 10,
    select: (data) => data.map((shop) => shop.shop),
    onError: () => toast.warning('Something went wrong, please repeat your query'),
  });

  const handleShop = (shopId: number) => {
    setShopId(shopId);
    localStorage.setItem('shopId', JSON.stringify(shopId));
    ProductService.removeAllProducts();
  };

  return (
    <div
      className="d-flex flex-column align-items-center border border-4 rounded m-1"
      style={{ width: '350px', height: '590px' }}
    >
      <p className="mt-4 fw-bolder fs-5">Shops:</p>
      {isLoading && (
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {isSuccess &&
        shops.map((shop, i) => (
          <button
            key={shop}
            type="button"
            onClick={() => handleShop(i + 1)}
            className="btn btn-secondary btn-lg mb-3 text-capitalize"
            style={{ width: '220px' }}
          >
            {shop}
          </button>
        ))}
    </div>
  );
}

export default Shops;
