import { getEmpty, productDetails, createNote, periodToComma, todaysDate } from "./filledChecker.js";
import { dataSenderWindow, closeWindow } from "./dataSenderWindow.js";
import { flashWarning } from "./deleteProduct.js";
import { lockContent } from "./expiredProducts.js";

const updateButton = document.querySelector("#updtProductBtn");

export const updateProduct = () => {
  updateButton.addEventListener("click", () => {
    if (!document.querySelector(".dataSender")) {
      let checkbox = document.querySelectorAll(".actionCheckbox:checked");
      let isChecked = [];
      checkbox.forEach((x) => isChecked.push(x.value));

      switch (isChecked.length) {
        case 0:
          flashWarning();
          break;
        case 1:
          const value = isChecked.toString();
          updateChecked(value);
          break;
        default:
          checkbox.forEach((x) => (x.checked = false));
          createNote("<strong>Atenção!</strong> Selecione apenas <strong>um</strong> produto");
          break;
      }
    }
  });
};

const updateChecked = async (value) => {
  const takeALook = await fetch(`http://localhost:5000/product/${value}`, {
    method: "GET",
  });
  const data = await takeALook.json();
  console.log(data[0]);
  toggleVisibility();
  lockContent();
  dataSenderWindow();
  periodToComma();
  todaysDate();
  jsonDestructurer(data[0]);
  closeWindow("#dSWindow");
  putData(value);
};

const container = document.querySelector(".container-fluid");
export function toggleVisibility() {
  container.classList.add("dataSenderOpened");
}

function jsonDestructurer(data) {
  document.querySelector("#dSWindow > h1").innerText = "Atualizar produto";
  document.querySelector("#inputName > input").value = data.name;
  document.querySelector("#inputMadeBy > input").value = data.madeby;
  document.querySelector("#inputQuantity > input").value = data.quantity;
  document.querySelector("#inputPrice > input").value = data.price.replace(".", ",");
  document.querySelector("#inputUnit > input").value = data.unit;

  destructurePurchaseDate(data);
  destructureMadeOn(data);
  destructureMadeBy(data);

  document.querySelector("#inputDescription").innerText = data.description;
}

function destructurePurchaseDate(data) {
  const purchaseDate = new Date(data.purchasedate).toLocaleDateString("pt-BR").split("/");

  purchaseDate.forEach((date, index) => {
    if (date.indexOf("0") == 0) {
      purchaseDate[index] = date.replace("0", "");
    }
  });

  document.querySelector("#inputPurchaseDate .day").value = purchaseDate[0];
  document.querySelector("#inputPurchaseDate .month").value = purchaseDate[1];
  document.querySelector("#inputPurchaseDate .year").value = purchaseDate[2];
}

function destructureMadeOn(data) {
  const purchaseDate = new Date(data.madeon).toLocaleDateString("pt-BR").split("/");

  purchaseDate.forEach((date, index) => {
    if (date.indexOf("0") == 0) {
      purchaseDate[index] = date.replace("0", "");
    }
  });

  document.querySelector("#inputMadeOn .day").value = purchaseDate[0];
  document.querySelector("#inputMadeOn .month").value = purchaseDate[1];
  document.querySelector("#inputMadeOn .year").value = purchaseDate[2];
}

function destructureMadeBy(data) {
  const purchaseDate = new Date(data.expireson).toLocaleDateString("pt-BR").split("/");

  purchaseDate.forEach((date, index) => {
    if (date.indexOf("0") == 0) {
      purchaseDate[index] = date.replace("0", "");
    }
  });

  document.querySelector("#inputExpiresOn .day").value = purchaseDate[0];
  document.querySelector("#inputExpiresOn .month").value = purchaseDate[1];
  document.querySelector("#inputExpiresOn .year").value = purchaseDate[2];
}
const putData = (value) => {
  const submitBtn = document.querySelector("#btnSubmit");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      if (getEmpty()) {
        await fetch(`http://localhost:5000/product/update/${value}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(productDetails),
        });
        location.reload();
      }
    } catch (err) {
      throw new Error(err);
    }
    return false;
  });
};
