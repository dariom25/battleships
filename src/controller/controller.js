export default class Controller {
  constructor(playerModel, computerModel, view, player, computer) {
    this.playerModel = playerModel;
    this.computerModel = computerModel;
    this.view = view;
    this.player = player;
    this.computer = computer;
    this.bindEvents();
    this.generateRandomComputerShips();
  }

  bindEvents() {
    this.view.bindShootCell(this.handlePlayerShootCell);
    this.view.bindSubmitCoordinates(this.handleSubmitCoordinates);
    this.view.bindGenerateRandomPlayerShips(
      this.handleGenerateRandomPlayerShips,
    );
    this.view.bindResetPlayerShips(this.handleResetPlayerShips);
  }

  generateRandomComputerShips() {
    for (let i = 0; i < 5; i++) {
      this.computerModel.placeBattleshipRandomly();
    }
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

  handleGenerateRandomPlayerShips = () => {
    for (let i = 0; i < 5; i++) {
      this.playerModel.placeBattleshipRandomly();
      this.view.displayShip(this.playerModel.battleships);
    }
  };

  handleResetPlayerShips = () => {
    this.playerModel.resetShips();
    this.view.resetPlayerShips();
  };
}
