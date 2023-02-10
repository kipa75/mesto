function handleRemove(evt) {
  const item = evt.target.closest(".elements__list-item");
  item.remove();
}

function createDom(tag, className) {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}

function handleLike(evt) {
  evt.preventDefault();
  evt.target.classList.toggle("elements__like-container_like");
}

function createCard(name, link) {
  const newCard = document
    .querySelector(".card-template")
    .content.cloneNode(true);
  const img = newCard.querySelector(".elements__image");

  img.addEventListener("click", handleOpenImagePopup);
  img.src = link;
  newCard
    .querySelector(".elements__remove")
    .addEventListener("click", handleRemove);
  newCard.querySelector(".elements__text").textContent = name;
  newCard
    .querySelector(".elements__like-container")
    .addEventListener("click", handleLike);
  return newCard;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleClosePopup(e) {
  if (e.target === e.target.closest(".popup")) {
    closePopup(e.target);
  }
}

function setPopupHandlers() {
  const popups = document.querySelectorAll(".popup");
  for (let i = 0; i < popups.length; i++) {
    popups[i].addEventListener("click", handleClosePopup);
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

document.addEventListener("keyup", handleKeyPress);

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
  const el = createCard(name, link);
  elementList.insertBefore(el, elementList.childNodes[0]);
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
    elementList.appendChild(el);
  }
}

initCards();
setPopupHandlers();
