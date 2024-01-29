class Gameboard {
    constructor(size, boardState, numberOfShots, shotsInfo) {
        this.lines = size[0];
        this.columns = size[1];
        this.boardState = boardState;
        this.numberOfShots = numberOfShots;
        this.shotsInfo = shotsInfo;
    }
}

class InputParser {
    constructor(input) {
        this.rawInput = input;
    }

    getParsedInput() {
        var gameboardSize = null;
        var gameboardState = [];
        var numberOfShots = null;
        var shotsInfoArray = [];

        for (let i = 0; i < this.rawInput.length; i++) {

            const splitInput = this.rawInput[i].split(" ").filter((element) => element != "");

            if (i == 0) {
                gameboardSize = splitInput;
            } else if (i <= gameboardSize[0]) {
                gameboardState.push(splitInput);
            } else if (splitInput.length == 1) {
                numberOfShots = splitInput[0];
            } else {
                shotsInfoArray.push(splitInput);
            }
        }

        return new Gameboard(gameboardSize, gameboardState, numberOfShots, shotsInfoArray);
    }
}

function runTest() {
    var input = "5 5\n..#.#\n#....\n...#.\n#....\n...#.\n5\n1 3\n1 4\n1 5\n2 1\n3 4";
    var lines = input.split('\n');

    const inputParser = new InputParser(lines);

    console.log(inputParser.getParsedInput());
}