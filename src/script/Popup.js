export class Popup {
  #popup = null;

  getPopup() {
    return this.#popup;
  }

  #setListeners() {
    this.#popup.addEventListener("click", this.#handleClosePopup);
    this.#popup
      .querySelector(".popup__close-icon")
      .addEventListener("mousedown", this.#handleClosePopupByIcon);
  }

  constructor(selector) {
    this.#popup = document.querySelector(selector);
    this.#setListeners();
  }

  #handleClosePopup = (evt) => {
    if (evt.target.closest(".popup") === evt.target) {
      this.close();
    }
  };

  #handleClosePopupByIcon = () => {
    this.close();
  };

  open() {
    this.getPopup().classList.add("popup_opened");
    document.addEventListener("keyup", this.#handleEscClose);
  }

  close() {
    this.getPopup().classList.remove("popup_opened");
    document.removeEventListener("keyup", this.#handleEscClose);
  }

  #handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };
}
