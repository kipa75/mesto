const form = document.querySelector(".popup__form");
const formAdd = document.querySelector(".popup_new-card .popup__form");
const formJob = form.job;
const formName = form.name;
const formAddLink = formAdd.link;
const formAddName = formAdd.name;
const button = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupCloseIcon = document.querySelector(".popup__close-icon");
const popupAddCloseIcon = document.querySelector(
  ".popup_new-card .popup__close-icon"
);
const popup = document.querySelector(".popup");
const popupAdd = document.querySelector(".popup_new-card");
const elementList = document.querySelector(".elements__list");
const popupImage = document.querySelector(".popup-image");
const popupImageImage = document.querySelector(".popup-image__image");
const popupImageClose = document.querySelector(".popup-image__close");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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

function createElement(name, link) {
  const li = createDom("li", "elements__list-item");
  const img = createDom("img", "elements__image");
  img.addEventListener("click", handleOpenImagePopup);
  li.appendChild(img);
  const box = createDom("div", "elements__remove");
  box.addEventListener("click", handleRemove);
  li.appendChild(box);
  img.src = link;
  const div = createDom("div", "elements__container");
  li.appendChild(div);
  const h2 = createDom("h2", "elements__text");
  div.appendChild(h2);
  h2.textContent = name;
  const button = createDom("button", "elements__like-container");
  button.addEventListener("click", handleLike);
  div.appendChild(button);
  return li;
}

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function openAddPopup() {
  popupAdd.classList.add("popup_opened");
}

function closeAddPopup() {
  popupAdd.classList.remove("popup_opened");
}

function openImagePopup(link, text) {
  popupImageImage.src = link;
  document.querySelector(".popup-image__title").textContent = text;
  popupImage.classList.add("popup_opened");
}

function closeImagePopup() {
  popupImage.classList.remove("popup_opened");
}

function handleOpenImagePopup(evt) {
  evt.stopPropagation();
  openImagePopup(
    evt.target.src,
    evt.target.closest(".elements__list-item").querySelector(".elements__text")
      .textContent
  );
}

function handleButtonClick(evt) {
  evt.preventDefault();
  const name = profileName.textContent;
  const job = profileJob.textContent;
  formName.value = name;
  formJob.value = job;
  openPopup();
}

function handleButtonAddClick(evt) {
  evt.preventDefault();
  openAddPopup();
}

function handleClosePopupImageClick(evt) {
  evt.preventDefault();
  closeImagePopup();
}

button.addEventListener("click", handleButtonClick, false);

buttonAdd.addEventListener("click", handleButtonAddClick, false);

popupImageClose.addEventListener("click", handleClosePopupImageClick, false);

function popupCloseIconClick() {
  closePopup();
}

function popupAddCloseIconClick() {
  closeAddPopup();
}

popupCloseIcon.addEventListener("click", popupCloseIconClick, false);
popupAddCloseIcon.addEventListener("click", popupAddCloseIconClick, false);

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = formAddName.value;
  const link = formAddLink.value;
  const el = createElement(name, link);
  elementList.insertBefore(el, elementList.childNodes[0]);
  closeAddPopup();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = formName.value;
  const job = formJob.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopup();
}

form.addEventListener("submit", handleFormSubmit);
formAdd.addEventListener("submit", handleFormAddSubmit);

function initCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const el = createElement(initialCards[i].name, initialCards[i].link);
    elementList.appendChild(el);
  }
}

initCards();
