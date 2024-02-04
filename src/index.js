import View from "./view/view";
import Gameboard from "./model/gameboard/gameboard";
import Controller from "./controller/controller";

const view = new View();
const playerModel = new Gameboard();
const computerModel = new Gameboard();
const app = new Controller(playerModel, computerModel, view);
