import Queue from "./queue";
import Battleship from "../battleships/battleship";
import Vertex from "./vertex";

export default class Gameboard {
  constructor() {
    this.vertices = {};
    this.battleships = [];
    this.createGameboard();
    this.gameOver = false;
    this.turn = 0;
    this.legalShips = [5, 4, 3, 2, 2];
  }

  arrayToKey(array) {
    if (!Array.isArray(array)) throw new Error("Input is not an array");
    return array.join(",");
  }

  createGameboard() {
    for (let row = 1; row < 11; row++) {
      for (let col = 1; col < 11; col++) {
        this.addVertex([row, col]);
      }
    }
    let legalConnections = [
      [1, 0], // right
      [-1, 0], // left
      [0, 1], // up
      [0, -1], // down
    ];
    let vertices = Object.values(this.vertices);
    vertices.forEach((vertex) => {
      const row = vertex.coordinates[0];
      const col = vertex.coordinates.slice(-1);
      legalConnections.forEach((connection) => {
        const newRow = parseInt(row) + connection[0];
        const newCol = parseInt(col) + connection[1];
        if (newRow <= 10 && newRow >= 0 && newCol <= 10 && newCol >= 0) {
          const targetVertex = this.findVertex([newRow, newCol]);
          if (targetVertex !== null) {
            vertex.addConnection(targetVertex);
          }
        }
      });
    });
  }

  addVertex(identifier) {
    if (identifier in this.vertices) {
      return;
    } else {
      this.vertices[identifier] = new Vertex(identifier);
    }
  }

  findVertex(identifier) {
    if (identifier in this.vertices) {
      return this.vertices[identifier];
    }
    return null;
  }

  parseCoordinatesToArray(coordinates) {
    return coordinates.split(",").map((str) => parseInt(str, 10));
  }

  shipIsLegal(shipLength) {
    // check if the ship already exists
    let legal = false;
    this.legalShips.forEach((ship) => {
      if (ship === shipLength) {
        const index = this.legalShips.indexOf(ship);
        this.legalShips.splice(index, 1);
        legal = true;
      }
    });
    return legal;
  }

  shipsDoNotIntersect(shipCoordinates) {
    //shipCoordinates is an array which contains the coordinates as arrays

    //extract coordinates from battleships
    const placedBattleships = [];
    this.battleships.forEach((battleship) => {
      const coordinates = battleship.coordinates;
      coordinates.forEach((coordinate) => {
        const newCoordinate = coordinate.coordinates;
        placedBattleships.push(newCoordinate);
      });
    });

    // check if ships intersect
    if (this.battleships.length === 0) return true;
    return shipCoordinates.every(
      (coordinate) =>
        !placedBattleships.some(
          (battleship) =>
            JSON.stringify(battleship) === JSON.stringify(coordinate),
        ),
    );
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
    )
      return true;
  }

  placeBattleship(startCoordinate, endCoordinate) {
    if (!this.isNotDiagonal(startCoordinate, endCoordinate)) {
      alert("Diagonal ships are invalid");
      return;
    }

    const startVertex = this.findVertex(startCoordinate);
    const endVertex = this.findVertex(endCoordinate);

    if (startVertex === null) return null;
    if (endVertex === null) return null;
    if (startVertex === endVertex) return null;

    let queue = new Queue();
    let visited = new Set();

    queue.enqueue([startVertex, [startVertex.coordinates]]);
    visited.add(startVertex);
    while (queue.queue.length !== 0) {
      const [vertex, path] = queue.dequeue();
      if (vertex === endVertex) {
        const extractedCoordinates = this.extractElements(path);
        // check here if the number of legal ships is reached
        if (!this.shipsDoNotIntersect(extractedCoordinates)) {
          alert("Ship intersects with other ship");
          return;
        }

        if (!this.shipIsLegal(extractedCoordinates.length)) {
          alert(
            "Ship is too long or the maximum number of this ship is reached",
          );
          return;
        }

        const battleship = new Battleship(extractedCoordinates.length);
        this.processCoordinates(extractedCoordinates, battleship);
        this.battleships.push(battleship);
      }
      if (!visited.has(vertex)) {
        visited.add(vertex);
      }
      vertex.connections.forEach((move) => {
        if (!visited.has(move)) {
          visited.add(move);
          let newPath = path.concat(move.coordinates);
          queue.enqueue([move, [newPath]]);
        }
      });
    }
    return null;
  }

  extractElements(list) {
    let result = [];
    let coordinates = [];

    function extract(list) {
      list.forEach((item) => {
        if (Array.isArray(item)) {
          extract(item);
        } else {
          coordinates.push(item);
          if (coordinates.length === 2) {
            result.push(coordinates);
            coordinates = [];
          }
        }
      });
    }

    extract(list);
    return result;
  }

  processCoordinates(list, battleship) {
    list.forEach((element) => {
      /* element = element.split(",");
      element = element.map(function (str) {
        return parseInt(str);
      }); */
      const vertex = this.findVertex(element);
      vertex.hasShip = true;
      battleship.coordinates.push(vertex);
    });
  }

  receiveAttack(coordinates) {
    //check if coodinates are formatted correctly

    const vertex = this.findVertex(coordinates);
    if (vertex.isHit === true) return null;
    vertex.isHit = true;
    if (vertex.hasShip === true) {
      this.battleships.forEach((battleship) => {
        battleship.coordinates.forEach((coordinate) => {
          if (coordinate === vertex) {
            battleship.hit();
            if (battleship.isSunk()) battleship.sunk = true;
          }
        });
      });
    }
  }

  isGameOver(battleships) {
    return battleships.every((battleship) => battleship.sunk);
  }

  generateRandomCoordinates() {
    let input = [];
    for (let i = 0; i < 2; i++) {
      const randomInt = Math.floor(Math.random() * 10) + 1;
      input.push(randomInt);
    }
    return input;
  }

  placeBattleshipRandomly() {
    const startCoordinate = this.arrayToKey(this.generateRandomCoordinates());
    const endCoordinate = this.arrayToKey(this.generateRandomCoordinates());

    const startVertex = this.findVertex(startCoordinate);
    const endVertex = this.findVertex(endCoordinate);

    let queue = new Queue();
    let visited = new Set();

    queue.enqueue([startVertex, [startVertex.coordinates]]);
    visited.add(startVertex);
    while (queue.queue.length !== 0) {
      const [vertex, path] = queue.dequeue();
      if (vertex === endVertex) {
        const extractedCoordinates = this.extractElements(path);
        if (
          startVertex === endVertex ||
          !this.isNotDiagonal(startCoordinate, endCoordinate) ||
          !this.shipsDoNotIntersect(extractedCoordinates) ||
          !this.shipIsLegal(extractedCoordinates.length)
        ) {
          return this.placeBattleshipRandomly();
        }

        const battleship = new Battleship(extractedCoordinates.length);
        this.processCoordinates(extractedCoordinates, battleship);
        this.battleships.push(battleship);
      }
      if (!visited.has(vertex)) {
        visited.add(vertex);
      }
      vertex.connections.forEach((move) => {
        if (!visited.has(move)) {
          visited.add(move);
          let newPath = path.concat(move.coordinates);
          queue.enqueue([move, [newPath]]);
        }
      });
    }
    return null;
  }

  resetShips() {
    this.legalShips = [5, 4, 3, 2, 2];
    this.battleships = [];
    Object.values(this.vertices).forEach((vertex) => {
      vertex.hasShip = false;
    });
  }

  checkIfAllShipsArePlaced() {
    if (this.battleships.length === 5) return true;
    alert("Please place all your ships first.")
  }

  checkIfCoordinatesAreNotHit() {
    const coordinates = this.generateRandomCoordinates();
    if (this.receiveAttack(coordinates) === null) {
      return this.checkIfCoordinatesAreNotHit()
    }
    return coordinates
  }
}
