import { api } from "./Api";

export class UserInfo {
  #name = null;
  #info = null;

  constructor(nameSelector, infoSelector) {
    this.#name = document.querySelector(nameSelector);
    this.#info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return api.getUser();
  }

  setUserInfo({ name, info }) {
    this.#name.textContent = name;
    this.#info.textContent = info;

    return api.setUser({ name, info });
  }

  updateInfo() {
    return this.getUserInfo().then(({ name, info, id, avatar }) => {
      this.#name.textContent = name;
      this.#info.textContent = info;

      return {
        name,
        info,
        id,
        avatar,
      };
    });
  }
}
