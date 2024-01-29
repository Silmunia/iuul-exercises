class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Gameboard {
    constructor(parameters) {
        this.lines = parameters[0][0];
        this.columns = parameters[0][1];
        this.boardState = parameters[1];
        this.numberOfShots = parameters[2];
        this.shotsInfo = parameters[3];
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

        return [gameboardSize, gameboardLines, numberOfShots, shotsInfoArray];
    }
}

function runTest() {
    //var input = "5 5\n..#.#\n#....\n...#.\n#....\n...#.\n5\n1 3\n1 4\n1 5\n2 1\n3 4";
    var input = "5 5\n..###\n.....\n#####\n.....\n#.##.\n5\n5 1\n5 2\n1 3\n1 4\n1 5";
    var lines = input.split('\n');

    const inputParser = new InputParser(lines);

    const gameboard = new Gameboard(inputParser.getParsedInput());

    console.log(gameboard.getShipsDestroyed());
}