const Gameboard = require("./gameboard")

describe("Gameboard testing", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("should add vertices correctly", () => {
    gameboard.addVertex([1, 1]);
    gameboard.addVertex([10, 10]);

    expect(gameboard.findVertex([1, 1])).not.toBe(null);
    expect(gameboard.findVertex([10,10])).not.toBe(null);
  });

  test("should find vertex correctly", () => {

  
  })
});
