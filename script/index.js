import { Card } from "./Card.js";

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
  if (e.key == "Escape") {
    const popup = document.querySelector(".popup_opened");
    if (popup) {
      closePopup(popup);
    }
  }
}

function openImagePopup(link, text) {
  popupImageImage.src = link;
  document.querySelector(".popup-image__title").textContent = text;
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

popupEditCloseIcon.addEventListener("click", popupCloseIconClick, false);
popupAddCloseIcon.addEventListener("click", popupCloseIconClick, false);

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = formAddName.value;
  const link = formAddLink.value;

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
    const el = new Card(
      initialCards[i].name,
      initialCards[i].link,
      ".card-template",
      {
        image: ".elements__image",
        remove: ".elements__remove",
        text: ".elements__text",
        like: ".elements__like-container",
      },
      { handleOpenImagePopup, handleRemove, handleLike }
    );
    el.render(elementList);
  }
}

initCards();
