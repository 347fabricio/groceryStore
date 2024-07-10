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
  // console.log(products);

  const formatDate = (i, j) => {
    let date = new Date(products[i][columns[j]]).toLocaleDateString("pt-BR");

    return date;
  };

  for (let i = 0; i < products.length; i++) {
    const row = table.insertRow();
    row.classList.add("row");
    for (let j = 0; j < columns.length; j++) {
      const cell = row.insertCell();
      cell.className = columns[j];
      switch (j) {
        case 0:
          cell.innerText = products[i][columns[j]];
          createCheckbox(cell, products[i][columns[j]]);
          break;
        case 2:
          cell.innerText = `R$ ${products[i][columns[j]]}`;
          break;
        case 5:
          cell.innerText = formatDate(i, j);
          break;
        case 7:
          cell.innerText = formatDate(i, j);
          break;
        case 8:
          cell.innerText = formatDate(i, j);
          break;
        case 9:
          cell.innerText = get2First(cell, products[i][columns[j]]);
          break;
        default:
          cell.innerText = products[i][columns[j]];
      }
    }
  }
};

function createCheckbox(element, value) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = value;
  element.appendChild(checkbox);
}

function get2First(cell, element) {
  if (element.split(" ").length > 2) {
    cell.title = element;
    cell.style.textDecoration = "underline";

    return element
      .split(" ", 2)
      .join(" ")
      .match(/^(\w+\s\w+)/)[0];
  } else {
    return element;
  }
}
