export class Card {
  #name = null;
  #link = null;
  #template = null;
  #selectors = null;
  #handlers = null;
  #img = null;
  #card = null;
  #root = null;

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
    this.#remove();
  };

  #remove = () => {
    // удаляем root фрагмента, так как template fragment из dom удалять нельзя
    this.#root.remove();
    this.#root = null;
    this.#card = null;
  };

  #handleLike = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle("elements__like-container_like");
  };

  #create() {
    const { image } = this.#selectors;

    this.#card = this.#getTemplate();
    this.#root = this.#card.querySelector("li");
    this.#img = this.#card.querySelector(image);
  }

  getNode() {
    return this.#card;
  }
}
