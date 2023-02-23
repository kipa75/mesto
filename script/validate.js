import { FormValidator } from "./FormValidator.js";

function enableValidation(selectors) {
  const forms = document.querySelectorAll(selectors.formSelector);
  for (let i = 0; i < forms.length; i++) {
    const validator = new FormValidator(forms[i], selectors);
    validator.validate();
  }
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  popupSelector: ".popup",
  popupErrorSelector: ".popup__error",
  inputWrapSelector: ".popup__input-wrap",
});
