import { PopupWithStatus } from "./PopupWithStatus";

export class PopupWithForm extends PopupWithStatus {
  #onSubmit = null;
  #onSubmitSuccess = null;
  #form = null;
  #inputs = [];

  constructor(selector, { onSubmit, onSubmitSuccess }) {
    super(selector);
    this.#onSubmit = onSubmit;
    this.#onSubmitSuccess = onSubmitSuccess;
    this.#form = this.getPopup().querySelector("form");
    this.#inputs = this.getPopup().querySelectorAll("input");
    this.#setEventListeners();
  }

  #setEventListeners = () => {
    this.#form.addEventListener("submit", this.#handleSubmit);
  };

  #handleSubmit = (evt) => {
    evt.preventDefault();
    this.#onSubmit(this.#getInputValues()).then(() =>
      this.#onSubmitSuccess(this.#form)
    );
  };

  #getInputValues = () => {
    const values = {};

    for (let i = 0; i < this.#inputs.length; i++) {
      values[this.#inputs[i].name] = this.#inputs[i].value;
    }
    return values;
  };

  close() {
    super.close();
    this.#form.reset();
  }
}
