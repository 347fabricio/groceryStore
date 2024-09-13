import { windowUtils } from "../../utils/WindowUtils.js";
import { dataSenderWindow } from "../../services/DataSenderWindow.js";

export default () => {
  const addProductBtn = document.querySelector("#addProductBtn");
  addProductBtn.addEventListener("click", () => {
    windowUtils.lockContent();
    windowUtils.toggleVisibility();
    dataSenderWindow.showDataSenderWindow();
    dataSenderWindow.justComma();
    dataSenderWindow.todaysDate();
    windowUtils.closeWindow("#dSWindow");
    dataSenderWindow.createNewProduct();
  });
};
