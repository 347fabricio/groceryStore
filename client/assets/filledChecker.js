export let productDetails = {};
let notEmpty = true;

let inputName;
let inputMadeBy;
let inputQuantity;
let inputPrice;
let inputUnit;
let inputPurchaseDate;
let inputMadeOn;
let inputExpiresOn;
let inputDescription;

function getInputs() {
  inputName = document.querySelector(".inputName > input");
  inputMadeBy = document.querySelector(".inputMadeBy > input");
  inputQuantity = document.querySelector(".inputQuantity > input");
  inputPrice = document.querySelector(".inputPrice > input");
  inputUnit = document.querySelector(".inputUnit > input");
  inputPurchaseDate = document.querySelector(".inputPurchaseDate > .date");
  inputMadeOn = document.querySelector(".inputMadeOn > .date");
  inputExpiresOn = document.querySelector(".inputExpiresOn > .date");
  inputDescription = document.querySelector(".inputDescription");
}

export const getEmpty = () => {
  getInputs();
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

  console.log(inputs[0].children);
  abortLoop: for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].children.length) {
      const breakLoop = isDateFilled(inputs, i);
      if (!breakLoop) {
        break abortLoop;
      }
    } else {
      const breakLoop_2 = isInputFilled(inputs, i);
      if (!breakLoop_2) {
        break abortLoop;
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
  let date = inputPurchaseDate;
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(productDetails, { purchasedate: `${month}-${day}-${year}` }); //postgres
  }
};

const getMadeOn = () => {
  let date = inputMadeOn;
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(productDetails, { madeon: `${month}-${day}-${year}` }); //postgres
  }
};

const getExpiresOn = () => {
  let date = inputExpiresOn;
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(productDetails, { expireson: `${month}-${day}-${year}` }); //postgres
  }
};

const setValues = () => {
  Object.assign(productDetails, { name: inputName.value });

  Object.assign(productDetails, { price: inputPrice.value });

  Object.assign(productDetails, { unit: inputUnit.value });

  Object.assign(productDetails, { quantity: inputQuantity.value });

  Object.assign(productDetails, { madeby: inputMadeBy.value });

  Object.assign(productDetails, { description: inputDescription.value });

  getPurchaseDate();
  getMadeOn();
  getExpiresOn();
};

function isDateFilled(element, index) {
  let temp = true;
  for (let j = 0; j < element[index].children.length; j++) {
    if (!element[index].children[j].value) {
      changeBorderColor(element[index].children[j]);
      notEmpty = false;
      temp = false;
    }
  }
  return temp;
}

function isInputFilled(element, index) {
  let temp = true;
  if (!element[index].value) {
    changeBorderColor(element[index]);
    notEmpty = false;
    temp = false;
  }
  return temp;
}
