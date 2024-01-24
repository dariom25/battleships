export default class GameboardGrid {
  constructor(gridTitle) {
    this.createGrid();
    this.createGameboardContainer();
    this.addTitle(gridTitle);
  }

  createGameboardContainer() {
    const gameboardContainer = document.createElement("div");
    gameboardContainer.classList.add("gameboard-container");
    const mainContent = document.querySelector(".main-content");
    mainContent.appendChild(gameboardContainer);
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

  addTitle(gridTitle) {
    const gameboardContainer = document.querySelector(".gameboard-container");
    const title = document.createElement("div");
    title.textContent = `${gridTitle}`;
    gameboardContainer.appendChild(title);
  }
}
