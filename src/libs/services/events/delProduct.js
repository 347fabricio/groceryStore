import { tableUtils } from "../../utils/TableUtils.js";
import { apiConnector } from "../../API/ApiConnector.js";

const delProductBtn = document.querySelector("#delProductBtn");

export default () => {
  delProductBtn.addEventListener("click", async () => {
    let checkbox = document.querySelectorAll(".actionCheckbox:checked");
    let isChecked = [];
    checkbox.forEach((x) => isChecked.push(x.value));

    if (isChecked.length) {
      const { reload } = await apiConnector.delete(isChecked);
      if (reload) return location.reload();
    } else {
      tableUtils.flashWarning();
    }
  });
};
