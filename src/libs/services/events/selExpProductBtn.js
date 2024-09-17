export default () => {
  const selectExpired = document.querySelector("#selExpProductBtn");
  selectExpired.addEventListener("click", () => {
    let checkbox = document.querySelectorAll("#expiredOnes .actionCheckbox");
    let expiredOnes = [];

    document.querySelectorAll("#expiredProducts tbody tr").forEach((x, y) => {
      if (x.dataset.bsTitle == "Expirado") expiredOnes.push(y);
    });
    expiredOnes.forEach((index) => (checkbox[index].checked = true));
  });
};
