class CellOrdering {
  constructor() {
    this.cells = {
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
  }
  order() {
    // const this.cells = {
    //   0: 1,
    //   1: 1,
    //   2: 1,
    //   3: 1,
    //   4: 1,
    //   5: 1,
    //   6: 1,
    //   7: 1,
    //   8: 1,
    //   9: 1,
    // };

    const sortUp = document.querySelectorAll(".sortUp");
    const sortDown = document.querySelectorAll(".sortDown");

    sortUp.forEach((element, index) => {
      element.addEventListener("click", () => {
        const trs = [...document.querySelectorAll(".tRow")];
        this.ascendingOrder(trs, index);
      });
    });
    sortDown.forEach((element, index) => {
      element.addEventListener("click", () => {
        const trs = [...document.querySelectorAll(".tRow")];
        this.descendingOrder(trs, index);
      });
    });
  }

  ascendingOrder(rows, index) {
    const table = document.querySelector("#products > tbody");
    switch (index) {
      case 0:
      case 1:
      case 4:
      case 6:
        this.cells[index] = 1;
        const getName = (tr) => tr.children[index].textContent;
        rows.sort((a, b) => getName(a).localeCompare(getName(b), "pt-BR", { numeric: true }) * this.cells[index]);
        rows.forEach((tr) => table.appendChild(tr));
        break;

      case 2:
        this.cells[index] = 1;
        const getPrice = (tr) => tr.children[index].textContent.replace(/^R\D/, "").replace(",", ".");
        rows.sort((a, b) => getPrice(a).localeCompare(getPrice(b), "pt-BR", { numeric: true }) * this.cells[index]);
        rows.forEach((tr) => table.appendChild(tr));
        break;

      case 5:
      case 7:
      case 8:
        this.cells[index] = 1;
        const getDate = (tr) => {
          const date = tr.children[index].textContent.split("/");
          let temp;
          temp = date[0];
          date[0] = date[1];
          date[1] = temp;
          return new Date(date);
        };
        rows.sort((a, b) => getDate(a) - getDate(b)); // a - b
        rows.forEach((tr) => table.appendChild(tr));
        break;

      case 9:
        this.cells[index] = 1;
        const getText = (tr) => tr.children[index].textContent;
        rows.sort((a, b) => getText(a).localeCompare(getText(b)));
        rows.forEach((tr) => table.appendChild(tr));
        break;
    }
  }

  descendingOrder(rows, index) {
    const table = document.querySelector("#products > tbody");
    switch (index) {
      case 0:
      case 1:
      case 4:
      case 6:
        this.cells[index] = -1;
        const getName = (tr) => tr.children[index].textContent;
        rows.sort((a, b) => getName(a).localeCompare(getName(b), "pt-BR", { numeric: true }) * this.cells[index]);
        rows.forEach((tr) => table.appendChild(tr));
        break;

      case 2:
        this.cells[index] = -1;
        const getPrice = (tr) => tr.children[index].textContent.replace(/^R\D/, "").replace(",", ".");
        rows.sort((a, b) => getPrice(a).localeCompare(getPrice(b), "pt-BR", { numeric: true }) * this.cells[index]);
        rows.forEach((tr) => table.appendChild(tr));
        break;

      case 5:
      case 7:
      case 8:
        this.cells[index] = -1;
        const getDate = (tr) => {
          const date = tr.children[index].textContent.split("/");
          let temp;
          temp = date[0];
          date[0] = date[1];
          date[1] = temp;
          return new Date(date);
        };
        rows.sort((a, b) => getDate(b) - getDate(a)); // b - a
        rows.forEach((tr) => table.appendChild(tr));
        break;

      case 9:
        this.cells[index] = -1;
        const getText = (tr) => tr.children[index].textContent;
        rows.sort((a, b) => getText(b).localeCompare(getText(a)));
        rows.forEach((tr) => table.appendChild(tr));
        break;
    }
  }
}

export const cellOrdering = new CellOrdering();
