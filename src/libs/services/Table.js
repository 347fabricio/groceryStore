import { apiConnector } from "../API/ApiConnector.js";
import { tableUtils } from "../utils/TableUtils.js";

class Table {
  async buildProductTable() {
    const table = document.querySelector("#products > tbody");
    const columns = [...document.querySelectorAll("#products thead tr th")].map((x) => x.getAttribute("id"));
    const products = await apiConnector.getALL();

    for (let row = 0; row < products.length; row++) {
      const tableRow = table.insertRow();

      for (let x = 0; x < columns.length; x++) {
        const cell = tableRow.insertCell();
        cell.id = columns[x];
        cell.classList.add(...["px-1", "py-0"]);

        switch (x) {
          case 0:
            tableUtils.createDiv(cell, products[row][columns[x]]);
            break;
          case 2:
            cell.innerText = tableUtils.periodToComma(products[row][columns[x]]);
            break;
          case 3:
            cell.innerText = tableUtils.unitNotation(products[row][columns[x]]);
            break;
          case 5:
            cell.innerText = tableUtils.formatDate(products[row][columns[x]]);
            break;
          case 7:
            cell.innerText = tableUtils.formatDate(products[row][columns[x]]);
            break;
          case 8:
            cell.innerText = tableUtils.formatDate(products[row][columns[x]]);
            break;
          case 9:
            cell.innerText = tableUtils.get2First(cell, products[row][columns[x]]);
            break;
          default:
            cell.innerText = products[row][columns[x]];
        }
      }
    }
  }
}

export const table = new Table();
