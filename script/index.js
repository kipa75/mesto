const form = document.querySelector(".popup__form");
const formJob = form.job;
const formName = form.name;
const button = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupCloseIcon = document.querySelector(".popup__close-icon");
const popup = document.querySelector(".popup");

function handleButtonClick(evt) {
  evt.preventDefault();
  const name = profileName.textContent;
  const job = profileJob.textContent;
  formName.value = name;
  formJob.value = job;
  popup.classList.add("popup_opened");
}

button.addEventListener("click", handleButtonClick, false);

function popupCloseIconClick() {
  popup.classList.remove("popup_opened");
}

popupCloseIcon.addEventListener("click", popupCloseIconClick, false);

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = formName.value;
  const job = formJob.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popup.classList.remove("popup_opened");
}

form.addEventListener("submit", handleFormSubmit);
