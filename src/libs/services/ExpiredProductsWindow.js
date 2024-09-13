import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { format } from "../../../../node_modules/date-fns/format.mjs";
import { parse } from "../../../../node_modules/date-fns/parse.mjs";

class ExpiredProductsWindow {
  toPaint(element, exp) {
    const ball = document.createElement("figure");

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

  isNearExpiration() {
    const today = this.today();
    const expiresOn = this.getExpiredProductDates();
    const rows = document.querySelectorAll("#products  tbody tr");

    expiresOn.map((product, index) => {
      const isExpired = this.dateDiff(today, product);
      if (isExpired <= 31) {
        const newRow = rows[index].cloneNode(true);
        this.toPaint(newRow, isExpired);
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
