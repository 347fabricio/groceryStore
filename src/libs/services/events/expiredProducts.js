import { cellOrdering } from "../../utils/CellOrdering.js";
import delProductClickHandler from "./delProduct.js";

import { expiredProductsWindow } from "../ExpiredProductsWindow.js";
import { windowUtils } from "../../utils/WindowUtils.js";
import { apiConnector } from "../../API/ApiConnector.js";

const expiredProductBtn = document.querySelector("#expiredProductBtn");

export default () => {
  expiredProductBtn.addEventListener("click", async () => {
    const expiredProducts = await apiConnector.getExpiredOnes();

    windowUtils.toggleVisibility();
    windowUtils.lockContent();
    windowUtils.closeWindow("#expiredOnes");
    windowUtils.showExpiredProducts();
    expiredProductsWindow.isNearExpiration(expiredProducts);
    expiredProductsWindow.tooltipInit();
    expiredProductsWindow.cleanTable();

    delProductClickHandler("#expiredOnes");
    cellOrdering.order("expiredProducts");
  });
};
