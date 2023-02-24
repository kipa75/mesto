export class FormValidator {
  #form = null;
  #selectors = null;

  constructor(form, selectors) {
    this.#form = form;
    this.#selectors = selectors;
  }

  #checkAllInputs() {
    const { inputSelector } = this.#selectors;
    const inputs = this.#form.querySelectorAll(inputSelector);
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].validity.valid) {
        return false;
      }
    }
    return true;
  }

  #handleSubmit(e) {
    const { submitButtonSelector, inactiveButtonClass } = this.#selectors;
    setTimeout(() => {
      e.target.reset();
      const button = e.target.querySelector(submitButtonSelector);
      button.setAttribute("disabled", "disabled");
      button.classList.add(inactiveButtonClass);
    });
  }

  #hideValidationErrors({ error, input, button, form }) {
    const { inputSelector, inactiveButtonClass, inputErrorClass, errorClass } =
      this.#selectors;

    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
    if (this.#checkAllInputs(form, inputSelector)) {
      button.classList.remove(inactiveButtonClass);
    }
    button.removeAttribute("disabled");
  }

  #showValidationErrors({ error, input, button }) {
    const { inactiveButtonClass, inputErrorClass, errorClass } =
      this.#selectors;

    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
    button.classList.add(inactiveButtonClass);
    button.setAttribute("disabled", "disabled");
  }

  #checkValidation(input) {
    const {
      formSelector,
      submitButtonSelector,
      popupErrorSelector,
      inputWrapSelector,
    } = this.#selectors;

    const error = input
      .closest(inputWrapSelector)
      .querySelector(popupErrorSelector);
    const form = input.closest(formSelector);
    const button = form.querySelector(submitButtonSelector);

    if (input.validity.valid) {
      this.#hideValidationErrors({ error, input, button, form });
    } else {
      this.#showValidationErrors({ error, input, button });
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
    const { inputSelector } = this.#selectors;

    this.#form.addEventListener("submit", (e) => this.#handleSubmit(e), false);

    const inputs = this.#form.querySelectorAll(inputSelector);
    for (let j = 0; j < inputs.length; j++) {
      this.#setValidateInput(inputs[j]);
    }
  }
}
