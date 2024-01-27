import GameboardGrid from "./gameboardComponent/gameboardGrid";
import Header from "./header/header";

export default class View {
  constructor() {
    this.header = new Header();
    this.playerGrid = new GameboardGrid("Player");
    this.computerGrid = new GameboardGrid("Computer");
    this.cacheElements();
    this.bindShootCell();
  }

  cacheElements() {
    this.resetButton = document.querySelector(".submit-button");
    this.randomButton = document.querySelector(".random-button");
    this.startButton = document.querySelector(".start-button");
    this.submitButton = document.querySelector(".submit-button");
    this.gridContainerPlayer = document.querySelector(".grid-container.Player");
    this.gridContainerComputer = document.querySelector(
      ".grid-container.Computer",
    );
  }

  bindShootCell() {
    this.gridContainerComputer.addEventListener("click", (event) => {
      const clickedCell = event.target;
      if (clickedCell.classList.contains("cell")) {
        clickedCell.classList.add("shot");
      }
    });
  }
}
