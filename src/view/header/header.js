export default class Header {
  constructor() {
    this.createHeader();
    this.createTitle("Battleships")
  }

  createHeader() {
    const mainContent = document.querySelector(".content");
    const header = document.createElement("div");
    header.classList.add("header");
    mainContent.appendChild(header);
  }

  createTitle(titleText) {
    const header = document.querySelector(".header")
    const title = document.createElement(".div")
    title.textContent = `${titleText}`
    title.classList.add("title")
    header.appendChild(title)
  }
}
