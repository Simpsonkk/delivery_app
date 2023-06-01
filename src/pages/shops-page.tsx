import Header from '../components/header';
import Products from '../components/products';
import Shops from '../components/shops';

function ShopsPage(): JSX.Element {
  return (
    <>
      <Header />
      <div className="d-flex p-3 bg-warning-subtle">
        <Shops />
        <Products />
      </div>
    </>
  );
}

export default ShopsPage;
