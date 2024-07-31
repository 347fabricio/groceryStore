import { tableCreate } from "./expiredOnesWindow.js";
import { closeWindow } from "./dataSenderWindow.js";

const expiredProductBtn = document.querySelector("#expiredProductBtn");

export const expiredProducts = () => {
  expiredProductBtn.addEventListener("click", () => {
    lockContent();
    createNewTable();
    removeWindow();
  });
};

function createNewTable() {
  const container = document.querySelector(".container-fluid");
  container.classList.add("dataSenderOpened");

  const expiredProductWindow = document.createElement("div");
  expiredProductWindow.id = "expiredOnes";
  expiredProductWindow.classList.add("container");

  const fakeTable = document.querySelector("#products").cloneNode();
  const thead = document.querySelector("#products > thead").cloneNode(true);
  const tbody = document.createElement("tbody");
  fakeTable.classList.add("m-0");
  fakeTable.classList.remove("table-hover");
  fakeTable.append(thead);
  fakeTable.appendChild(tbody);
  thead.querySelectorAll(".sortImgs").forEach((div) => div.remove());

  const [day, month, year] = new Date().toLocaleDateString("pt-BR").split("/");
  const today = new Date(`${month}-${day}-${year}`);

  const expiresOn = Array.from(document.querySelectorAll("#expireson")).map((element) => {
    const [day, month, year] = element.innerText.split("/");
    return new Date(`${month}-${day}-${year}`);
  });

  const rows = document.querySelectorAll(".tRow");
  expiresOn.forEach((_, index) => {
    const expirationDate = dateDiff(today, expiresOn[index]);

    switch (true) {
      case expirationDate <= 0:
        const newRow0 = rows[index].cloneNode(true);
        deleteExpiredOnes.push(index);
        toPaint(newRow0, "expired");
        tbody.append(newRow0);
        break;
      case expirationDate > 0 && expirationDate <= 15:
        const newRow1 = rows[index].cloneNode(true);
        console.log(expirationDate, index);
        toPaint(newRow1, "within15");
        tbody.append(newRow1);
        break;
      case expirationDate > 15 && expirationDate <= 31:
        console.log(expirationDate, index);
        const newRoW2 = rows[index].cloneNode(true);
        toPaint(newRoW2, "within31");
        tbody.append(newRoW2);
        break;
    }
  });
  tbody.querySelectorAll(".actionCheckbox").forEach((div) => div.remove());

  const closeBtn = document.querySelector("#closeBtn").cloneNode(true);
  closeBtn.removeAttribute("id");
  closeBtn.classList.remove("btn-danger");
  closeBtn.classList.add("btn-dark");
  closeBtn.id = "closeExpiredOnesBtn";

  expiredProductWindow.classList.add(
    ...["d-block", "w-100", "rounded", "position-absolute", "top-50", "start-50", "translate-middle"]
  );
  expiredProductWindow.classList.add("pTable");
  expiredProductWindow.append(fakeTable);
  expiredProductWindow.appendChild(closeBtn);
  document.body.append(expiredProductWindow);
}

let deleteExpiredOnes = [];

function dateDiff(fst, snd) {
  return Math.round((snd - fst) / (1000 * 60 * 60 * 24));
}

function toPaint(element, attr) {
  const ball = document.createElement("figure");

  switch (attr) {
    case "expired":
      [...element.children].forEach((child) => child.classList.add("opacity-25"));
      element.classList.add("text-decoration-line-through");
      ball.title = "Expirado";
      break;
    case "within15":
      element.querySelector("#madeon").classList.add("text-decoration-underline");
      element.querySelector("#expireson").classList.add("text-decoration-underline");
      ball.title = "< 15 Dias";
    default:
      element.querySelector("#madeon").classList.add("text-decoration-underline");
      element.querySelector("#expireson").classList.add("text-decoration-underline");
      ball.title = "< 31 Dias";
      break;
  }

  ball.classList.add("circle");
  ball.id = attr;
  element.appendChild(ball);
}

export function lockContent() {
  const content = document.querySelector("#content");
  const classesToAdd = ["pe-none", "user-select-none"];

  [...content.children].forEach((child) => {
    child.classList.add(...classesToAdd);
  });
}

export function unlockContent() {
  const content = document.querySelector("#content");
  const classesToDel = ["pe-none", "user-select-none"];
  [...content.children].forEach((child) => child.classList.remove(...classesToDel));
}

function removeWindow() {
  const main = document.querySelector(".container-fluid");
  const closeBtn = document.querySelector("#closeExpiredOnesBtn");
  const window = document.querySelector("#expiredOnes");

  closeBtn.addEventListener("click", () => {
    const check = confirm("Selecionar produto(s) vencido(s)?");
    if (check) {
      deleteExpiredOnes.forEach((index) => (document.querySelectorAll(".actionCheckbox")[index].checked = true));
    }

    unlockContent();
    main.classList.remove("dataSenderOpened");
    window.remove();
  });
}
