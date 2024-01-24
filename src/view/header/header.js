export default class Header {
  constructor() {
    this.createTitle("Battleships");
  }


  createTitle(titleText) {
    const header = document.querySelector(".header");
    const title = document.createElement("div");
    title.textContent = `${titleText}`;
    title.classList.add("title");
    header.appendChild(title);
  }
}
