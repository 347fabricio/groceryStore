class ApiConnector {
  async getX(id) {
    const request = await fetch(`http://localhost:5000/api/product/${id}`, {
      method: "GET",
    });
    const response = await request.json();
    return response;
  }

  async getALL() {
    const request = await fetch("http://localhost:5000/api/product", {
      method: "GET",
    });
    return await request.json();
  }

  async post(product) {
    const request = await fetch(`http://localhost:5000/api/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(product),
    });
    return await request.json();
  }

  async put(id, product) {
    const request = await fetch(`http://localhost:5000/api/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(product),
    });
    return await request.json();
  }

  async delete(id) {
    let really = confirm(`Você quer excluir este(s) produto(s?`);
    if (really) {
      const request = await fetch(`http://localhost:5000/api/product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(id),
      });
      return await request.json();
    }
  }
}

export const apiConnector = new ApiConnector();
