export default class Player{
    
    playerInput(coordinates) {
        return coordinates
    }

    computerInput() {
        let input = []
        for (let i = 0; i < 2; i++) {
            const randomInt = Math.floor(Math.random()*9)
            input.push(randomInt)
        }
        return input
    }
}