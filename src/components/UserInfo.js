export class UserInfo {
  #name = null;
  #info = null;
  #nameElement = null;
  #infoElement = null;
  #id = null;
  #avatar = null;
  #avatarElement = null;

  constructor(nameSelector, infoSelector, profileAvatarSelector) {
    this.#nameElement = document.querySelector(nameSelector);
    this.#infoElement = document.querySelector(infoSelector);
    this.#avatarElement = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this.#name,
      info: this.#info,
    };
  }

  setUserInfo({ name, info }) {
    this.#nameElement.textContent = name;
    this.#infoElement.textContent = info;
    this.#name = name;
    this.#info = info;
  }

  setAvatar(avatar) {
    this.#avatar = avatar;
    this.#avatarElement.src = avatar;
  }

  getAvatar() {
    return this.#avatar;
  }

  setId(id) {
    this.#id = id;
  }

  getId() {
    return this.#id;
  }
}
