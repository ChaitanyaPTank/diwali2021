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

  post(data) {
    this.addToken();
    return {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    }
  }

  get() {
    this.addToken();
    return {
      method: 'GET',
      headers,
    }
  }

  put(data) {
    this.addToken();
    return {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    }
  }

  delete() {
    this.addToken();
    return {
      method: 'DELETE',
      headers,
    }
  }
}

const options = new FetchOptions();

export default {
  getOrders: async (limit = 15, search = "") => {
    const result = await fetch(`${URL}/all`, options.post({ limit, search }));
    return await result.json();
  }
}