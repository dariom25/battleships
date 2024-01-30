import GameboardGrid from "./gameboardComponent/gameboardGrid";
import Header from "./header/header";
import "./coordinateForm/form.css";
import "./root.css";
import "./gameboardComponent/grid.css";
import "./header/header.css";

export default class View {
  constructor() {
    this.header = new Header();
    this.playerGrid = new GameboardGrid("Player");
    this.computerGrid = new GameboardGrid("Computer");
    this.cacheElements();
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

  submitCoordinates() {
    const startCoordinates = document.querySelector("#ship-start").value;
    const endCoordinates = document.querySelector("#ship-end").value;

    //find start and end cells
    const startCell = document.getElementsByClassName(`cell ${startCoordinates} Player`).item(0);
    const endCell = document.getElementsByClassName(`cell ${endCoordinates} Player`).item(0);

    
  }

 

  bindShootCell = (handler) => {
    this.gridContainerComputer.addEventListener("click", (event) => {
      const clickedCell = event.target;
      handler(clickedCell);
    });
  }

  bindSubmitCoordinates = (handler) => {
    this.submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      handler();
    });
  }
}
