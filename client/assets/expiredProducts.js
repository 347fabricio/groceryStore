const expiredProductBtn = document.querySelector(".expiredProductBtn");

export const expiredProducts = () => {
  expiredProductBtn.addEventListener("click", () => {
    const rows = document.querySelectorAll(".row");
    const madeOn = Array.from(document.querySelectorAll(".madeon")).map((element) => {
      const [day, month, year] = element.innerText.split("/");
      return new Date(`${month}-${day}-${year}`);
    });

    const expiresOn = Array.from(document.querySelectorAll(".expireson")).map((element) => {
      const [day, month, year] = element.innerText.split("/");
      return new Date(`${month}-${day}-${year}`);
    });

    madeOn.forEach((element, index) => {
      const expirationDate = dateDiff(element, expiresOn[index]);

      if (expirationDate <= 31) {
        rows[index].classList.add("expiredProduct");
        removeBgColor(rows[index]);
      }
    });
  });
};

function dateDiff(fst, snd) {
  return Math.round((snd - fst) / (1000 * 60 * 60 * 24));
}

function removeBgColor(element) {
  setTimeout(() => element.classList.remove("expiredProduct"), 3000);
}
