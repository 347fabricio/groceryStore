const deleteButton = document.querySelector("#delProductBtn");
export const deleteProduct = () => {
  deleteButton.addEventListener("click", () => {
    let checkbox = document.querySelectorAll(".actionCheckbox:checked");
    let isChecked = [];
    checkbox.forEach((x) => isChecked.push(x.value));

    if (isChecked.length) {
      deleteChecked(isChecked);
    } else {
      flashWarning();
    }
  });
};

const deleteChecked = async (isChecked, value) => {
  let really = confirm(`Você quer excluir este(s) produto(s?`);
  if (really) {
    await fetch(`http://localhost:5000/product/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(isChecked),
    });
    location.reload();
  }
};

export function flashWarning() {
  const element = document.querySelectorAll(".actionCheckbox");

  let toggle = true;

  let blinkInterval = setInterval(() => {
    if (toggle) {
      element.forEach((x) => x.parentNode.classList.add("warn"));
      toggle = !toggle;
    } else {
      element.forEach((x) => x.parentNode.classList.remove("warn"));
      toggle = !toggle;
    }
  }, 100);

  setTimeout(() => clearInterval(blinkInterval), 1000);
}
