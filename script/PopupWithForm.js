import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(selector, onSubmit) {
    super(selector);
    this.getPopup().querySelector("form").addEventListener("submit", onSubmit);
  }

  #getInputValues() {
    const inputs = this.getPopup().querySelectorAll("input");
    const values = {};

    for (let i = 0; i < inputs; i++) {
      values[inputs[i].name] = inputs[i].value;
    }
  }

  open() {
    super.open();
    const button = this.getPopup().querySelector(".popup__button");
    button.classList.add("popup__button_disabled");
    button.setAttribute("disabled", "disabled");
  }

  close() {
    super.close();
    this.getPopup().querySelector("form").reset();
  }
}
