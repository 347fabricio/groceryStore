const getProducts = async () => {
  const response = await fetch("http://localhost:5000/product", {
    method: "GET",
  });
  const productResponse = await response.json();
  return productResponse;
};

export const setProducts = async () => {
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

  for (let row = 0; row < products.length; row++) {
    const tableRow = table.insertRow();
    tableRow.classList.add("row");

    for (let x = 0; x < columns.length; x++) {
      const cell = tableRow.insertCell();
      cell.className = columns[x];

      switch (x) {
        case 0:
          cell.innerText = products[row][columns[x]];
          createCheckbox(cell, products[row][columns[x]]);
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
  orderID();
};

function orderID() {
  const rows = document.querySelectorAll(".row > .id");
  const sortUps = document.querySelectorAll(".sortUp");

  sortUps.forEach((element, index) => {
    element.addEventListener("click", () => {
      let temp = [];
      rows.forEach((x) => temp.push(x.innerText));
      console.log(temp);
    });
  });

  // console.log(sortUps);
  // console.log(rows);
}

function createCheckbox(cell, value) {
  let checkbox = document.createElement("input");
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
