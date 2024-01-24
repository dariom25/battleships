export default class GameboardGrid {
  constructor(gridTitle) {
    this.createGameboardContainer(gridTitle);
    this.addTitle(gridTitle);
    this.createGrid(gridTitle);
  }

  createGameboardContainer(gridTitle) {
    const gameboardContainer = document.createElement("div");
    gameboardContainer.classList.add("gameboard-container");
    gameboardContainer.classList.add(`${gridTitle}`);
    const mainContent = document.querySelector(".main-content>div");
    mainContent.appendChild(gameboardContainer);
  }

  createGrid(gridTitle) {
    const gameboardContainer = document.querySelector(`.gameboard-container.${gridTitle}`);
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
    const gameboardContainer = document.querySelector(`.gameboard-container.${gridTitle}`);
    const title = document.createElement("div");
    title.textContent = `${gridTitle}:`;
    title.classList.add("role-title");
    gameboardContainer.appendChild(title);
  }
}
