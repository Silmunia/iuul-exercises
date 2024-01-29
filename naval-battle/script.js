class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ShipPart extends Coordinates {
    constructor(x, y) {
        super(x, y);
        this.status = "ok";
    }

    evaluatePartHit(shotCoordinates) {
        if (shotCoordinates.x == this.x && shotCoordinates.y == this.y) {
            this.status = "destroyed";
        }
    }
}

class Ship {
    constructor(parts) {
        this.parts = parts;
        this.status = "ok";
    }

    evaluateShipHit(shotCoordinates) {

        var destructionCounter = 0;

        for (let i = 0; i < this.parts.length; i++) {

            this.parts[i].evaluatePartHit(shotCoordinates);

            if (this.parts[i].status == "destroyed") {
                destructionCounter += 1;
            }
        }

        if (destructionCounter == this.parts.length) {
            this.status = "destroyed";
        }
    }
}

class ShipMaker {
    constructor(input) {
        this.input = input;
    }

    getGameShips() {
        const shipParts = this.makeShipParts(this.input);

        return this.makeShips(shipParts);
    }

    makeShipParts(input) {
        var shipPartsArray = [];

        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                if (input[i][j] == "#") {
                    const newShipPart = new ShipPart(i+1, j+1);

                    shipPartsArray.push(newShipPart);
                }
            }
        }

        return shipPartsArray;
    }

    makeShips(input) {
        var ships = [];

        for (let i = 0; i < input.length; i++) {
            const newShip = new Ship([input[i]]);

            ships.push(newShip);
        }

        return ships;
    }
}

class Gameboard {
    constructor(parameters) {
        this.lines = parameters[0][0];
        this.columns = parameters[0][1];
        this.boardShips = this.getShipsInGameboard(parameters[1]);
        this.numberOfShots = parameters[2];
        this.shotsInfo = parameters[3];
    }

    getShipsInGameboard(gameboard) {
        const shipMaker = new ShipMaker(gameboard);

        return shipMaker.getGameShips();
    }

    evaluateGameShots() {
        for (let i = 0; i < this.numberOfShots; i++) {
            for (let j = 0; j < this.boardShips.length; j++) {
                this.boardShips[j].evaluateShipHit(this.shotsInfo[i]);
            }
        }
    }

    getShipsDestroyed() {
        var shipCounter = 0;

        this.evaluateGameShots();

        for (let j = 0; j < this.boardShips.length; j++) {
            if (this.boardShips[j].status == "destroyed") {
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