const container = document.querySelector(".container");

export const dataSenderWindow = () => {
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
  todaysDate(purchaseDate);
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
};

function createDate(element) {
  const div = document.createElement("div");
  createDay(div);
  createMonth(div);
  createYear(div);
  div.classList.add("date");
  element.append(div);
}

function todaysDate(element) {
  const todaysDateBtn = document.createElement("button");
  todaysDateBtn.innerText = "HOJE";
  todaysDateBtn.classList.add("todaysDateBtn");

  todaysDateBtn.addEventListener("click", () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    document.querySelector(".inputPurchaseDate .day").value = day;
    document.querySelector(".inputPurchaseDate .month").value = month;
    document.querySelector(".inputPurchaseDate .year").value = year;
  });

  element.append(todaysDateBtn);
}

function createDay(element) {
  let select = document.createElement("select");
  for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    select.appendChild(option);
  }
  select.value = "";
  select.classList.add("day");
  element.append(select);
}

function createMonth(element) {
  let select = document.createElement("select");
  for (let i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    select.appendChild(option);
  }
  select.value = "";
  select.classList.add("month");
  element.append(select);
}

function createYear(element) {
  let select = document.createElement("select");
  for (let i = 2022; i <= 2030; i++) {
    let option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    select.appendChild(option);
  }
  select.value = "";
  select.classList.add("year");
  element.append(select);
}

export const closeWindow = () => {
  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", async () => {
    toggleDataSender = !toggleDataSender;
    if (toggleDataSender) {
      container.classList.add("dataSenderOpened");
      dataSenderWindow();
    } else {
      container.classList.remove("dataSenderOpened");
      document.querySelector(".dataSender").remove();
    }
  });
};
