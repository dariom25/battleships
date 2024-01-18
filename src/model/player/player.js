export default class Player {
  constructor() {
    this.shots = [];
  }
  playerInput(coordinates) {
    return coordinates;
  }

  computerInput() {
    let input = [];
    for (let i = 0; i < 2; i++) {
      const randomInt = Math.floor(Math.random() * 9);
      input.push(randomInt);
    }
    if (this.containsSubarray(this.shots, input)) {
      this.computerInput()
    } else {
      this.shots.push(input);
      return input;
    }
  }

  containsSubarray(outerArray, targetSubarray) {
    return outerArray.some(
      (subarray) =>
        subarray.length === targetSubarray.length &&
        subarray.every((element, index) => element === targetSubarray[index]),
    );
  }
}
