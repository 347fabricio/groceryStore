import { toggleVisibility } from "./updateProduct.js";
import { closeWindow } from "./dataSenderWindow.js";

export function tableCreate(copy) {
  const div = document.createElement("div"),
    table = document.createElement("table");
  div.classList.add("div-expiredOnes");
  table.classList.add("table-expiredOnes");
  const closeBtn = createCloseBtn();

  for (let i = 0; i < copy.length; i++) {
    const tr = table.insertRow();
    tr.id = copy[i][1];

    tr.classList.add("row-expiredOnes");
    for (let j = 0; j < copy[i][0].children.length; j++) {
      const td = tr.insertCell();
      td.innerText = `${copy[i][0].children[j].innerText}`;
    }

    div.append(table);
  }

  toggleVisibility();
  document.body.append(div);
  createColorTip(div);
  div.append(closeBtn);

  closeWindow(".div-expiredOnes");
}

function createColorTip(parent) {
  const div = document.createElement("div"),
    btn = document.createElement("button");
  div.classList.add("colorTip");
  createButtons(div, btn);

  parent.append(div);
}

function createButtons(div, button) {
  for (let i = 0; i < 3; i++) {
    const btn = button.cloneNode();
    switch (i) {
      case 0:
        btn.innerText = "< 31";
        btn.id = "within31";
        break;
      case 1:
        btn.innerText = "< 15";
        btn.id = "within15";
        break;
      case 2:
        btn.innerText = "Vencido";
        btn.id = "expired";
        break;
    }
    div.appendChild(btn);
  }
}

function createCloseBtn() {
  const closeBtn = document.createElement("button"),
    img = document.createElement("img");

  img.src = "./assets/close.svg";
  closeBtn.appendChild(img);
  closeBtn.classList.add("closeBtn");

  return closeBtn;
}
