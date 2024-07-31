export let productDetails = {};
let notEmpty = true;
let inputs;

function getInputs() {
  const inputs = document.querySelectorAll(
    "#inputName > input, #inputMadeBy > input, #inputQuantity > input, #inputPrice > input, #inputUnit > input, #inputPurchaseDate > #date, #inputMadeOn > #date, #inputExpiresOn > #date, #inputDescription"
  );
  return Array.from(inputs).map((input) => input);
}

export const getEmpty = () => {
  inputs = getInputs();

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
  quantityLessThan();

  if (notEmpty) {
    setValues();
    return true;
  }
};

const changeBorderColor = (element) => {
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
};

const getPurchaseDate = () => {
  let date = inputs[5];
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(productDetails, { purchasedate: `${year}-${month}-${day}` }); //postgres
  }
};
// ${year}-${month}-${day}

const getMadeOn = () => {
  let date = inputs[6];
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(productDetails, { madeon: `${year}-${month}-${day}` }); //postgres
  }
};

const getExpiresOn = () => {
  let date = inputs[7];
  let day = date.querySelector(".day").value;
  let month = date.querySelector(".month").value;
  let year = date.querySelector(".year").value;

  if (day && month && year) {
    Object.assign(productDetails, { expireson: `${year}-${month}-${day}` }); //postgres
  }
};

const inputPriceHandler = () => {
  const inputPrice = inputs[3];
  inputPrice.value = inputPrice.value.replace(",", ".");

  return Object.assign(productDetails, { price: inputs[3].value }); //postgres
};

const setValues = () => {
  Object.assign(productDetails, { name: inputs[0].value });

  // Object.assign(productDetails, { price: inputPrice.value });
  inputPriceHandler();

  Object.assign(productDetails, { unit: inputs[4].value });

  Object.assign(productDetails, { quantity: inputs[2].value });

  Object.assign(productDetails, { madeby: inputs[1].value });

  Object.assign(productDetails, { description: inputs[8].value });

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

export function periodToComma() {
  let input = document.querySelector("#inputPrice > input");
  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9 \,]/, "").replace(/,(?=.*,)/, "");
  });
}

export function todaysDate() {
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

function quantityLessThan() {
  const quantity = document.querySelector("#inputQuantity > input").value;
  console.log(quantity);
  if (quantity > 999) {
    createNote("<strong>Atenção!</strong> Insira um valor <strong>menor que</strong> 1000.");
  }
}

export const createNote = (message) => {
  const notes = document.querySelector("#alertWarning");
  notes.classList.remove("d-none");
  notes.classList.add("d-block");
  notes.innerHTML = message;
  console.log(notes);

  setTimeout(() => {
    notes.classList.remove("d-block");
    notes.classList.add("d-none");
    notes.innerText = "";
  }, 5000);
};
