import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '../enums';

function Header() {
  const location = useLocation();
  return (
    <header className="ps-4 bg-warning-subtle">
      <ul className="nav nav-underline">
        {Object.keys(AppRoute).map((pageName) => (
          <li key={pageName} className="nav-item">
            <Link
              to={AppRoute[pageName as keyof typeof AppRoute]}
              className={`nav-link ${
                location.pathname === AppRoute[pageName as keyof typeof AppRoute] ? 'active' : ''
              } text-secondary-emphasis`}
              aria-current="page"
            >
              {pageName}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;
