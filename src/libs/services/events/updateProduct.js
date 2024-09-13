import { apiConnector } from "../../API/ApiConnector.js";
import { tableUtils } from "../../utils/TableUtils.js";
import { dataSenderWindow } from "../../services/DataSenderWindow.js";
import { windowUtils } from "../../utils/WindowUtils.js";

const updtProductBtn = document.querySelector("#updtProductBtn");

export default () => {
  updtProductBtn.addEventListener("click", async () => {
    const checkedOnes = tableUtils.getChecked();
    switch (checkedOnes.length) {
      case 0:
        tableUtils.flashWarning();
        break;
      case 1:
        windowUtils.lockContent();
        windowUtils.toggleVisibility();
        dataSenderWindow.showDataSenderWindow();
        dataSenderWindow.justComma();
        dataSenderWindow.todaysDate();
        dataSenderWindow.jsonDestructurer(await apiConnector.getX(+checkedOnes[0]));
        windowUtils.closeWindow("#dSWindow");
        dataSenderWindow.updateProduct(+checkedOnes[0]);
        break;
      case 2:
        tableUtils.createNote("<strong>Atenção!</strong> Selecione apenas <strong>um</strong> produto");
        break;
    }
  });
};
