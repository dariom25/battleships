export default class GameboardGrid {
  constructor(gridTitle) {
    this.createGameboardContainer();
    this.addTitle(gridTitle);
    this.createGrid();
  }

  createGameboardContainer() {
    const gameboardContainer = document.createElement("div");
    gameboardContainer.classList.add("gameboard-container");
    const mainContent = document.querySelector(".main-content");
    mainContent.appendChild(gameboardContainer);
  }

  createGrid() {
    const gameboardContainer = document.querySelector(".gameboard-container");
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    for (let i = 0; i < 10; i++) {
      for (let i = 0; i < 10; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gridContainer.appendChild(cell);
      }
    }
    gameboardContainer.appendChild(gridContainer);
  }

  addTitle(gridTitle) {
    const gameboardContainer = document.querySelector(".gameboard-container");
    const title = document.createElement("div");
    title.textContent = `${gridTitle}:`;
    title.classList.add("role-title");
    gameboardContainer.appendChild(title);
  }
}
