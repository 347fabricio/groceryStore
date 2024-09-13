class WindowUtils {
  closeWindow(element) {
    const window = document.querySelector(element);
    document.querySelectorAll("#closeBtn").forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          document.querySelector(".container-fluid").classList.remove("dataSenderOpened");
          window.classList.remove("d-block");
          window.classList.add("d-none");
          this.unlockContent();
        },
        { once: true }
      );
    });
  }

  showExpiredProducts() {
    const expiredProducts = document.querySelector("#expiredOnes");
    expiredProducts.classList.remove("d-none");
    expiredProducts.classList.add("d-block");
  }

  toggleVisibility() {
    const table = document.querySelector(".container-fluid");
    table.classList.add("dataSenderOpened");
  }

  lockContent() {
    const content = document.querySelector("#content");

    [...content.children].forEach((child) => {
      child.classList.add(...["pe-none", "user-select-none"]);
    });
  }

  unlockContent() {
    const content = document.querySelector("#content");

    [...content.children].forEach((child) => child.classList.remove(...["pe-none", "user-select-none"]));
  }
}

export const windowUtils = new WindowUtils();
