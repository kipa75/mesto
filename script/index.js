import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

function handleButtonEditClick(validator, evt) {
  evt.preventDefault();
  const name = profileName.textContent;
  const job = profileJob.textContent;
  formName.value = name;
  formJob.value = job;
  openPopup(popupEdit);
  validator.removeValidationErrors();
}

function handleButtonAddClick(validator, evt) {
  evt.preventDefault();
  const button = popupAdd.querySelector(".popup__button");
  button.classList.add("popup__button_disabled");
  button.setAttribute("disabled", "disabled");
  openPopup(popupAdd);
  validator.removeValidationErrors();
}

function bindForm(form, button, closeBtn, validator, onClick) {
  validator.enableValidation();

  closeBtn.addEventListener(
    "click",
    () => validator.disableSubmitButton(),
    false
  );

  button.addEventListener("click", onClick.bind(null, validator), false);
}

function run() {
  bindForm(
    formEdit,
    buttonEdit,
    popupEditCloseButton,
    new FormValidator(formEdit, validationConfig),
    handleButtonEditClick
  );

  bindForm(
    formAdd,
    buttonAdd,
    popupAddCloseButton,
    new FormValidator(formAdd, validationConfig),
    handleButtonAddClick
  );
}

run();

function handleRemove(evt) {
  const item = evt.target.closest(".elements__list-item");
  item.remove();
}

function handleLike(evt) {
  evt.preventDefault();
  evt.target.classList.toggle("elements__like-container_like");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleClosePopup);
  document.addEventListener("keyup", handleKeyPress);
}

function closePopup(popup) {
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
  if (e.key === "Escape") {
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

function handleClosePopupImageClick(evt) {
  evt.preventDefault();
  closePopup(popupImage);
}

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
