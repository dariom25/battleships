import GameboardGrid from "./gameboardComponent/gameboardGrid";
import Header from "./header/header";

export default class View {
  constructor() {
    this.header = new Header();
    this.gameboardGrid = new GameboardGrid();
  }
}
