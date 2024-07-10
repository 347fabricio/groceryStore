import { setProducts } from "./assets/getProducts.js";
import { newProduct } from "./assets/newProduct.js";
import { deleteProduct } from "./assets/deleteProduct.js";

window.onload = async () => {
  await setProducts();
  newProduct();
  deleteProduct();
};
