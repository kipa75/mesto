export class Card {
  #name = null;
  #link = null;
  #template = null;
  #selectors = null;
  #handlers = null;
  #img = null;
  #card = null;
  #id = 0;

  constructor(name, link, template, selectors, handlers) {
    this.#name = name;
    this.#link = link;
    this.#template = template;
    this.#selectors = selectors;
    this.#handlers = handlers;

    this.#create();
    this.#addListeners();
  }

  #addListeners() {
    const { remove, text, like } = this.#selectors;
    const { handleOpenImagePopup } = this.#handlers;

    this.#img.addEventListener("click", handleOpenImagePopup);

    this.#img.src = this.#link;
    this.#card
      .querySelector(remove)
      .addEventListener("click", this.#handleRemove);
    this.#card.querySelector(text).textContent = this.#name;
    this.#card.querySelector(like).addEventListener("click", this.#handleLike);
  }

  #getTemplate() {
    return document.querySelector(this.#template).content.cloneNode(true);
  }

  #handleRemove = () => {
    document.getElementById(this.#id).remove();
  };

  #handleLike = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle("elements__like-container_like");
  };

  #create() {
    const { image } = this.#selectors;

    this.#card = this.#getTemplate();
    this.#id = Math.random().toString();
    this.#card.querySelector("li").setAttribute("id", this.#id);

    this.#img = this.#card.querySelector(image);
  }

  getNode() {
    return this.#card;
  }
}
