import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  #image = null;
  #title = null;

  constructor(selector) {
    super(selector);
    this.#image = document.querySelector(".popup-image__image");
    this.#title = document.querySelector(".popup-image__title");
  }

  open(link, text) {
    this.#image.style.backgroundImage = "url(" + link + ")";
    this.#title.textContent = text;
    super.open();
  }
}
