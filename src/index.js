import View from "./view/view";
import Gameboard from "./model/gameboard/gameboard";
import Controller from "./controller/controller";

const view = new View();
const model = new Gameboard();
const app = new Controller(model, view);
