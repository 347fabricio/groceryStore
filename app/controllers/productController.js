import { emitEvent } from "../logs/scripts/eventEmitter.js";
import { Model } from "../models/ProductModel.js";
import { View } from "../views/view.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async getProducts() {
    return await this.model.selectAllProducts();
  }

  async getSpecificProducts(id) {
    return await this.model.selectAProduct(id);
  }

  async newProduct(product, user) {
    const response = await this.model.insertProduct(product);
    if (response.Error) return response;
    emitEvent(`Product ${product.name} was added by ${user}`, "post", "productsLogs.txt");
    return this.view.reloadPage();
  }

  async updtProduct(targetProduct, id, user) {
    const response = await this.model.updateProduct(targetProduct, id);
    if (response.Error) return response;
    emitEvent(`Product ID: ${id}[${targetProduct.name}] was updated by ${user}.`, "PUt", "productsLogs.txt");
    return this.view.reloadPage();
  }

  async delProduct(products, user) {
    const response = await this.model.deleteProduct(products);
    if (response.Error) return response;
    products.forEach((product) =>
      emitEvent(`Product ID: ${product} was deleted by ${user}.`, "delete", "productsLogs.txt")
    );
    return this.view.reloadPage();
  }
}

export const productController = new Controller(new Model(), new View());
