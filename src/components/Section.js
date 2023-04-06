export class Section {
  #items = [];
  #renderer = null;
  #selector = "";
  #container = null;

  constructor({ items, renderer }, selector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#selector = selector;
    this.#container = document.querySelector(this.#selector);
  }

  #appendChild(item) {
    const renderedItem = this.#renderer(item);
    this.#container.appendChild(renderedItem);
  }

  #prependChild(item) {
    const renderedItem = this.#renderer(item);
    if (this.#container.firstChild) {
      this.#container.insertBefore(renderedItem, this.#container.firstChild);
    } else {
      this.#appendChild(renderedItem);
    }
  }

  updateItems(items) {
    this.#items = items;
  }

  render() {
    this.#container.innerHTML = "";
    for (let item of this.#items) {
      this.#appendChild(item);
    }
  }

  addItem(item, prepend = false) {
    if (prepend) {
      this.#prependChild(item);
    } else {
      this.#appendChild(item);
    }
  }
}
