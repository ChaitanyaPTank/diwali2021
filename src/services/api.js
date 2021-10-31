const URL = 'http://localhost:80'
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
    return await result.json();
  }
}