const popupEdit = document.querySelector(".popup_edit-card");
const formEdit = popupEdit.querySelector(".popup__form");
const popupAdd = document.querySelector(".popup_new-card");
const formAdd = popupAdd.querySelector(".popup__form");
const formJob = formEdit.job;
const formName = formEdit.name;
const formAddLink = formAdd.link;
const formAddName = formAdd.name;
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupEditCloseIcon = document.querySelector(".popup__close-icon");
const popupAddCloseIcon = popupAdd.querySelector(".popup__close-icon");
const elementList = document.querySelector(".elements__list");
const popupImage = document.querySelector(".popup-image");
const popupImageImage = document.querySelector(".popup-image__image");
const popupImageClose = popupImage.querySelector(".popup__close-icon");
const popupImageTitle = document.querySelector(".popup-image__title");
const popupEditCloseButton = popupEdit.querySelector(".popup__close-icon");
const popupAddCloseButton = popupAdd.querySelector(".popup__close-icon");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  buttonDisabedClass: "popup__button_disabled",
  popupSelector: ".popup",
  popupErrorSelector: ".popup__error",
  inputWrapSelector: ".popup__input-wrap",
};

export const elements = {
  popupEdit,
  formEdit,
  popupAdd,
  formAdd,
  formJob,
  formName,
  formAddLink,
  formAddName,
  buttonEdit,
  buttonAdd,
  profileName,
  profileJob,
  popupEditCloseIcon,
  popupAddCloseIcon,
  elementList,
  popupImage,
  popupImageImage,
  popupImageClose,
  popupImageTitle,
  popupEditCloseButton,
  popupAddCloseButton,
};
