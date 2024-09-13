class LoginApiConnector {
  async post(username, password) {
    return fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
  }
}

export const loginApiConnector = new LoginApiConnector();
