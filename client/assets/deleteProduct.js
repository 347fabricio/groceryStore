const deleteButton = document.querySelector("#deleteProduct");
export const deleteProduct = () => {
  deleteButton.addEventListener("click", () => {
    let checkbox = document.querySelectorAll(".row > .id > input[type='checkbox']:checked");
    let isChecked = [];
    checkbox.forEach((x) => isChecked.push(x.value));

    if (isChecked.length) {
      deleteChecked(isChecked);
    } else {
      console.log(isChecked.length);
      flashWarning();
    }
  });
};

const deleteChecked = async (isChecked) => {
  const deleteResponse = await fetch(`http://localhost:5000/product/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(isChecked),
  });
  location.reload();
};

function flashWarning() {
  const element = document.querySelectorAll(".row > .id");
  let toggle = true;

  let blinkInterval = setInterval(() => {
    if (toggle) {
      element.forEach((x) => x.classList.add("warn"));
      toggle = !toggle;
    } else {
      element.forEach((x) => x.classList.remove("warn"));
      toggle = !toggle;
    }
  }, 100);

  setTimeout(() => clearInterval(blinkInterval), 1000);
}
