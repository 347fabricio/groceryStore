import { loginApiConnector } from "../../libs/API/LoginApiConnector.js";

const submit = document.querySelector("#loginBtn");
submit.addEventListener("click", async (event) => {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  event.preventDefault();

  const request = await loginApiConnector.post(username, password);
  const response = await request.json();
  if (response.Error) alert(response.Error);
  if (response.redirect) document.location.href = response.redirect;
});
