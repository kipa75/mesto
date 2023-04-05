import { Card } from "./Card";
import { FormValidator } from "./FormValidator";
import "../pages/index.css";
import { validationConfig } from "./const";
import { elements } from "./const";
import { Section } from "./Section";
import { UserInfo } from "./UserInfo";
import { PopupWithForm } from "./PopupWithForm";
import { PopupWithImage } from "./PopupWithImage";
import { api } from "./Api";
import { Popup } from "./Popup";

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
  popupRemoveBtn,
  popupRemove,
  popupEditAvatar,
  popupEditAvatarBtn,
  avatarEdit,
  popupEditAvatarCloseButton,
  formEditAvatar,
  profileAvatar,
  avatarUrlLink,
} = elements;

const userInfo = new UserInfo(".profile__name", ".profile__job");
const editPopup = new PopupWithForm(".popup_edit-card", handleEditFormSubmit);
const addPopup = new PopupWithForm(".popup_new-card", handleFormAddSubmit);
const imagePopup = new PopupWithImage(".popup-image");
const removePopup = new Popup(".popup-remove");
const editAvatarPopup = new PopupWithForm(".popup-edit-avatar");

const formEditValidator = new FormValidator(formEdit, validationConfig);
const formAddValidator = new FormValidator(formAdd, validationConfig);
const formEditAvatarValidator = new FormValidator(
  formEditAvatar,
  validationConfig
);
let meId = 0;

let currentCard = null;

const section = new Section(
  {
    items: [],
    renderer: createCard,
  },
  ".elements__list"
);

function setSaveStatus(form) {
  const text = form.querySelector(".popup__button").textContent;
  form.querySelector(".popup__button").textContent = "Сохранение...";
  return text;
}

function resetSaveStatus(form, text) {
  form.querySelector(".popup__button").textContent = text;
}

function handleButtonEditClick(validator, evt) {
  evt.preventDefault();
  userInfo
    .getUserInfo()
    .then(({ name, info }) => {
      formName.value = name;
      formJob.value = info;
      editPopup.open();
      validator.removeValidationErrors();
    })
    .catch((e) => console.log(e));
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

bindForm(
  popupEditAvatarBtn,
  popupEditAvatarCloseButton,
  formEditAvatarValidator,
  handleButtonEditAvatarClick
);

function handleOpenImagePopup(evt) {
  evt.stopPropagation();
  imagePopup.open(
    evt.target.src,
    evt.target.closest(".elements__list-item").querySelector(".elements__text")
      .textContent
  );
}

function handleRemove() {
  if (currentCard) {
    const text = setSaveStatus(popupRemove);
    api.removeCard(currentCard.getId()).then(() => {
      currentCard.remove();
      removePopup.close();
      resetSaveStatus(popupRemove, text);
    });
  }
}

function handleClickRemove(card) {
  removePopup.open();
  currentCard = card;
}

function handleEditAvatarClick() {
  editAvatarPopup.open();
}

function handleButtonEditAvatarClick() {
  const text = setSaveStatus(popupEditAvatar);
  api.uploadAvatar(avatarUrlLink.value).then(({ avatar }) => {
    profileAvatar.src = avatar;
    resetSaveStatus(popupEditAvatar, text);
  });
  editAvatarPopup.close();
}

popupRemoveBtn.addEventListener("click", handleRemove);

avatarEdit.addEventListener("click", handleEditAvatarClick);

function createCard({ name, link, id, my, likes, myId, isMyLike }) {
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
    { handleOpenImagePopup, handleClickRemove },
    id,
    my,
    likes,
    isMyLike,
    myId
  );

  return el.getNode();
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = formAddName.value;
  const link = formAddLink.value;

  const text = setSaveStatus(formAdd);

  api
    .addCard({ name, link })
    .then(({ name, link, _id, owner, likes }) => {
      resetSaveStatus(formAdd, text);
      section.addItem(
        {
          name,
          link,
          id: _id,
          my: meId == owner._id,
          likes: likes.length,
          isMyLike: false,
          myId: meId,
        },
        true
      );
      addPopup.close();
    })
    .catch((e) => console.log(e));
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = formName.value;
  const info = formJob.value;

  const text = setSaveStatus(formEdit);

  userInfo
    .setUserInfo({
      name,
      info,
    })
    .then(() => {
      resetSaveStatus(formEdit, text);
    })
    .catch((e) => console.log(e));

  editPopup.close();
}

userInfo.updateInfo().then(({ id, avatar }) => {
  meId = id;
  api
    .getInitialCards()
    .then((items) => {
      profileAvatar.src = avatar;
      section.updateItems(
        items.map(({ name, link, _id, owner, likes }) => ({
          name,
          link,
          id: _id,
          my: meId == owner._id,
          likes: likes.length,
          isMyLike: likes.find(({ _id }) => _id === meId),
          myId: meId,
        }))
      );
      section.render();
    })
    .catch((e) => console.log(e));
});
