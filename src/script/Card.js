import { api } from "./Api";

export class Card {
  #name = null;
  #link = null;
  #template = null;
  #selectors = null;
  #handlers = null;
  #img = null;
  #card = null;
  #root = null;
  #id = 0;
  #my = false;
  #likes = 0;
  #isMyLike = false;
  #myId = 0;
  #likeCountElement = null;

  constructor(
    name,
    link,
    template,
    selectors,
    handlers,
    id,
    my,
    likes,
    isMyLike,
    myId
  ) {
    this.#name = name;
    this.#link = link;
    this.#template = template;
    this.#selectors = selectors;
    this.#handlers = handlers;
    this.#id = id;
    this.#my = my;
    this.#likes = likes;
    this.#isMyLike = isMyLike;
    this.#myId = myId;

    this.#create();
    this.#addListeners();
  }

  #addListeners() {
    const { remove, text, like } = this.#selectors;
    const { handleOpenImagePopup } = this.#handlers;

    this.#img.addEventListener("click", handleOpenImagePopup);

    this.#img.src = this.#link;
    const removeBtn = this.#card.querySelector(remove);

    if (removeBtn) {
      removeBtn.addEventListener("click", this.#handleRemove);
    }

    this.#card.querySelector(text).textContent = this.#name;
    this.#card.querySelector(like).addEventListener("click", this.#handleLike);
  }

  #getTemplate() {
    const template = document
      .querySelector(this.#template)
      .content.cloneNode(true);
    const { remove } = this.#selectors;
    if (!this.#my) {
      template.querySelector(remove).remove();
    }
    if (this.#isMyLike) {
      template
        .querySelector(".elements__like-container")
        .classList.add("elements__like-container_like");
    }
    template.querySelector(".elements__like-count").textContent = this.#likes;

    return template;
  }

  getId = () => {
    return this.#id;
  };

  #handleRemove = () => {
    const { handleClickRemove } = this.#handlers;
    handleClickRemove(this);
    //this.#remove();
  };

  remove = () => {
    this.#root.remove();
    this.#root = null;
    this.#card = null;
  };

  #setLikeCount = (like = true) => {
    const method = like ? api.like(this.#id) : api.unlike(this.#id);
    method
      .then(({ likes }) => {
        this.#likes = likes.length;
        this.#likeCountElement.textContent = this.#likes;
      })
      .catch((e) => console.log(e));
  };

  #handleLike = (evt) => {
    evt.preventDefault();
    this.#isMyLike = !this.#isMyLike;
    evt.target.classList.toggle("elements__like-container_like");
    this.#setLikeCount(this.#isMyLike);
  };

  #create() {
    const { image } = this.#selectors;

    this.#card = this.#getTemplate();
    this.#root = this.#card.querySelector("li");
    this.#img = this.#card.querySelector(image);
    this.#likeCountElement = this.#card.querySelector(".elements__like-count");
  }

  getNode() {
    return this.#card;
  }
}
