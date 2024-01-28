import GameboardGrid from "./gameboardComponent/gameboardGrid";
import Header from "./header/header";
import "./view/coordinateForm/form.css"
import "./view/root.css";
import "./view/gameboardComponent/grid.css";



export default class View {
  constructor() {
    this.header = new Header();
    this.playerGrid = new GameboardGrid("Player");
    this.computerGrid = new GameboardGrid("Computer");
    this.cacheElements();
    this.bindShootCell();
    this.bindSubmitCoordinates();
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

  getUserInput(element) {
    return element.value;
  }

  bindShootCell() {
    this.gridContainerComputer.addEventListener("click", (event) => {
      const clickedCell = event.target;
      if (clickedCell.classList.contains("cell")) {
        clickedCell.classList.add("shot");
      }
    });
  }

  bindSubmitCoordinates(handler) {
    this.submitButton.addEventListener("click", event => {
      event.preventDefault();
      handler();
    })
  }
}
