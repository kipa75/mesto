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

  render() {
    this.#container.innerHTML = "";
    for (let item of this.#items) {
      this.#appendChild(item);
    }
  }

  addItem(item) {
    this.#appendChild(item);
  }
}
