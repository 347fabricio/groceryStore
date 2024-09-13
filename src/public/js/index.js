import { cellOrdering } from "../../libs/utils/CellOrdering.js";
import { table } from "../../libs/services/Table.js";

import addProductClickHandler from "../../libs/services/events/addProduct.js";
import delProductClickHandler from "../../libs/services/events/delProduct.js";
import updateProductClickHandler from "../../libs/services/events/updateProduct.js";
import expiredProductsClickHandler from "../../libs/services/events/expiredProducts.js";

addProductClickHandler();
delProductClickHandler();
updateProductClickHandler();
expiredProductsClickHandler();

cellOrdering.order();

window.onload = async () => {
  await table.buildProductTable();
};
