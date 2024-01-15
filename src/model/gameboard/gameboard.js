import Queue from "./queue";
import Battleship from "../battleships/battleship";
import Vertex from "./vertex";

export default class Gameboard {
  constructor() {
    this.vertices = {};
    this.battleshipts = [];
    this.createGameboard()
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
    // check if the coordinates are legal --> add eventlistener to each cell
    // check if ship exists already

    const startVertex = this.findVertex(startCoordinate);
    const endVertex = this.findVertex(endCoordinate);

    if (startVertex === null) return null;
    if (endVertex === null) return null;
    if (startVertex === endVertex) return null;

    let queue = new Queue();
    let visited = new Set();

    queue.enqueue([startVertex, [startVertex.values]]);
    visited.add(startVertex);
    while (queue.queue.length !== 0) {
      const [vertex, path] = queue.dequeue();
      if (vertex === endVertex) return path;
      if (!visited.has(vertex)) {
        visited.add(vertex);
      }
      // legal moves do not exist anymore
      vertex.legalMoves.forEach((move) => {
        if (!visited.has(move)) {
          visited.add(move);
          let newPath = path.concat(move.values);
          queue.enqueue([move, [newPath]]);
        }
      });
    }
    return null;
  }
}
