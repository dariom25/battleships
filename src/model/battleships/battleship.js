// class has to be exported
export default class Battleship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false
  }

  hit() {
    if (this.length > this.hits) this.hits++;
  }

  isSunk() {
    if (this.length === this.hits) {
        return true;
    }
    return false;
  }
};
