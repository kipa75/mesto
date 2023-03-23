export class Section {
  #items = [];
  #renderer = null;
  #selector = "";

  constructor({ items, renderer }, selector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#selector = selector;
  }

  render() {
    const q = document.querySelector(this.#selector);
    q.innerHTML = "";
    for (let item of this.#items) {
      const t = this.#renderer(item);
      q.appendChild(t);
    }
  }

  addItem(item) {
    this.#items.push(item);
  }
}
