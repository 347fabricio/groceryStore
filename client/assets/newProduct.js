const addProduct = document.querySelector("#addProduct");
const container = document.querySelector(".container");

let toggleDataSender = false;

export const newProduct = () => {
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
};

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
    let temp = document.createElement("span");
    temp.innerText = names.shift();
    span.push(temp);

    let tempDiv = document.createElement("div");
    tempDiv.classList.add(inputContainer2ChildNames.shift());
    let input = document.createElement("input");
    i == 0 ? (input.maxLength = "63") : (input.maxLength = "31");
    tempDiv.appendChild(input);
    tempDiv.appendChild(span.shift());
    inputContainer1.append(tempDiv);
  }

  for (let i = 0; i < 3; i++) {
    let temp = document.createElement("span");
    temp.innerText = names.shift();
    span.push(temp);

    let tempDiv = document.createElement("div");
    tempDiv.classList.add(inputContainer1ChildNames.shift());
    let input = document.createElement("input");
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
  let date = document.createElement("div");
  createDay(date);
  createMonth(date);
  createYear(date);
  date.classList.add("date");
  element.append(date);
}

function createDay(date) {
  let select = document.createElement("select");
  for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    select.appendChild(option);
  }
  select.value = "";
  select.classList.add("day");
  date.append(select);
}

function createMonth(date) {
  let select = document.createElement("select");
  for (let i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    select.appendChild(option);
  }
  select.value = "";
  select.classList.add("month");
  date.append(select);
}

function createYear(date) {
  let select = document.createElement("select");
  for (let i = 2022; i <= 2030; i++) {
    let option = document.createElement("option");
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

// sending
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
      location.reload();
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
  let date = document.querySelector(".inputPurchaseDate > .date");
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(obj, { purchaseDate: `${year}-${month}-${day}` });
  }
};

const getMadeOn = () => {
  let date = document.querySelector(".inputPurchaseDate > .date");
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(obj, { madeOn: `${year}-${month}-${day}` });
  }
};

const getExpiresOn = () => {
  let date = document.querySelector(".inputPurchaseDate > .date");
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(obj, { expiresOn: `${year}-${month}-${day}` });
  }
};

const setValues = () => {
  let inputName = document.querySelector(".inputName > input");
  Object.assign(obj, { name: inputName.value });

  let inputPrice = document.querySelector(".inputPrice > input");
  Object.assign(obj, { price: inputPrice.value });

  let inputUnit = document.querySelector(".inputUnit > input");
  Object.assign(obj, { unit: inputUnit.value });

  let inputQuantity = document.querySelector(".inputQuantity > input");
  Object.assign(obj, { quantity: inputQuantity.value });

  let inputMadeBy = document.querySelector(".inputMadeBy > input");
  Object.assign(obj, { madeBy: inputMadeBy.value });

  let inputDescription = document.querySelector(".inputDescription");
  Object.assign(obj, { description: inputDescription.value });

  getPurchaseDate();
  getMadeOn();
  getExpiresOn();
};
