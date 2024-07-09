const getProducts = async () => {
  const response = await fetch("http://localhost:5000/product", {
    method: "GET",
  });
  const productResponse = await response.json();
  return productResponse;
};

const setProduct = async () => {
  const table = document.querySelector(".products > tbody");
  const columns = [
    "id",
    "name",
    "price",
    "unit",
    "quantity",
    "purchasedate",
    "madeby",
    "madeon",
    "expireson",
    "description",
  ];

  const products = await getProducts();
  // console.log(products);

  const formatDate = (i, j) => {
    let date = new Date(products[i][columns[j]]).toLocaleDateString("pt-BR");

    return date;
  };

  for (let i = 0; i < products.length; i++) {
    const row = table.insertRow();
    for (let j = 0; j < columns.length; j++) {
      const cell = row.insertCell();
      cell.className = columns[j];
      switch (j) {
        case 5:
          cell.innerText = formatDate(i, j);
          break;
        case 7:
          cell.innerText = formatDate(i, j);
          break;
        case 8:
          cell.innerText = formatDate(i, j);
          break;
        default:
          cell.innerText = products[i][columns[j]];
      }
    }
  }
};

const addProduct = document.querySelector("#addProduct");
const deleteProduct = document.querySelector("#deleteProduct");
const container = document.querySelector(".container");

let toggleDataSender = false;
addProduct.addEventListener("click", async () => {
  toggleDataSender = !toggleDataSender;
  if (toggleDataSender) {
    container.classList.add("dataSenderOpened");
    createDataSenderWindow();
  } else {
    container.classList.remove("dataSenderOpened");
    document.querySelector(".dataSender").remove();
  }
});

const createDataSenderWindow = () => {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const hr = document.createElement("hr");
  const closeBtn = document.createElement("button");
  const img = document.createElement("img");

  const inputContainer1 = document.createElement("div");
  const inputContainer2 = document.createElement("div");
  const divDates = document.createElement("div");
  const purchaseDate = document.createElement("div");
  const madeOn = document.createElement("div");
  const expiresOn = document.createElement("div");
  const descriptionContainer = document.createElement("div");
  const description = document.createElement("textarea");
  const btnSubmit = document.createElement("button");

  img.src = "./assets/close.svg";
  closeBtn.appendChild(img);
  closeBtn.classList.add("closeBtn");
  h1.innerText = "Adicionar produto";

  const elements = [h1, hr, closeBtn, inputContainer1, inputContainer2, divDates, descriptionContainer, btnSubmit];
  let names = ["Nome", "Feito por", "Quantidade", "Preço", "Tipo"];
  let inputContainer1ChildNames = ["inputQuantity", "inputPrice", "inputUnit"];
  let inputContainer2ChildNames = ["inputName", "inputMadeBy"];
  let span = [];

  for (let i = 0; i < elements.length; i++) {
    div.appendChild(elements[i]);
  }

  for (let i = 0; i < 2; i++) {
    temp = document.createElement("span");
    temp.innerText = names.shift();
    span.push(temp);

    tempDiv = document.createElement("div");
    tempDiv.classList.add(inputContainer2ChildNames.shift());
    input = document.createElement("input");
    i == 0 ? (input.maxLength = "63") : (input.maxLength = "31");
    tempDiv.appendChild(input);
    tempDiv.appendChild(span.shift());
    inputContainer1.append(tempDiv);
  }

  for (let i = 0; i < 3; i++) {
    temp = document.createElement("span");
    temp.innerText = names.shift();
    span.push(temp);

    tempDiv = document.createElement("div");
    tempDiv.classList.add(inputContainer1ChildNames.shift());
    input = document.createElement("input");
    if (i < 2) {
      input.type = "number";
      input.min = "1";
      input.max = "999";
    } else {
      input.maxLength = "31";
    }
    tempDiv.appendChild(input);
    tempDiv.appendChild(span.shift());
    inputContainer2.append(tempDiv);
  }

  let purchaseDateSpan = document.createElement("span");
  purchaseDateSpan.innerText = "Data de compra: ";
  purchaseDate.appendChild(purchaseDateSpan);
  purchaseDate.classList.add("inputPurchaseDate");
  createDate(purchaseDate);
  divDates.append(purchaseDate);

  let madeOnSpan = document.createElement("span");
  madeOnSpan.innerText = "Feito em: ";
  madeOn.appendChild(madeOnSpan);
  madeOn.classList.add("inputMadeOn");
  createDate(madeOn);
  divDates.append(madeOn);

  let expiresOnSpan = document.createElement("span");
  expiresOnSpan.innerText = "Vence em: ";
  expiresOn.appendChild(expiresOnSpan);
  expiresOn.classList.add("inputExpiresOn");
  createDate(expiresOn);
  divDates.append(expiresOn);

  let descriptionSpan = document.createElement("span");
  descriptionSpan.innerText = "Descrição: ";
  descriptionContainer.appendChild(descriptionSpan);
  descriptionContainer.appendChild(description);
  description.maxLength = "31";
  description.classList.add("inputDescription");

  btnSubmit.type = "submit";
  btnSubmit.innerText = "ENVIAR";

  div.classList.add("dataSender");
  inputContainer1.classList.add("inputContainer1");
  inputContainer2.classList.add("inputContainer2");
  divDates.classList.add("dateContainer");
  descriptionContainer.classList.add("descriptionContainer");
  btnSubmit.classList.add("btnSubmit");
  document.body.append(div);

  closeWindow(closeBtn);
  sendData();
};

function createDate(element) {
  date = document.createElement("div");
  createDay(element);
  createMonth(element);
  createYear(element);
  date.classList.add("date");
  element.append(date);
}

function createDay() {
  select = document.createElement("select");
  for (let i = 1; i <= 31; i++) {
    option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    select.appendChild(option);
  }
  select.value = "";
  select.classList.add("day");
  date.append(select);
}

function createMonth() {
  select = document.createElement("select");
  for (let i = 1; i <= 12; i++) {
    option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    select.appendChild(option);
  }
  select.value = "";
  select.classList.add("month");
  date.append(select);
}

function createYear() {
  select = document.createElement("select");
  for (let i = 2022; i <= 2030; i++) {
    option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    select.appendChild(option);
  }
  select.required = "required";
  select.value = "";
  select.classList.add("year");
  date.append(select);
}

// =======================
const closeWindow = (closeBtn) => {
  closeBtn.addEventListener("click", async () => {
    toggleDataSender = !toggleDataSender;
    if (toggleDataSender) {
      container.classList.add("dataSenderOpened");
      createDataSenderWindow();
    } else {
      container.classList.remove("dataSenderOpened");
      document.querySelector(".dataSender").remove();
    }
  });
};

let obj = {};
const sendData = () => {
  const submitData = document.querySelector(".btnSubmit");
  submitData.addEventListener("click", async () => {
    if (getEmpty()) {
      const response = await fetch(`http://localhost:5000/product/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(obj),
      });
      const data = await response.text();
      console.log(data);
    }
  });
};

const getEmpty = () => {
  const inputName = document.querySelector(".inputName > input");
  const inputMadeBy = document.querySelector(".inputMadeBy > input");
  const inputQuantity = document.querySelector(".inputQuantity > input");
  const inputPrice = document.querySelector(".inputPrice > input");
  const inputUnit = document.querySelector(".inputUnit > input");
  const inputPurchaseDate = document.querySelector(".inputPurchaseDate > .date");
  const inputMadeOn = document.querySelector(".inputMadeOn > .date");
  const inputExpiresOn = document.querySelector(".inputExpiresOn > .date");
  const inputDescription = document.querySelector(".inputDescription");

  let inputs = [
    inputName,
    inputMadeBy,
    inputQuantity,
    inputPrice,
    inputUnit,
    inputPurchaseDate,
    inputMadeOn,
    inputExpiresOn,
    inputDescription,
  ];

  let notEmpty = false;
  leaveIf: for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].children.length) {
      for (let j = 0; j < inputs[i].children.length; j++) {
        if (inputs[i].children[j].value) {
          notEmpty = true;
        } else {
          changeBorderColor(inputs[i].children[j]);
          notEmpty = true;
          break leaveIf;
        }
      }
    } else {
      if (inputs[i].value) {
        notEmpty = true;
      } else {
        changeBorderColor(inputs[i]);
        notEmpty = false;
        break leaveIf;
      }
    }
  }

  if (notEmpty) {
    setValues();
    return true;
  }
};

const changeBorderColor = (element) => {
  element.id = "toRed";
  setTimeout(() => {
    element.removeAttribute("id");
  }, 2000);
};

const getPurchaseDate = () => {
  date = document.querySelector(".inputPurchaseDate > .date");
  day = date.querySelector(".day").value;
  month = date.querySelector(".month").value;
  year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(obj, { purchaseDate: `${year}-${month}-${day}` });
  }
};

const getMadeOn = () => {
  date = document.querySelector(".inputMadeOn > .date");
  day = date.querySelector(".day").value;
  month = date.querySelector(".month").value;
  year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(obj, { madeOn: `${year}-${month}-${day}` });
  }
};

const getExpiresOn = () => {
  date = document.querySelector(".inputExpiresOn > .date");
  day = date.querySelector(".day").value;
  month = date.querySelector(".month").value;
  year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(obj, { expiresOn: `${year}-${month}-${day}` });
  }
};

const setValues = () => {
  inputName = document.querySelector(".inputName > input");
  Object.assign(obj, { name: inputName.value });

  inputPrice = document.querySelector(".inputPrice > input");
  Object.assign(obj, { price: inputPrice.value });

  inputUnit = document.querySelector(".inputUnit > input");
  Object.assign(obj, { unit: inputUnit.value });

  inputQuantity = document.querySelector(".inputQuantity > input");
  Object.assign(obj, { quantity: inputQuantity.value });

  inputMadeBy = document.querySelector(".inputMadeBy > input");
  Object.assign(obj, { madeBy: inputMadeBy.value });

  inputDescription = document.querySelector(".inputDescription");
  Object.assign(obj, { description: inputDescription.value });

  getPurchaseDate();
  getMadeOn();
  getExpiresOn();
};

window.onload = () => {
  setProduct();
};
