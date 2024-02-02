export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bindEvents();
  }

  bindEvents() {
    this.view.bindShootCell();
    this.view.bindSubmitCoordinates(this.handleSubmitCoordinates);
  }

  handleSubmitCoordinates = () => {
    const startAndEndcoordinates = this.view.submitCoordinates();
    this.model.placeBattleship(startAndEndcoordinates[0], startAndEndcoordinates[1])
    this.view.displayShip(this.model.battleships);
    this.view.emptyInputs();
  };
}
