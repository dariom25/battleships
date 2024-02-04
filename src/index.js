import View from "./view/view";
import Gameboard from "./model/gameboard/gameboard";
import Controller from "./controller/controller";
import Player from "./model/player/player";

const view = new View();
const playerModel = new Gameboard();
const computerModel = new Gameboard();
const player = new Player();
const computer = new Player();
const app = new Controller(playerModel, computerModel, view, player, computer);
