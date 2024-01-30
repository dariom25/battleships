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
    this.view.submitCoordinates();
  }
}
