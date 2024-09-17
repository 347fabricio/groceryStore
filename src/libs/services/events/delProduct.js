import { tableUtils } from "../../utils/TableUtils.js";
import { apiConnector } from "../../API/ApiConnector.js";

export default (element) => {
  const delProductBtn = document.querySelector(`${element} #delProductBtn`);
  delProductBtn.addEventListener("click", async () => {
    let checkbox = document.querySelectorAll(`${element} .actionCheckbox:checked`);
    let isChecked = [];
    checkbox.forEach((x) => isChecked.push(x.value));

    if (isChecked.length) {
      let really = confirm(`Você quer excluir este(s) produto(s?`);
      if (really) {
        const { reload } = await apiConnector.delete(isChecked);
        if (reload) return location.reload();
      }
    } else {
      tableUtils.flashWarning(element);
    }
  });
};
