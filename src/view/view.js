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
    this.coordinatesForm = document.querySelector("form");
  }

  submitCoordinates() {
    //get coordinates
    const startCoordinates = document.querySelector("#ship-start").value;
    const endCoordinates = document.querySelector("#ship-end").value;

    return [startCoordinates, endCoordinates];
  }

  displayShip(shipCoordinates) {
    shipCoordinates.forEach((coordinate) => {
      coordinate.classList.add("ship");
    });
  }

  isNotDiagonal(coordinate1, coordinate2) {
    const startCoordinates = this.parseCoordinatesToArray(coordinate1);
    const endCoordinates = this.parseCoordinatesToArray(coordinate2);

    // checks if the ship is not diagonal
    if (
      (startCoordinates[0] === endCoordinates[0] &&
        startCoordinates[1] !== endCoordinates[1]) ||
      (startCoordinates[1] === endCoordinates[1] &&
        startCoordinates[0] !== endCoordinates[0])
    ) {
      return true;
    }
  }

  calculateShipPlacement(coordinate1, coordinate2) {
    //process coordinates
    const startCoordinates = this.parseCoordinatesToArray(coordinate1);
    const endCoordinates = this.parseCoordinatesToArray(coordinate2);

    if (startCoordinates[1] === endCoordinates[1]) {
      return this.calculateCoordinatesDependingOnDirection(
        startCoordinates[0],
        endCoordinates[0],
        startCoordinates[1],
        true,
      );
    } else if (startCoordinates[0] === endCoordinates[0]) {
      return this.calculateCoordinatesDependingOnDirection(
        startCoordinates[1],
        endCoordinates[1],
        startCoordinates[0],
        false,
      );
    } else {
      // error message because illegal ship
    }
  }

  calculateCoordinatesDependingOnDirection(
    start,
    end,
    fixedValue,
    horizontalShip,
  ) {
    const shipCoordinates = [];
    const step = start < end ? 1 : -1;
    for (let i = start; i !== end + step; i += step) {
      const cell = horizontalShip
        ? this.findCell([i, fixedValue])
        : this.findCell([fixedValue, i]);
      shipCoordinates.push(cell);
    }

    return shipCoordinates;
  }

  emptyInputs() {
    const startCoordinates = (document.querySelector("#ship-start").value = "");
    const endCoordinates = (document.querySelector("#ship-end").value = "");
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
      if (this.coordinatesForm.checkValidity()) {
        event.preventDefault();
        handler();
      }
    });
  };
}
