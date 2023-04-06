const TOKEN = "6e043463-4d63-4149-8c95-b3311e9b7002";
const GROUP = "cohort-62";

class Api {
  #options = {};

  constructor(options) {
    this.#options = options;
  }

  #request(url, method = "GET", body = undefined) {
    const { baseUrl, headers } = this.#options;
    return fetch(baseUrl + url, {
      method: method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return this.#request("/cards");
  }

  addCard({ name, link }) {
    return this.#request("/cards", "POST", { name, link });
  }

  removeCard(id) {
    return this.#request("/cards/" + id, "DELETE");
  }

  getUser() {
    return this.#request("/users/me").then(({ name, about, _id, avatar }) => ({
      name,
      info: about,
      id: _id,
      avatar,
    }));
  }

  setUser({ name, info }) {
    return this.#request("/users/me", "PATCH", { name, about: info });
  }

  like(cardId) {
    return this.#request(`/cards/${cardId}/likes`, "PUT");
  }

  unlike(cardId) {
    return this.#request(`/cards/${cardId}/likes`, "DELETE");
  }

  uploadAvatar(url) {
    return this.#request("/users/me/avatar", "PATCH", { avatar: url });
  }
}

export const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${GROUP}`,
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
});
