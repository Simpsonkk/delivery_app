import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { AppRoute } from '../enums';
import CouponsPage from '../pages/coupons-page';
import OrdersHistoryPage from '../pages/orders-history-page';
import ShoppingCartPage from '../pages/shopping-cart-page';
import ShopsPage from '../pages/shops-page';

function App() {
  return (
    <Routes>
      <Route path={AppRoute['Shops']} element={<ShopsPage />} />
      <Route path={AppRoute['Shopping Cart']} element={<ShoppingCartPage />} />
      <Route path={AppRoute['Coupons']} element={<CouponsPage />} />
      <Route path={AppRoute['History']} element={<OrdersHistoryPage />} />
    </Routes>
  );
}

export default App;
