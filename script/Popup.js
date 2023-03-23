export class Popup {
  #popup = null;
  #listeners = {};

  getPopup() {
    return this.#popup;
  }

  getListeners() {
    return this.#listeners;
  }

  constructor(selector) {
    this.#popup = document.querySelector(selector);
    this.#popup.addEventListener("click", (e) => this.#handleClosePopup(e));
    this.#popup
      .querySelector(".popup__close-icon")
      .addEventListener("click", (e) => this.#handleClosePopupByIcon(e));
    document.addEventListener("keyup", (e) => this.#handleEscClose(e));
  }

  #fire() {
    this.#listeners["click"] && this.#listeners["click"]();
  }

  #handleClosePopup(e) {
    if (e.target === e.target.closest(".popup")) {
      close(e.target);
      this.#fire();
    }
  }

  #handleClosePopupByIcon() {
    this.#fire();
    this.close();
  }

  open() {
    this.getPopup().classList.add("popup_opened");
  }

  close() {
    this.getPopup().classList.remove("popup_opened");
  }

  #handleEscClose(e) {
    if (e.key === "Escape") {
      const popup = document.querySelector(".popup_opened");
      if (popup === this.getPopup()) {
        closePopup(popup);
        this.#fire();
      }
    }
  }

  setEventListeners(listeners) {
    this.listeners = listeners;
  }
}
