function checkAllInputs(form, inputSelector) {
  const inputs = form.querySelectorAll(inputSelector);
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      return false;
    }
  }
  return true;
}

function checkValidation(
  input,
  {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) {
  const error = input.closest("div").querySelector(".popup__error");
  const form = input.closest(formSelector);
  const button = form.querySelector(submitButtonSelector);

  if (input.validity.valid) {
    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
    if (checkAllInputs(form, inputSelector)) {
      button.classList.remove(inactiveButtonClass);
    }
  } else {
    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
    button.classList.add(inactiveButtonClass);
  }
}

function setValidateInput(input, props) {
  input.addEventListener("input", (e) => checkValidation(e.target, props));
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const forms = document.querySelectorAll(formSelector);
  for (let i = 0; i < forms.length; i++) {
    const inputs = forms[i].querySelectorAll(inputSelector);
    for (let j = 0; j < inputs.length; j++) {
      setValidateInput(inputs[j], {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
      });
    }
  }
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
