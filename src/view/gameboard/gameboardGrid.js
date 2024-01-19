export default class GameboardGrid {
  constructor() {
    this.createGrid();
  }

  createGrid() {
    const mainContent = document.querySelector(".main-content");
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    for (let i = 0; i < 10; i++) {
      for (let i = 0; i < 10; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gridContainer.appendChild(cell);
      }
    }
    mainContent.appendChild(gridContainer);
  }
}
