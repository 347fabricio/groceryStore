import { cellOrdering } from "../../libs/utils/CellOrdering.js";
import { table } from "../../libs/services/Table.js";

import addProductClickHandler from "../../libs/services/events/addProduct.js";
import delProductClickHandler from "../../libs/services/events/delProduct.js";
import updateProductClickHandler from "../../libs/services/events/updateProduct.js";
import expiredProductsClickHandler from "../../libs/services/events/expiredProducts.js";
import selExpProductBtnHandler from "../../libs/services/events/selExpProductBtn.js";

addProductClickHandler();
delProductClickHandler("#content");
updateProductClickHandler();
expiredProductsClickHandler();
selExpProductBtnHandler();

cellOrdering.order("products");

window.onload = async () => {
  await table.buildProductTable();
};
