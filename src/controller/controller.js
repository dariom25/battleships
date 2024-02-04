export default class Controller {
  constructor(playerModel, computerModel, view) {
    this.playerModel = playerModel;
    this.computerModel = computerModel;
    this.view = view;
    this.bindEvents();
  }

  bindEvents() {
    this.view.bindShootCell(this.handlePlayerShootCell);
    this.view.bindSubmitCoordinates(this.handleSubmitCoordinates);
  }

  handleSubmitCoordinates = () => {
    const startAndEndcoordinates = this.view.submitCoordinates();
    this.playerModel.placeBattleship(
      startAndEndcoordinates[0],
      startAndEndcoordinates[1],
    );
    this.view.displayShip(this.playerModel.battleships);
    this.view.emptyInputs();
  };

  handlePlayerShootCell = (clickedCell) => {
    this.computerModel.receiveAttack(clickedCell)
    this.view.displayShots(this.computerModel.vertices, clickedCell)
  }
}
