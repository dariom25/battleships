import Queue from "./queue";
import Battleship from "../battleships/battleship";
import Vertex from "./vertex";

export default class Gameboard {
  constructor() {
    this.vertices = {};
    this.battleships = [];
    this.createGameboard();
  }

  arrayToKey(array) {
    return array.join(",");
  }

  createGameboard() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
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
        if (newRow <= 9 && newRow >= 0 && newCol <= 9 && newCol >= 0) {
          const targetVertex = this.findVertex([newRow, newCol]);
          if (targetVertex !== null) {
            vertex.addConnection(targetVertex);
          }
        }
      });
    });
  }

  addVertex(identifier) {
    identifier = this.arrayToKey(identifier);
    if (identifier in this.vertices) {
      return;
    } else {
      this.vertices[identifier] = new Vertex(identifier);
    }
  }

  findVertex(identifier) {
    identifier = this.arrayToKey(identifier);
    if (identifier in this.vertices) {
      return this.vertices[identifier];
    }
    return null;
  }

  placeBattleship(startCoordinate, endCoordinate) {
    // check if the coordinates are legal (and add eventlistener to each cell)
    // check if ship exists already
    // check if coordinates are already used

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

    function extract(list) {
      list.forEach((item) => {
        if (Array.isArray(item)) {
          extract(item);
        } else {
          result.push(item);
        }
      });
    }

    extract(list);
    return result;
  }

  processCoordinates(list, battleship) {
    list.forEach((element) => {
      element = element.split(",");
      element = element.map(function (str) {
        return parseInt(str);
      });
      const vertex = this.findVertex(element);
      vertex.hasShip = true;
      battleship.coordinates.push(vertex);
    });
  }

  receiveAttack(coordinates) {
    //check if coodinates are formatted correctly

    const vertex = this.findVertex(coordinates);
    if (vertex.isHit === true) return null;
    if (vertex.hasShip === true) {
      this.battleships.forEach((battleship) => {
        battleship.coordinates.forEach((coordinate) => {
          if (coordinate === vertex) {
            vertex.isHit = true;
            battleship.hit();
            if (battleship.isSunk()) battleship.sunk = true;
          }
        });
      });
    }
  }

  isGameOver(battleships) {
    return battleships.every(battleship => battleship.sunk);
  }
}
