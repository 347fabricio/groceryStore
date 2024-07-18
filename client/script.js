import { setProducts } from "./assets/getProducts.js";
import { newProduct } from "./assets/newProduct.js";
import { deleteProduct } from "./assets/deleteProduct.js";
import { updateProduct } from "./assets/updateProduct.js";
import { order } from "./assets/w3schoolsSort.js";

window.onload = () => {
  setProducts();
  newProduct();
  deleteProduct();
  updateProduct();
  order();
};
