import Vertex from "./vertex";

export default class Gameboard {
  constructor() {
    this.vertices = {};
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
      const row = vertex.values[0];
      const col = vertex.values.slice(-1);
      legalConnections.forEach(connection => {
        const newRow = parseInt(row) + connection[0]
        const newCol = parseInt(col) + connection[1]
        if (newRow <= 9 && newRow >= 0 && newCol <= 9 && newCol >= 0) {
            const targetVertex = this.findVertex([newRow, newCol])
            if (targetVertex !== null) {
                vertex.addConnection(targetVertex)
            }
        }
      })
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
}
