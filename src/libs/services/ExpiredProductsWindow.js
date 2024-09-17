import * as bootstrap from "bootstrap";

class ExpiredProductsWindow {
  toPaint(element, exp) {
    switch (true) {
      case exp <= 0:
        [...element.children].forEach((child) => child.classList.add("opacity-25"));
        element.classList.add("text-decoration-line-through");
        this.tooltip(element, "Expirado");
        break;
      case exp <= 15:
        element.querySelector("#madeon").classList.add("text-decoration-underline");
        element.querySelector("#expireson").classList.add("text-decoration-underline");
        this.tooltip(element, "Expira em 15 dias");
        break;
      case exp <= 31:
        element.querySelector("#madeon").classList.add("text-decoration-underline");
        element.querySelector("#expireson").classList.add("text-decoration-underline");
        this.tooltip(element, "Expira em 31 dias");
        break;
    }
    document.querySelector("#expiredProducts tbody").append(element);
  }

  tooltip(parent, status) {
    parent.setAttribute("data-bs-toggle", "tooltip");
    parent.setAttribute("data-bs-placement", "right");
    parent.setAttribute("data-bs-title", status);
  }

  tooltipInit() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }
  cleanTable() {
    document.querySelector("#expiredOnes #closeBtn").addEventListener(
      "click",
      () => {
        document.querySelector("#expiredProducts tbody").remove();
        document.querySelector("#expiredProducts").appendChild(document.createElement("tbody"));
      },
      { once: true }
    );
  }

  isNearExpiration(expiredProducts) {
    const rows = document.querySelectorAll("#products tbody tr");
    rows.forEach((x) => {
      const target = x.querySelector("#id");
      if (expiredProducts["id"].includes(+target.innerText)) {
        const expiresIn = expiredProducts["difference"][expiredProducts["id"].indexOf(+target.innerText)];
        const newRow = target.parentNode.cloneNode(true);
        this.toPaint(newRow, expiresIn);
      }
    });
  }

  dateDiff(fst, snd) {
    return Math.round((snd - fst) / (1000 * 60 * 60 * 24));
  }

  today() {
    return parse(format(new Date(), "dd/MM/yyyy"), "dd/MM/yyyy", new Date());
  }

  getExpiredProductDates() {
    return Array.from(document.querySelectorAll("#products  #expireson"))
      .slice(1)
      .map((element) => {
        const [day, month, year] = element.innerText.split("/");
        return parse(`${day}/${month}/${year}`, "dd/MM/yyyy", new Date());
      });
  }
}

export const expiredProductsWindow = new ExpiredProductsWindow();
