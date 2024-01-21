import GameboardGrid from "./gameboardComponent/gameboardGrid";
import Header from "./header/header";

export default class View {
  constructor() {
    this.header = new Header();
    this.createMainContent();
    this.playerGrid = new GameboardGrid();
    this.computerGrid = new GameboardGrid();
  }

  createMainContent() {
    const content = document.querySelector(".content");
    const mainContent = document.createElement("div");
    mainContent.classList.add("main-content");
    content.appendChild(mainContent);
  }
}
