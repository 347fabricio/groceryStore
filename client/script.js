import { setProducts } from "./assets/getProducts.js";
import { newProduct } from "./assets/newProduct.js";
import { deleteProduct } from "./assets/deleteProduct.js";
import { updateProduct } from "./assets/updateProduct.js";

window.onload = async () => {
  await setProducts();
  newProduct();
  deleteProduct();
  updateProduct();
};
