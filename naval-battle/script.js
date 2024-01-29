class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Gameboard {
    constructor(size, boardState, numberOfShots, shotsInfo) {
        this.lines = size[0];
        this.columns = size[1];
        this.boardState = boardState;
        this.numberOfShots = numberOfShots;
        this.shotsInfo = shotsInfo;
    }

    getShipsDestroyed() {
        var shipCounter = 0;

        for (let i = 0; i < this.numberOfShots; i++) {
            
            const shotCoordinateX = this.shotsInfo[i].x-1;
            const shotCoordinateY = this.shotsInfo[i].y-1;

            if (this.boardState[shotCoordinateX][shotCoordinateY] == "#") {
                shipCounter += 1;
            }
        }

        return shipCounter;
    }
}

class InputParser {
    constructor(input) {
        this.rawInput = input;
    }

    getParsedInput() {
        var gameboardSize = null;
        var gameboardLines = [];
        var numberOfShots = null;
        var shotsInfoArray = [];

        for (let i = 0; i < this.rawInput.length; i++) {

            const splitInput = this.rawInput[i].split(" ").filter((element) => element != "");

            if (i == 0) {
                gameboardSize = splitInput;
            } else if (i <= gameboardSize[0]) {
                const gameLine = splitInput[0].split("");
                
                gameboardLines.push(gameLine);
            } else if (splitInput.length == 1) {
                numberOfShots = splitInput[0];
            } else {
                const shotCoordinate = new Coordinates(splitInput[0], splitInput[1]);

                shotsInfoArray.push(shotCoordinate);
            }
        }

        return new Gameboard(gameboardSize, gameboardLines, numberOfShots, shotsInfoArray);
    }
}

function runTest() {
    var input = "5 5\n..#.#\n#....\n...#.\n#....\n...#.\n5\n1 3\n1 4\n1 5\n2 1\n3 4";
    var lines = input.split('\n');

    const inputParser = new InputParser(lines);

    const gameboard = inputParser.getParsedInput();

    console.log(gameboard.getShipsDestroyed());
}