class TableUtils {
  getChecked() {
    let checkboxes = document.querySelectorAll(".actionCheckbox:checked");
    let isChecked = [];
    checkboxes.forEach((checkbox) => isChecked.push(checkbox.value));
    return isChecked;
  }

  isLiters(unit) {
    return unit != "L" ? unit.toLowerCase() : unit;
  }

  formatDate(value) {
    return new Date(value).toLocaleDateString("pt-BR");
  }

  flashWarning() {
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

  get2First(cell, value) {
    if (value.split(" ").length > 2) {
      cell.title = value;
      cell.style.textDecoration = "underline";
      cell.style.textDecorationColor = "orange";

      return value.split(" ", 2).join(" ");
    } else {
      return value;
    }
  }

  unitNotation(value) {
    const quantity = value.match(/[0-9]/gi)
      ? value
          .match(/[^a-z]/gi)
          .join("")
          .replace(/\s+/g, "")
      : "1";
    let unit = value.match(/[a-z]/gi).join("").toUpperCase();
    unit = this.isLiters(unit);
    return quantity + unit;
  }

  periodToComma(value) {
    return `R$ ${value.replace(".", ",")}`;
  }

  createDiv(cell, value) {
    let div = document.createElement("div");
    div.classList.add(...["d-flex", "justify-content-between"]);
    div.innerText = value;
    this.createCheckbox(div, value);
    cell.append(div);
  }

  createCheckbox(cell, value) {
    let checkbox = document.createElement("input");
    checkbox.classList.add(...["actionCheckbox", "form-check-input"]);
    checkbox.type = "checkbox";
    checkbox.value = value;
    cell.appendChild(checkbox);
  }

  createNote(message) {
    const notes = document.querySelector("#alertWarning");
    notes.classList.remove("d-none");
    notes.classList.add("d-block");
    notes.innerHTML = message;

    setTimeout(() => {
      notes.classList.remove("d-block");
      notes.classList.add("d-none");
      notes.innerText = "";
    }, 5000);
  }
}

export const tableUtils = new TableUtils();
