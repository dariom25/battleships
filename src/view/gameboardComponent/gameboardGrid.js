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
    const gameboardContainer = document.querySelector(
      `.gameboard-container.${gridTitle}`,
    );
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    gridContainer.classList.add(`${gridTitle}`);

    // Create header row for column labels
    const headerRow = document.createElement("div");
    headerRow.classList.add("grid-header-row");
    // Add an empty cell for the top-left corner
    const cornerCell = document.createElement("div");
    cornerCell.classList.add("corner-cell");
    headerRow.appendChild(cornerCell);

    for (let col = 1; col < 11; col++) {
      const colLabel = document.createElement("div");
      colLabel.classList.add("col-label");
      colLabel.textContent = col;
      headerRow.appendChild(colLabel);
    }
    gridContainer.appendChild(headerRow);

    // Create rows with cells
    for (let row = 1; row < 11; row++) {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("row-container");

      // Create row label
      const rowLabel = document.createElement("div");
      rowLabel.classList.add("row-label");
      rowLabel.textContent = row;
      rowContainer.appendChild(rowLabel);

      // Create cells
      for (let col = 1; col < 11; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(`${row},${col}`);
        cell.classList.add(`${gridTitle}`);
        rowContainer.appendChild(cell);
      }

      gridContainer.appendChild(rowContainer);
    }

    gameboardContainer.appendChild(gridContainer);
  }

  addTitle(gridTitle) {
    const gameboardContainer = document.querySelector(
      `.gameboard-container.${gridTitle}`,
    );
    const title = document.createElement("div");
    title.textContent = `${gridTitle}:`;
    title.classList.add("role-title");
    gameboardContainer.appendChild(title);
  }
}
