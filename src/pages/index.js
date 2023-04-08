import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";
import "./index.css";
import { validationConfig } from "../utils/const";
import { elements } from "../utils/const";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage";
import { api } from "../utils/utils";
import { PopupWithStatus } from "../components/PopupWithStatus";

const {
  formEdit,
  formAdd,
  formJob,
  formName,
  buttonEdit,
  buttonAdd,
  popupRemoveBtn,
  avatarEdit,
  formEditAvatar,
  profileAvatarSelector,
} = elements;

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__job",
  profileAvatarSelector
);
const editPopup = new PopupWithForm(".popup_edit-card", {
  onSubmit: handleEditFormSubmit,
  onSubmitSuccess: handleSuccess,
});
const addPopup = new PopupWithForm(".popup_new-card", {
  onSubmit: handleFormAddSubmit,
  onSubmitSuccess: handleSuccess,
});
const imagePopup = new PopupWithImage(".popup-image");
const removePopup = new PopupWithStatus(".popup-remove");
const editAvatarPopup = new PopupWithForm(".popup-edit-avatar", {
  onSubmit: handlEditAvatarSubmit,
  onSubmitSuccess: handleSuccess,
});

const formEditValidator = new FormValidator(formEdit, validationConfig);
const formAddValidator = new FormValidator(formAdd, validationConfig);
const formEditAvatarValidator = new FormValidator(
  formEditAvatar,
  validationConfig
);

const validators = {
  [formEdit.getAttribute("name")]: {
    button: buttonEdit,
    validator: formEditValidator,
    onClick: handleButtonEditClick,
    popup: editPopup,
  },
  [formAdd.getAttribute("name")]: {
    button: buttonAdd,
    validator: formAddValidator,
    onClick: handleButtonAddClick,
    popup: addPopup,
  },
  [formEditAvatar.getAttribute("name")]: {
    button: avatarEdit,
    validator: formEditAvatarValidator,
    onClick: handleEditAvatarClick,
    popup: editAvatarPopup,
  },
};

let currentCard = null;

const section = new Section(
  {
    items: [],
    renderer: createCard,
  },
  ".elements__list"
);

function handleLike(like, id) {
  const method = like ? api.like(id) : api.unlike(id);
  return method
    .then(({ likes }) => {
      return likes.length;
    })
    .catch((e) => console.log(e));
}

function handleButtonEditClick(evt) {
  evt.preventDefault();
  formName.value = userInfo.getUserInfo().name;
  formJob.value = userInfo.getUserInfo().info;
  editPopup.open();
}

function handleButtonAddClick(evt) {
  evt.preventDefault();
  addPopup.open();
}

function setValidation() {
  Object.keys(validators).forEach((name) => {
    validators[name].validator.enableValidation();
    validators[name].button.addEventListener(
      "click",
      (evt) => {
        validators[name].validator.reset();
        validators[name].onClick(evt);
      },
      false
    );
  });
}

setValidation();

function handleOpenImagePopup({ link, name }) {
  imagePopup.open(link, name);
}

function handleRemove() {
  if (currentCard) {
    removePopup.renderLoading(true);
    api
      .removeCard(currentCard.getId())
      .then(() => {
        currentCard.remove();

        removePopup.close();
      })
      .catch((e) => console.log(e))
      .finally(() => removePopup.renderLoading(false));
  }
}

function handleClickRemove(card) {
  removePopup.open();
  currentCard = card;
}

function handleEditAvatarClick(evt) {
  evt.preventDefault();
  editAvatarPopup.open();
}

function handlEditAvatarSubmit({ link }) {
  editAvatarPopup.renderLoading(true);
  return api
    .uploadAvatar(link)
    .then(({ avatar }) => {
      userInfo.setAvatar(avatar);
    })
    .catch((e) => console.log(e))
    .finally(() => editAvatarPopup.renderLoading(false));
}

function handleSuccess(form) {
  const name = form.getAttribute("name");
  validators[name].popup.close();
}

popupRemoveBtn.addEventListener("click", handleRemove);

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
    { handleOpenImagePopup, handleClickRemove, handleLike },
    id,
    my,
    likes,
    isMyLike,
    myId
  );

  return el.getNode();
}

function handleFormAddSubmit({ name, link }) {
  addPopup.renderLoading(true);

  return api
    .addCard({ name, link })
    .then(({ name, link, _id, owner, likes }) => {
      section.addItem(
        {
          name,
          link,
          id: _id,
          my: userInfo.getId() == owner._id,
          likes: likes.length,
          isMyLike: false,
          myId: userInfo.getId(),
        },
        true
      );
    })
    .catch((e) => console.log(e))
    .finally(() => addPopup.renderLoading(false));
}

function handleEditFormSubmit({ name, job: info }) {
  editPopup.renderLoading(true);

  return api
    .setUser({
      name,
      info,
    })
    .then(() => {
      userInfo.setUserInfo({ name, info });
    })
    .catch((e) => console.log(e))
    .finally(() => editPopup.renderLoading(false));
}

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([{ id, avatar, name, info }, items]) => {
    userInfo.setUserInfo({ name, info });
    userInfo.setId(id);
    userInfo.setAvatar(avatar);
    section.updateItems(
      items.map(({ name, link, _id, owner, likes }) => ({
        name,
        link,
        id: _id,
        my: userInfo.getId() == owner._id,
        likes: likes.length,
        isMyLike: likes.find(({ _id }) => _id === userInfo.getId()),
        myId: userInfo.getId(),
      }))
    );
    section.render();
  })
  .catch((e) => console.log(e));
