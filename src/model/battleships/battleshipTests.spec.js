const Battleship = require("./battleship.js");

describe("Battleship", () => {
  const battleship = new Battleship(3);

  test("define battleship class", () => {
    expect(typeof battleship).toBe("object");
  })

  test("checks if length of battleship is correct", () => {
    expect(battleship.length).toBeGreaterThan(0)
    expect(battleship.length).toBeLessThanOrEqual(5)
  })


  test("checks if hits increases correctly", () => {
    battleship.hit()
    expect(battleship.hits).toBe(1)
    battleship.hit()
    battleship.hit()
    battleship.hit()
  })

  test("checks if the number of hits correct", () => {
    expect(battleship.hits).toBeGreaterThanOrEqual(0)
    expect(battleship.hits).toBeLessThanOrEqual(battleship.length)
  })

  test("checks if isSunk method return state of battleship", () => {
    expect(battleship.isSunk()).toBe(true)
  })

  test("checks if ship is sunk", () => {
    expect(battleship.sunk).toBe(true)
  })
});
