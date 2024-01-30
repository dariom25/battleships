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

    return [startCoordinates, endCoordinates];
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
      //check if start coordinates are smaller than end coordinates and calculate accordingly
      if (startCoordinates[0] < endCoordinates[0]) {
        for (let col = startCoordinates[0]; col <= endCoordinates[0]; col++) {
          const cell = this.findCell([col, endCoordinates[1]]);
          shipCoordinates.push(cell);
        }
        //check if start coordinates are bigger than end coordinates and calculate accordingly
      } else if (startCoordinates[0] > endCoordinates[0]) {
        for (let col = endCoordinates[0]; col <= startCoordinates[0]; col++) {
          const cell = this.findCell([col, startCoordinates[1]]);
          shipCoordinates.push(cell);
        }
      } else {
        // error message because illegal ship
      }
    } else if (startCoordinates[0] === endCoordinates[0]) {
      //calculate the vertical ship length
      //check if start coordinates are smaller than end coordinates and calculate accordingly
      if (startCoordinates[1] < endCoordinates[1]) {
        for (let row = startCoordinates[1]; row <= endCoordinates[1]; row++) {
          const cell = this.findCell([endCoordinates[0], row]);
          shipCoordinates.push(cell);
        }
        //check if start coordinates are bigger than end coordinates and calculate accordingly
      } else if (startCoordinates[1] > endCoordinates[1]) {
        for (let row = endCoordinates[1]; row <= startCoordinates[1]; row++) {
          const cell = this.findCell([startCoordinates[0], row]);
          shipCoordinates.push(cell);
        }
      } else {
        // error message because illegal ship
      }
    } else {
      // error message because illegal ship
    }

    return shipCoordinates;
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
      event.preventDefault();
      handler();
    });
  };
}
