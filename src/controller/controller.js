export default class Controller {
  constructor(playerModel, computerModel, view, player, computer) {
    this.playerModel = playerModel;
    this.computerModel = computerModel;
    this.view = view;
    this.player = player;
    this.computer = computer;
    this.bindEvents();
    this.generateRandomComputersShip();
  }

  bindEvents() {
    this.view.bindShootCell(this.handlePlayerShootCell);
    this.view.bindSubmitCoordinates(this.handleSubmitCoordinates);
  }

  generateRandomComputersShip() {
    const ship = this.computerModel.generateRandomShip();
    console.log(ship);
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
    this.computerModel.receiveAttack(clickedCell);
    this.view.displayShots(this.computerModel.vertices, clickedCell);
  };
}
