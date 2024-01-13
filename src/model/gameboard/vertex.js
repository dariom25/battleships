export default class Vertex {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.connections = [];
  }

  addConnection(connection) {
    this.connections.push(connection)
  }
}
