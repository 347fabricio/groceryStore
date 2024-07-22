import { getEmpty, productDetails } from "./filledChecker.js";
import { dataSenderWindow, closeWindow } from "./dataSenderWindow.js";
const addProduct = document.querySelector("#addProduct");
const container = document.querySelector(".container");

export const newProduct = () => {
  addProduct.addEventListener("click", async () => {
    container.classList.add("dataSenderOpened");
    dataSenderWindow();
    closeWindow();
    sendData();
  });
};

const sendData = () => {
  const submitData = document.querySelector(".btnSubmit");
  submitData.addEventListener("click", async () => {
    if (getEmpty()) {
      await fetch(`http://localhost:5000/product/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(productDetails),
      });
      location.reload();
    }
  });
};
