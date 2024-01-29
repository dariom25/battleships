export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  bindEvents() {
    this.view.bindShootCell();
    this.view.bindSubmitCoordinates();
  }
}
