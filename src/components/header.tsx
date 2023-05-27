import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '../enums';

function Header() {
  const location = useLocation();

  return (
    <header className="ps-4 bg-warning-subtle">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <Link
            to={AppRoute.Shops}
            className={`nav-link ${
              location.pathname === AppRoute.Shops ? 'active' : ''
            } text-secondary-emphasis`}
            aria-current="page"
          >
            Shops
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={AppRoute.ShoppingCart}
            className={`nav-link ${
              location.pathname === AppRoute.ShoppingCart ? 'active' : ''
            } text-secondary-emphasis`}
          >
            Shopping cart
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
