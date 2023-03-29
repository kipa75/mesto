import { Card } from "./Card";
import { FormValidator } from "./FormValidator";
import "../pages/index.css";
import { validationConfig } from "./const";
import { elements } from "./const";
import { initialCards } from "./cards";
import { Section } from "./Section";
import { UserInfo } from "./UserInfo";
import { PopupWithForm } from "./PopupWithForm";
import { PopupWithImage } from "./PopupWithImage";

const {
  formEdit,
  formAdd,
  formJob,
  formName,
  formAddLink,
  formAddName,
  buttonEdit,
  buttonAdd,
  popupEditCloseButton,
  popupAddCloseButton,
} = elements;

const userInfo = new UserInfo(".profile__name", ".profile__job");
const editPopup = new PopupWithForm(".popup_edit-card", handleEditFormSubmit);
const addPopup = new PopupWithForm(".popup_new-card", handleFormAddSubmit);
const imagePopup = new PopupWithImage(".popup-image");

const formEditValidator = new FormValidator(formEdit, validationConfig);
const formAddValidator = new FormValidator(formAdd, validationConfig);

const section = new Section(
  { items: initialCards, renderer: createCard },
  ".elements__list"
);
section.render();

function handleButtonEditClick(validator, evt) {
  evt.preventDefault();
  const { name, info } = userInfo.getUserInfo();
  formName.value = name;
  formJob.value = info;
  editPopup.open();
  validator.removeValidationErrors();
}

function handleButtonAddClick(validator, evt) {
  evt.preventDefault();
  addPopup.open();
  validator.removeValidationErrors();
}

function bindForm(button, closeBtn, validator, onClick) {
  validator.enableValidation();

  closeBtn.addEventListener("click", () => validator.removeErrorProps(), false);

  button.addEventListener("click", onClick.bind(null, validator), false);
}

bindForm(
  buttonEdit,
  popupEditCloseButton,
  formEditValidator,
  handleButtonEditClick
);

bindForm(
  buttonAdd,
  popupAddCloseButton,
  formAddValidator,
  handleButtonAddClick
);

function handleOpenImagePopup(evt) {
  evt.stopPropagation();
  imagePopup.open(
    evt.target.src,
    evt.target.closest(".elements__list-item").querySelector(".elements__text")
      .textContent
  );
}

function createCard({ name, link }) {
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
    { handleOpenImagePopup }
  );

  return el.getNode();
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = formAddName.value;
  const link = formAddLink.value;

  section.addItem({ name, link }, true);

  addPopup.close();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = formName.value;
  const info = formJob.value;

  userInfo.setUserInfo({
    name,
    info,
  });

  editPopup.close();
}
