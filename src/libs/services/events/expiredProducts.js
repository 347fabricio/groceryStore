import { expiredProductsWindow } from "../ExpiredProductsWindow.js";
import { windowUtils } from "../../utils/WindowUtils.js";

const expiredProductBtn = document.querySelector("#expiredProductBtn");

export default () => {
  expiredProductBtn.addEventListener("click", () => {
    windowUtils.toggleVisibility();
    windowUtils.lockContent();
    windowUtils.closeWindow("#expiredOnes");
    windowUtils.showExpiredProducts();
    expiredProductsWindow.isNearExpiration();
    expiredProductsWindow.tooltipInit();
    expiredProductsWindow.cleanTable();
  });
};
