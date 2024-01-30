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
    //get coordinates
    const startCoordinates = document.querySelector("#ship-start").value;
    const endCoordinates = document.querySelector("#ship-end").value;

    return [startCoordinates, endCoordinates]
  }

  displayShip(shipCoordinates) {
    shipCoordinates.forEach((coordinate) => {
      coordinate.classList.add("ship");
    });
  }

  validateAndCalculateShipPlacement(coordinate1, coordinate2) {
    //process coordinates
    const startCoordinates = this.parseCoordinatesToArray(coordinate1);
    const endCoordinates = this.parseCoordinatesToArray(coordinate2);
    const shipCoordinates = [];
    //validate the legality of the coordinates
    if (startCoordinates[1] === endCoordinates[1]) {
      //calculate the horizontal ship length
      for (let row = startCoordinates[0]; row <= endCoordinates[0]; row++) {
        const cell = this.findCell([row, endCoordinates[1]]);
        shipCoordinates.push(cell);
      }
    } else if (startCoordinates[0] === endCoordinates[0]) {
      //calculate the vertical ship length
    } else {
      // error message because illegal ship
    }

    return shipCoordinates;
  }

  findCell(coordinates) {
    coordinates = this.arrayToKey(coordinates);
    const cell = document
      .getElementsByClassName(`cell ${coordinates} Player`)
      .item(0);
    return cell;
  }

  arrayToKey(array) {
    return array.join(",");
  }

  parseCoordinatesToArray(coordinates) {
    return coordinates.split(",").map((str) => parseInt(str, 10));
  }

  bindShootCell = (handler) => {
    this.gridContainerComputer.addEventListener("click", (event) => {
      const clickedCell = event.target;
      handler(clickedCell);
    });
  };

  bindSubmitCoordinates = (handler) => {
    this.submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      handler();
    });
  };
}
