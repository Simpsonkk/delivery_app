import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { AppRoute } from '../enums';
import ShoppingCartPage from '../pages/shopping-cart-page';
import ShopsPage from '../pages/shops-page';

function App() {
  return (
    <Routes>
      <Route path={AppRoute.Shops} element={<ShopsPage />} />
      <Route path={AppRoute.ShoppingCart} element={<ShoppingCartPage />} />
    </Routes>
  );
}

export default App;
