import { getEmpty, productDetails } from "./filledChecker.js";
import { dataSenderWindow, closeWindow } from "./dataSenderWindow .js";
const addProduct = document.querySelector("#addProduct");
const container = document.querySelector(".container");

let toggleDataSender = false;

export const newProduct = () => {
  addProduct.addEventListener("click", async () => {
    toggleDataSender = !toggleDataSender;
    if (toggleDataSender) {
      container.classList.add("dataSenderOpened");
      dataSenderWindow();
      closeWindow();
      sendData();
    } else {
      container.classList.remove("dataSenderOpened");
      document.querySelector(".dataSender").remove();
    }
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
