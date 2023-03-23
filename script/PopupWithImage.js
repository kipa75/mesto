import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(link, text) {
    document.querySelector(".popup-image__image").style.backgroundImage =
      "url(" + link + ")";
    document.querySelector(".popup-image__title").textContent = text;
    super.open();
  }
}
