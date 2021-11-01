const URL = 'http://localhost:8085'
// const URL = 'https://diwali2021backend.eu-gb.mybluemix.net'
const headers = {
  "Content-Type": "application/json",
}


class FetchOptions {

  addToken() {
    const token = localStorage.getItem('token')
    if (token) {
      headers.Authorization = token;
    }
  }

  async post(url, data) {
    this.addToken();
    return await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async get(url) {
    this.addToken();
    return await fetch(url, {
      method: 'GET',
      headers,
    });
  }

  async put(url, data) {
    this.addToken();
    return await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    });
  }

  async delete(url) {
    this.addToken();
    return await fetch(url, {
      method: 'DELETE',
      headers,
    });
  }
}

const options = new FetchOptions();

export default {
  getOrders: async (...data) => {
    const result = await options.post(`${URL}/all`, ...data);
    return await result.json();
  },

  submitOrder: async (id) => {
    const result = await options.post(`${URL}/submit-order`, { id });
    console.log(result);
    return { code: result.status, result: await result.json() };
  },

  getStock: async () => {
    const result = await options.get(`${URL}/get-stock`);
    return await result.json();
  }
}