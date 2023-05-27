import Header from '../components/header';
import Products from '../components/products';
import UserForm from '../components/user-form';

function ShoppingCartPage() {
  return (
    <>
      <Header />
      <div className="d-flex flex-wrap p-2 pt-3 bg-warning-subtle">
        <UserForm />
        <Products shoppingCart />
      </div>
    </>
  );
}

export default ShoppingCartPage;
