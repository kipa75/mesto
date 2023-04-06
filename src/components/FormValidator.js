export class FormValidator {
  #form = null;
  #selectors = null;
  #inputs = [];
  #button = null;
  #errors = [];

  constructor(form, selectors) {
    this.#form = form;
    this.#selectors = selectors;
    const { inputSelector, submitButtonSelector, popupErrorSelector } =
      this.#selectors;
    this.#inputs = this.#form.querySelectorAll(inputSelector);
    this.#button = this.#form.querySelector(submitButtonSelector);
    this.#errors = this.#form.querySelectorAll(popupErrorSelector);
  }

  #checkAllInputs() {
    for (let i = 0; i < this.#inputs.length; i++) {
      if (!this.#inputs[i].validity.valid) {
        return false;
      }
    }
    return true;
  }

  setInputValues(data) {
    for (let j = 0; j < this.#inputs.length; j++) {
      this.#inputs[j].value = data[this.#inputs[j].name];
    }
  }

  reset = () => {
    this.#setButtonDisabled();

    for (let i = 0; i < this.#errors.length; i++) {
      this.#errors[i].textContent = "";
    }

    const { inputErrorClass, errorClass } = this.#selectors;
    for (let i = 0; i < this.#inputs.length; i++) {
      this.#inputs[i].classList.remove(inputErrorClass);
    }

    for (let i = 0; i < this.#errors.length; i++) {
      this.#errors[i].textContent = "";
      this.#errors[i].classList.remove(errorClass);
    }
  };

  #hideValidationErrors({ error, input }) {
    const { inputErrorClass, errorClass } = this.#selectors;

    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  }

  #setButtonEnabled() {
    const { inactiveButtonClass } = this.#selectors;
    if (this.#checkAllInputs()) {
      this.#button.classList.remove(inactiveButtonClass);
    }
    this.#button.removeAttribute("disabled");
  }

  #setButtonDisabled() {
    const { inactiveButtonClass } = this.#selectors;
    this.#button.classList.add(inactiveButtonClass);
    this.#button.setAttribute("disabled", "disabled");
  }

  #showValidationErrors({ error, input }) {
    const { inputErrorClass, errorClass } = this.#selectors;

    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }

  #checkValidation(input) {
    const { popupErrorSelector, inputWrapSelector } = this.#selectors;

    const error = input
      .closest(inputWrapSelector)
      .querySelector(popupErrorSelector);

    if (input.validity.valid) {
      this.#hideValidationErrors({ error, input });
      this.#setButtonEnabled();
    } else {
      this.#showValidationErrors({ error, input, button: this.#button });
      this.#setButtonDisabled();
    }
  }

  #setValidateInput(input) {
    input.addEventListener(
      "input",
      (e) => this.#checkValidation(e.target),
      false
    );
  }

  enableValidation() {
    for (let j = 0; j < this.#inputs.length; j++) {
      this.#setValidateInput(this.#inputs[j]);
    }
  }
}
