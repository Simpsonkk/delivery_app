import { ProductCartItem } from '../types/product-cart.types';

export const ProductService = {
  getProducts() {
    const products = localStorage.getItem('products');
    if (products !== null) {
      return JSON.parse(products);
    }
    return [];
  },
  setProductsInLS(products: ProductCartItem[]) {
    localStorage.setItem('products', JSON.stringify(products));
  },
  getProductQuantity(id: number) {
    const products = this.getProducts();
    const product = products.find((product: ProductCartItem) => product.id === id);
    return product ? product.quantity : 1;
  },
  addProduct(id: number, price: number, name: string) {
    const products = this.getProducts();
    const product = products.find((product: ProductCartItem) => product.id === id);
    if (product) return;
    products.push({ id, quantity: 1, price, name });
    this.setProductsInLS(products);
  },
  changeProductQuantity(id: number, quantity: number) {
    const products = this.getProducts();
    const product = products.find((product: ProductCartItem) => product.id === id);
    product.quantity = quantity;
    this.setProductsInLS(products);
  },
  removeProductByType(id: number) {
    const products = this.getProducts();
    const filteredProducts = products.filter((product: ProductCartItem) => product.id !== id);
    this.setProductsInLS(filteredProducts);
  },
  removeAllProducts() {
    localStorage.removeItem('products');
  },
};
