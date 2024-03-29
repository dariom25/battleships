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
    this.ships = [];
  }

  cacheElements() {
    this.resetButton = document.querySelector(".reset-button");
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

  displayShip(battleships) {
    battleships.forEach((battleship) => {
      battleship.coordinates.forEach((coordinate) => {
        const cell = this.findCell(coordinate);
        cell.classList.add("ship");
      });
    });
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
    coordinates = this.arrayToKey(coordinates.coordinates);
    const cell = document
      .getElementsByClassName(`cell ${coordinates} Player`)
      .item(0);
    return cell;
  } // here is just the player grid searched. maybe add additional arguments

  arrayToKey(array) {
    if (!Array.isArray(array)) throw new Error("Input is not an array");
    return array.join(",");
  }

  parseCoordinatesToArray(coordinates) {
    return coordinates.split(",").map((str) => parseInt(str, 10));
  }

  bindShootCell = (handler) => {
    this.gridContainerComputer.addEventListener("click", (event) => {
      const clickedCell = event.target;
      const shotCoordinates = clickedCell.classList.item(1);
      handler(shotCoordinates);
    });
  };

  displayShots(vertices, clickedCell, boardType) {
    const vertex = vertices[clickedCell];
    const coordinates = this.arrayToKey(vertex.coordinates);
    const cell = document
      .getElementsByClassName(`cell ${coordinates} ${boardType}`)
      .item(0);
    if (vertex.isHit && vertex.hasShip) {
      cell.classList.add("ship-hit");
    } else if (vertex.isHit) {
      cell.classList.add("water-hit");
    }
  }

  bindSubmitCoordinates = (handler) => {
    this.submitButton.addEventListener("click", (event) => {
      if (this.coordinatesForm.checkValidity()) {
        event.preventDefault();
        handler();
      }
    });
  };

  bindGenerateRandomPlayerShips = (handler) => {
    this.randomButton.addEventListener("click", () => {
      handler();
    });
  };

  bindResetPlayerShips = (handler) => {
    this.resetButton.addEventListener("click", () => {
      handler();
    });
  };

  resetPlayerShips() {
    const cells = document.getElementsByClassName("cell Player");
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].classList.contains("ship")) {
        cells[i].classList.remove("ship");
      }
    }
  }

  bindStartGame = (handler) => {
    this.startButton.addEventListener("click", () => {
      handler();
    });
  };

  displayWhoseTurnItIs(turn) {
    if (turn === 0) {
      const active = document.querySelector(".role-title.Player")
      active.classList.add("turn")
      const inactive = document.querySelector(".role-title.Computer")
      inactive.classList.remove("turn")
    } else if (turn === 1) {
      const active = document.querySelector(".role-title.Computer")
      active.classList.add("turn")
      const inactive = document.querySelector(".role-title.Player")
      inactive.classList.remove("turn")
    }
  }
}

// if (cells[i].classList.contains("ship-hit")) {}
