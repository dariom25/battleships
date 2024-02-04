export default class Player {
  constructor() {
  }
  playerInput(coordinates) {
    return coordinates;
  }

  generateRandomCoordinates() {
    let input = [];
    for (let i = 0; i < 2; i++) {
      const randomInt = Math.floor(Math.random() * (10-1)) + 1;
      input.push(randomInt);
    }
    return input;
  }
}
