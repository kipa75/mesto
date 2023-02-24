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

  #hideValidationErrors({ error, input }) {
    const { inputErrorClass, errorClass } = this.#selectors;

    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  }

  #setButtonEnabled(button, form, { inputSelector, inactiveButtonClass }) {
    if (this.#checkAllInputs(form, inputSelector)) {
      button.classList.remove(inactiveButtonClass);
    }
    button.removeAttribute("disabled");
  }

  #setButtonDisabled(button, { inactiveButtonClass }) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute("disabled", "disabled");
  }

  #showValidationErrors({ error, input }) {
    const { inputErrorClass, errorClass } = this.#selectors;

    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }

  #checkValidation(input) {
    const {
      formSelector,
      submitButtonSelector,
      popupErrorSelector,
      inputWrapSelector,
      inactiveButtonClass,
      inputSelector,
    } = this.#selectors;

    const error = input
      .closest(inputWrapSelector)
      .querySelector(popupErrorSelector);
    const form = input.closest(formSelector);
    const button = form.querySelector(submitButtonSelector);

    if (input.validity.valid) {
      this.#hideValidationErrors({ error, input });
      this.#setButtonEnabled(button, form, {
        inputSelector,
        inactiveButtonClass,
      });
    } else {
      this.#showValidationErrors({ error, input, button });
      this.#setButtonDisabled(button, { inactiveButtonClass });
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

  static removeValidationErrors(
    form,
    { popupErrorSelector, submitButtonSelector, buttonDisabedClass }
  ) {
    const errors = form.querySelectorAll(popupErrorSelector);
    for (let i = 0; i < errors.length; i++) {
      errors[i].textContent = "";
    }

    const inputs = form.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        return;
      }
    }

    const button = form.querySelector(submitButtonSelector);
    button.classList.add(buttonDisabedClass);
    button.setAttribute("disabled", "disabled");
  }

  static disableSubmitButton(
    form,
    { inputErrorClass, errorClass, popupErrorSelector }
  ) {
    const inputs = form.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
      inputs[i].classList.remove(inputErrorClass);
    }

    const errors = form.querySelectorAll(popupErrorSelector);
    for (let i = 0; i < errors.length; i++) {
      errors[i].textContent = "";
      errors[i].classList.remove(errorClass);
    }
  }
}
