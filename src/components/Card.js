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
  #likeElement = null;
  #removeElement = null;

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
    this.#setIninialState();
    this.#addListeners();
  }

  #addListeners() {
    const { remove, text, like } = this.#selectors;
    const { handleOpenImagePopup } = this.#handlers;

    this.#img.addEventListener("click", () =>
      handleOpenImagePopup({ link: this.#link, name: this.#name })
    );

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
    return template;
  }

  getId = () => {
    return this.#id;
  };

  #handleRemove = () => {
    const { handleClickRemove } = this.#handlers;
    handleClickRemove(this);
  };

  remove = () => {
    this.#root.remove();
    this.#root = null;
    this.#card = null;
  };

  #handleLike = (evt) => {
    evt.preventDefault();
    const { handleLike } = this.#handlers;
    this.#isMyLike = !this.#isMyLike;

    handleLike(this.#isMyLike, this.#id).then((likes) => {
      this.#likeCountElement.textContent = likes;
      evt.target.classList.toggle("elements__like-container_like");
    });
  };

  #create() {
    const { image, remove } = this.#selectors;

    this.#card = this.#getTemplate();
    this.#root = this.#card.querySelector("li");
    this.#img = this.#card.querySelector(image);
    this.#likeCountElement = this.#card.querySelector(".elements__like-count");
    this.#likeElement = this.#card.querySelector(".elements__like-container");
    this.#removeElement = this.#card.querySelector(remove);
  }

  #setIninialState = () => {
    if (!this.#my) {
      this.#removeElement.remove();
    }
    if (this.#isMyLike) {
      this.#likeElement.classList.add("elements__like-container_like");
    }
    this.#likeCountElement.textContent = this.#likes;
  };

  getNode() {
    return this.#card;
  }
}
