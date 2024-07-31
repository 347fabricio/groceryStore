const myTable = document.querySelector(".products > tbody");
const sortUp = document.querySelectorAll(".sortUp");
const sortDown = document.querySelectorAll(".sortDown");

// select all trs
const sortAscending = {
  0: 1,
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
};

export const order = () => {
  sortUp.forEach((element, index) => {
    element.addEventListener("click", () => {
      const trs = [...document.querySelectorAll(".row")];
      ascendingOrder(trs, index);
    });
  });
  sortDown.forEach((element, index) => {
    element.addEventListener("click", () => {
      const trs = [...document.querySelectorAll(".row")];
      descendingOrder(trs, index);
    });
  });
};

function ascendingOrder(rows, index) {
  switch (index) {
    case 0:
    case 1:
    case 4:
    case 6:
      sortAscending[index] = 1;
      const getName = (tr) => tr.children[index].textContent;
      rows.sort((a, b) => getName(a).localeCompare(getName(b), "pt-BR", { numeric: true }) * sortAscending[index]);
      rows.forEach((tr) => myTable.appendChild(tr));
      break;

    case 2:
      sortAscending[index] = 1;
      const getPrice = (tr) => tr.children[index].textContent.replace(/^R\D/, "").replace(",", ".");
      rows.sort((a, b) => getPrice(a).localeCompare(getPrice(b), "pt-BR", { numeric: true }) * sortAscending[index]);
      rows.forEach((tr) => myTable.appendChild(tr));
      break;

    case 5:
    case 7:
    case 8:
      sortAscending[index] = 1;
      const getDate = (tr) => {
        const date = tr.children[index].textContent.split("/");
        let temp;
        temp = date[0];
        date[0] = date[1];
        date[1] = temp;
        return new Date(date);
      };
      rows.sort((a, b) => getDate(a) - getDate(b)); // a - b
      rows.forEach((tr) => myTable.appendChild(tr));
      break;

    case 9:
      sortAscending[index] = 1;
      const getText = (tr) => tr.children[index].textContent;
      rows.sort((a, b) => getText(a).localeCompare(getText(b)));
      rows.forEach((tr) => myTable.appendChild(tr));
      break;
  }
}

function descendingOrder(rows, index) {
  switch (index) {
    case 0:
    case 1:
    case 4:
    case 6:
      sortAscending[index] = -1;
      const getName = (tr) => tr.children[index].textContent;
      rows.sort((a, b) => getName(a).localeCompare(getName(b), "pt-BR", { numeric: true }) * sortAscending[index]);
      rows.forEach((tr) => myTable.appendChild(tr));
      break;

    case 2:
      sortAscending[index] = -1;
      const getPrice = (tr) => tr.children[index].textContent.replace(/^R\D/, "").replace(",", ".");
      rows.sort((a, b) => getPrice(a).localeCompare(getPrice(b), "pt-BR", { numeric: true }) * sortAscending[index]);
      rows.forEach((tr) => myTable.appendChild(tr));
      break;

    case 5:
    case 7:
    case 8:
      sortAscending[index] = -1;
      const getDate = (tr) => {
        const date = tr.children[index].textContent.split("/");
        let temp;
        temp = date[0];
        date[0] = date[1];
        date[1] = temp;
        return new Date(date);
      };
      rows.sort((a, b) => getDate(b) - getDate(a)); // b - a
      rows.forEach((tr) => myTable.appendChild(tr));
      break;

    case 9:
      sortAscending[index] = -1;
      const getText = (tr) => tr.children[index].textContent;
      rows.sort((a, b) => getText(b).localeCompare(getText(a)));
      rows.forEach((tr) => myTable.appendChild(tr));
      break;
  }
}
