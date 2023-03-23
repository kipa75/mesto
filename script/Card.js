export class Card {
  #name = null;
  #link = null;
  #template = null;
  #selectors = null;
  #handlers = null;
  #img = null;
  #newCard = null;

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
    const { handleOpenImagePopup, handleRemove, handleLike } = this.#handlers;

    this.#img.addEventListener("click", handleOpenImagePopup);

    this.#img.src = this.#link;
    this.#newCard.querySelector(remove).addEventListener("click", handleRemove);
    this.#newCard.querySelector(text).textContent = this.#name;
    this.#newCard.querySelector(like).addEventListener("click", handleLike);
  }

  #getTemplate() {
    return document.querySelector(this.#template).content.cloneNode(true);
  }

  #create() {
    const { image } = this.#selectors;

    this.#newCard = this.#getTemplate();

    this.#img = this.#newCard.querySelector(image);
  }

  getNode() {
    return this.#newCard;
  }
}
