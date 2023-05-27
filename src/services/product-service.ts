import { ProductCartItem } from '../types/product-cart.types';

export const ProductService = {
  getProducts() {
    const products = localStorage.getItem('products');
    if (products !== null) {
      return JSON.parse(products);
    }
    return [];
  },
  getProduct(id: number) {
    const products = this.getProducts();
    const product = products.find((product: ProductCartItem) => product.id === id);
    return product ? product.quantity : 1;
  },
  addNewProduct(id: number, price: number) {
    const products = this.getProducts();
    const product = products.find((product: ProductCartItem) => product.id === id);
    if (product) return;
    products.push({ id, quantity: 1, price });
    localStorage.setItem('products', JSON.stringify(products));
  },
  addProduct(id: number, quantity: number) {
    const products = this.getProducts();
    const product = products.find((product: ProductCartItem) => product.id === id);
    product.quantity = quantity;
    localStorage.setItem('products', JSON.stringify(products));
  },
  removeProduct(id: number) {
    const products = this.getProducts();
    const product = products.find((product: ProductCartItem) => product.id === id);
    product.quantity -= 1;
    localStorage.setItem('products', JSON.stringify(products));
  },
  removeProductByType(id: number) {
    const products = this.getProducts();
    const filteredProducts = products.filter((product: ProductCartItem) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
  },
  removeAllProducts() {
    localStorage.removeItem('products');
  },
};
