import { unlockContent } from "./expiredProducts.js";

const container = document.querySelector(".container-fluid");

export const dataSenderWindow = () => {
  dSWindow.classList.remove("d-none");
  dSWindow.classList.add("d-block");
};

export const closeWindow = (element) => {
  const closeBtn = document.querySelector("#closeBtn");
  const window = document.querySelector(element);
  closeBtn.addEventListener("click", async () => {
    container.classList.remove("dataSenderOpened");
    window.classList.remove("d-block");
    window.classList.add("d-none");
    unlockContent();
  });
};
