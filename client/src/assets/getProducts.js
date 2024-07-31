const getProducts = async () => {
  const response = await fetch("http://localhost:5000/product", {
    method: "GET",
  });
  const productResponse = await response.json();
  return productResponse;
};

export const setProducts = async () => {
  const table = document.querySelector("#products > tbody");

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

  for (let row = 0; row < products.length; row++) {
    const tableRow = table.insertRow();
    tableRow.classList.add("tRow");

    for (let x = 0; x < columns.length; x++) {
      const classesToAdd = ["px-1", "py-0"];
      const cell = tableRow.insertCell();
      cell.id = columns[x];
      cell.classList.add(...classesToAdd);

      switch (x) {
        case 0:
          createDiv(cell, products[row][columns[x]]);
          break;
        case 2:
          cell.innerText = periodToComma(products[row][columns[x]]);
          break;
        case 3:
          cell.innerText = unitNotation(products[row][columns[x]]);
          break;
        case 5:
          cell.innerText = formatDate(products[row][columns[x]]);
          break;
        case 7:
          cell.innerText = formatDate(products[row][columns[x]]);
          break;
        case 8:
          cell.innerText = formatDate(products[row][columns[x]]);
          break;
        case 9:
          cell.innerText = get2First(cell, products[row][columns[x]]);
          break;
        default:
          cell.innerText = products[row][columns[x]];
      }
    }
  }
};

function createDiv(cell, value) {
  let div = document.createElement("div");
  div.classList.add(...["d-flex", "justify-content-between"]);
  div.innerText = value;
  createCheckbox(div, value);
  cell.append(div);
}

function createCheckbox(cell, value) {
  let checkbox = document.createElement("input");
  checkbox.classList.add(...["actionCheckbox", "form-check-input"]);
  checkbox.type = "checkbox";
  checkbox.value = value;
  cell.appendChild(checkbox);
}

function periodToComma(value) {
  return `R$ ${value.replace(".", ",")}`;
}

function unitNotation(value) {
  const quantity = value
    .match(/[^a-z]/gi)
    .join("")
    .replace(/\s+/g, "");
  let unit = value.match(/[a-z]/gi).join("").toUpperCase();
  unit = isLiters(unit);
  return quantity + unit;
}

function isLiters(unit) {
  return unit != "L" ? unit.toLowerCase() : unit;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("pt-BR");
}

function get2First(cell, value) {
  if (value.split(" ").length > 2) {
    cell.title = value;
    cell.style.textDecoration = "underline";
    cell.style.textDecorationColor = "orange";

    return value.split(" ", 2).join(" ");
  } else {
    return value;
  }
}
