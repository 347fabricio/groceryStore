import { getEmpty, productDetails, periodToComma, todaysDate } from "./filledChecker.js";
import { dataSenderWindow, closeWindow } from "./dataSenderWindow.js";
import { lockContent } from "./expiredProducts.js";
const addProduct = document.querySelector("#addProductBtn");
const container = document.querySelector(".container-fluid");

export const newProduct = () => {
  addProduct.addEventListener("click", async () => {
    container.classList.add("dataSenderOpened");
    lockContent();
    dataSenderWindow();
    periodToComma();
    todaysDate();
    closeWindow("#dSWindow");
    sendData();
  });
};

const sendData = () => {
  const submitData = document.querySelector("#btnSubmit");
  submitData.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      if (getEmpty()) {
        await fetch(`http://localhost:5000/product/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(productDetails),
        });
        location.reload();
      }
    } catch (err) {
      throw new Error(err);
    }
    return false;
  });
};
