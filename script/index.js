import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

function checkForm(form) {
  if (!form) {
    return;
  }

  const errors = form.querySelectorAll(".popup__error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }

  const inputs = form.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value) {
      return;
    }
  }

  const button = form.querySelector(".popup__button");
  button.classList.add("popup__button_disabled");
  button.setAttribute("disabled", "disabled");
}

function resetForm(form) {
  if (!form) {
    return;
  }

  const inputs = form.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].classList.remove("popup__input_type_error");
  }

  const errors = form.querySelectorAll(".popup__error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
    errors[i].classList.remove("popup__error_visible");
  }
}

function handleRemove(evt) {
  const item = evt.target.closest(".elements__list-item");
  item.remove();
}

function handleLike(evt) {
  evt.preventDefault();
  evt.target.classList.toggle("elements__like-container_like");
}

function openPopup(popup) {
  checkForm(popup.querySelector(".popup__form"));
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleClosePopup);
  document.addEventListener("keyup", handleKeyPress);
}

function closePopup(popup) {
  resetForm(popup.querySelector(".popup__form"));
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", handleClosePopup);
  document.removeEventListener("keyup", handleKeyPress);
}

function handleClosePopup(e) {
  if (e.target === e.target.closest(".popup")) {
    closePopup(e.target);
  }
}

function handleKeyPress(e) {
  if (e.key == "Escape") {
    const popup = document.querySelector(".popup_opened");
    if (popup) {
      closePopup(popup);
    }
  }
}

function openImagePopup(link, text) {
  popupImageImage.style.backgroundImage = "url(" + link + ")";
  popupImageTitle.textContent = text;
  openPopup(popupImage);
}

function handleOpenImagePopup(evt) {
  evt.stopPropagation();
  openImagePopup(
    evt.target.src,
    evt.target.closest(".elements__list-item").querySelector(".elements__text")
      .textContent
  );
}

function handleButtonEditClick(evt) {
  evt.preventDefault();
  const name = profileName.textContent;
  const job = profileJob.textContent;
  formName.value = name;
  formJob.value = job;
  openPopup(popupEdit);
}

function handleButtonAddClick(evt) {
  evt.preventDefault();
  openPopup(popupAdd);
}

function handleClosePopupImageClick(evt) {
  evt.preventDefault();
  closePopup(popupImage);
}

buttonEdit.addEventListener("click", handleButtonEditClick, false);

buttonAdd.addEventListener("click", handleButtonAddClick, false);

popupImageClose.addEventListener("click", handleClosePopupImageClick, false);

function popupCloseIconClick(evt) {
  closePopup(evt.target.closest(".popup"));
}

function createCard(name, link) {
  const el = new Card(
    name,
    link,
    ".card-template",
    {
      image: ".elements__image",
      remove: ".elements__remove",
      text: ".elements__text",
      like: ".elements__like-container",
    },
    { handleOpenImagePopup, handleRemove, handleLike }
  );

  return el;
}

popupEditCloseIcon.addEventListener("click", popupCloseIconClick, false);
popupAddCloseIcon.addEventListener("click", popupCloseIconClick, false);

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = formAddName.value;
  const link = formAddLink.value;

  const el = createCard(name, link);

  el.render(elementList, true);
  closePopup(popupAdd);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = formName.value;
  const job = formJob.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopup(popupEdit);
}

formEdit.addEventListener("submit", handleEditFormSubmit);
formAdd.addEventListener("submit", handleFormAddSubmit);

function initCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const el = createCard(initialCards[i].name, initialCards[i].link);
    el.render(elementList);
  }
}

initCards();

function enableValidation(selectors) {
  const forms = document.querySelectorAll(selectors.formSelector);
  for (let i = 0; i < forms.length; i++) {
    const validator = new FormValidator(forms[i], selectors);
    validator.enableValidation();
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
