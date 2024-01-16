export default class Vertex {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.connections = [];
    this.hasShip = false
    this.isHit = false
  }

  addConnection(connection) {
    this.connections.push(connection)
  }
}
