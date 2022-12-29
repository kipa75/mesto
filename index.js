function getForm() {
    return document.querySelector(".popup__form");
}

document.querySelector(".profile__edit-button").addEventListener("click", function (evt) {
    evt.preventDefault();
    const name = document.querySelector(".profile__name").innerText;
    const job = document.querySelector(".profile__job").innerText;
    getForm().name.value = name;
    getForm().job.value = job;
    document.querySelector(".popup").classList.add("popup__opened");
}, false);

document.querySelector(".popup__close-icon").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("popup__opened");
}, false);

function handleFormSubmit(evt) {
    evt.preventDefault();
    const name = getForm().name.value;
    const job = getForm().job.value;
    document.querySelector(".profile__name").innerText = name;
    document.querySelector(".profile__job").innerText = job;
    document.querySelector(".popup").classList.remove("popup__opened");
}

getForm().addEventListener('submit', handleFormSubmit); 