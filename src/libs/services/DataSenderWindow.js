import { apiConnector } from "../API/ApiConnector.js";
import { tableUtils } from "../utils/TableUtils.js";
import { ProductDetails } from "../classes/ProductDetails.js";

class DataSenderWindow {
  createNewProduct() {
    const submitData = document.querySelector("#btnSubmit");
    submitData.addEventListener("click", async (e) => {
      e.preventDefault();
      const { isEmpty, productDetails } = dataSenderWindow.getEmpty();

      if (!isEmpty) {
        console.log(isEmpty);
        const { reload } = await apiConnector.post(productDetails);
        if (reload) location.reload();
      }
    });
  }

  async updateProduct(id) {
    const submitBtn = document.querySelector("#btnSubmit");

    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const { isEmpty, productDetails } = dataSenderWindow.getEmpty();

      if (!isEmpty) {
        const { reload } = await apiConnector.put(id, productDetails);
        if (reload) location.reload();
      }
    });
  }

  getEmpty() {
    let inputs = this.getInputs();
    let notEmpty = true;

    abortLoop: for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].children.length) {
        const breakLoop = this.isDateFilled(inputs, i);
        if (!breakLoop) {
          notEmpty = false;
          break abortLoop;
        }
      } else {
        const breakLoop_2 = this.isInputFilled(inputs, i);
        if (!breakLoop_2) {
          notEmpty = false;
          break abortLoop;
        }
      }
    }

    if (this.quantityLessThan()) return { isEmpty: true, productDetails: false };

    if (!notEmpty) return { isEmpty: true, productDetails: false };

    const productDetails = this.setValues(inputs);
    return { isEmpty: false, productDetails };
  }

  showDataSenderWindow() {
    dSWindow.classList.remove("d-none");
    dSWindow.classList.add("d-block");
  }

  jsonDestructurer(product) {
    document.querySelector("#dSWindow > h1").innerText = "Atualizar produto";
    document.querySelector("#inputName > input").value = product.name;
    document.querySelector("#inputMadeBy > input").value = product.madeby;
    document.querySelector("#inputQuantity > input").value = product.quantity;
    document.querySelector("#inputPrice > input").value = product.price.replace(".", ",");
    document.querySelector("#inputUnit > input").value = product.unit;

    dataSenderWindow.destructureDate("inputPurchaseDate", product);
    dataSenderWindow.destructureDate("inputMadeOn", product);
    dataSenderWindow.destructureDate("inputExpiresOn", product);

    document.querySelector("#inputDescription").innerText = product.description;
  }

  destructureDate(element, data) {
    let id =
      element == "inputPurchaseDate"
        ? data.purchasedate
        : element == "inputMadeOn"
        ? data.madeon
        : element == "inputExpiresOn"
        ? data.expireson
        : null;
    const purchaseDate = new Date(id).toLocaleDateString("pt-BR").split("/");

    purchaseDate.forEach((date, index) => {
      if (date.indexOf("0") == 0) {
        purchaseDate[index] = date.replace("0", "");
      }
    });

    document.querySelector(`#${element} .day`).value = purchaseDate[0];
    document.querySelector(`#${element} .month`).value = purchaseDate[1];
    document.querySelector(`#${element} .year`).value = purchaseDate[2];
  }

  setValues(inputs) {
    let productDetails = new ProductDetails();

    this.inputName(productDetails, inputs);
    this.inputMadeBy(productDetails, inputs);
    this.inputQuantity(productDetails, inputs);
    this.inputPrice(productDetails, inputs);
    this.inputUnit(productDetails, inputs);
    this.inputPurchaseDate(productDetails, inputs);
    this.inputMadeOn(productDetails, inputs);
    this.inputExpiresOn(productDetails, inputs);
    this.inputDescription(productDetails, inputs);

    return productDetails;
  }

  inputName(product, inputs) {
    product.name = inputs[0].value;
  }

  inputMadeBy(product, inputs) {
    product.madeby = inputs[1].value;
  }

  inputQuantity(product, inputs) {
    product.quantity = inputs[2].value;
  }

  inputPrice(product, inputs) {
    const inputPrice = inputs[3];
    inputPrice.value = inputPrice.value.replace(",", ".");

    product.price = inputs[3].value;
  }

  inputUnit(product, inputs) {
    product.unit = inputs[4].value;
  }

  inputPurchaseDate(product, inputs) {
    const date = inputs[5];
    const day = date.querySelector(".day").value;
    const month = date.querySelector(".month").value;
    const year = date.querySelector(".year").value;

    if (day && month && year) {
      product.purchasedate = `${year}-${month}-${day}`;
    }
  }

  inputMadeOn(product, inputs) {
    const date = inputs[6];
    const day = date.querySelector(".day").value;
    const month = date.querySelector(".month").value;
    const year = date.querySelector(".year").value;

    if (day && month && year) {
      product.madeon = `${year}-${month}-${day}`;
    }
  }

  inputExpiresOn(product, inputs) {
    const date = inputs[7];
    const day = date.querySelector(".day").value;
    const month = date.querySelector(".month").value;
    const year = date.querySelector(".year").value;

    if (day && month && year) {
      product.expireson = `${year}-${month}-${day}`;
    }
  }

  inputDescription(product, inputs) {
    product.description = inputs[8].value;
  }

  quantityLessThan() {
    const quantity = document.querySelector("#inputQuantity > input").value;
    if (quantity > 999) {
      tableUtils.createNote("<strong>Atenção!</strong> Insira um valor <strong>menor que</strong> 1000.");
      return true;
    }
  }

  getInputs() {
    const inputs = document.querySelectorAll(
      "#inputName > input, #inputMadeBy > input, #inputQuantity > input, #inputPrice > input, #inputUnit > input, #inputPurchaseDate > #date, #inputMadeOn > #date, #inputExpiresOn > #date, #inputDescription"
    );
    return Array.from(inputs).map((input) => input);
  }

  isDateFilled(element, index) {
    let temp = true;
    for (let j = 0; j < element[index].children.length; j++) {
      if (!element[index].children[j].value) {
        this.changeBorderColor(element[index].children[j]);
        temp = false;
      }
    }
    return temp;
  }

  isInputFilled(element, index) {
    let temp = true;
    if (!element[index].value) {
      this.changeBorderColor(element[index]);
      temp = false;
    }
    return temp;
  }

  justComma() {
    let input = document.querySelector("#inputPrice > input");
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9 \,]/, "").replace(/,(?=.*,)/, "");
    });
  }

  todaysDate() {
    const todaysDateBtn = document.querySelector("#todaysDateBtn");
    todaysDateBtn.addEventListener("click", () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      document.querySelector("#inputPurchaseDate .day").value = day;
      document.querySelector("#inputPurchaseDate .month").value = month;
      document.querySelector("#inputPurchaseDate .year").value = year;
    });
  }

  changeBorderColor(element) {
    let toggle = true;

    let blinkInterval = setInterval(() => {
      if (toggle) {
        element.id = "toRed";
        toggle = !toggle;
      } else {
        element.removeAttribute("id");
        toggle = !toggle;
      }
    }, 100);

    setTimeout(() => clearInterval(blinkInterval), 1000);
  }
}

export const dataSenderWindow = new DataSenderWindow();
