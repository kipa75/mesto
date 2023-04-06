import { Popup } from "./Popup";

export class PopupWithStatus extends Popup {
  #button = null;
  #submitBtnText = "";

  constructor(selector) {
    super(selector);
    this.#button = this.getPopup().querySelector(".popup__button");
    this.#submitBtnText = this.#button.textContent;
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this.#button.textContent = loadingText;
    } else {
      this.#button.textContent = this.#submitBtnText;
    }
  }
}
