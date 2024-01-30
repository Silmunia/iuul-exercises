class Coordinates {
    constructor(x, y) {
        if (isNaN(x) || isNaN(y)) {
            throw new Error("Coordinates constructor expects two numbers as parameters and received [" + x + "-" + y + "] instead. Program aborted.");
        }

        this.x = Number(x);
        this.y = Number(y);
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
            return "hit";
        }
    }
}

class Ship {
    constructor(parts) {
        this.parts = parts;
        this.destroyedParts = 0;
        this.status = "ok";
    }

    evaluateShipHit(shotCoordinates) {

        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i].status == "ok" 
                && this.parts[i].evaluatePartHit(shotCoordinates) == "hit") {
                this.destroyedParts += 1;

                if (this.destroyedParts == this.parts.length) {
                    this.status = "destroyed";
                    return this.status;
                } else {
                    return "hit";
                }
            }
        }

        return "ok";
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
        let shipPartsArray = [];

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
        const groupedParts = this.makePartGroups(input);

        let ships = [];

        for (let i = 0; i < groupedParts.length; i++) {
            const newShip = new Ship(groupedParts[i]);

            ships.push(newShip);
        }

        return ships;
    }

    makePartGroups(input) {
        let partGroupsArray = [];
        let jointParts = [];
        let rawPartsArray = input;

        while (rawPartsArray.length > 0) {
            jointParts.push(rawPartsArray[0]);
            rawPartsArray.splice(0,1);

            for (let i = 0; i < jointParts.length; i++) {
                for (let j = 0; j < rawPartsArray.length; ) {
                    if (this.isCoordinateNeighbor(jointParts[i], rawPartsArray[j])) {
                        jointParts.push(rawPartsArray[j]);
                        rawPartsArray.splice(j,1);
                    } else {
                        j += 1;
                    }
                }
            }

            partGroupsArray.push(jointParts);
            jointParts = [];
        }

        return partGroupsArray;
    }

    isCoordinateNeighbor(a, b) {
        return (a.x == b.x && (a.y-1 == b.y || a.y+1 == b.y))
            || (a.y == b.y && (a.x-1 == b.x || a.x+1 == b.x));
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

    getShipsInGameboard(input) {
        const shipMaker = new ShipMaker(input);

        return shipMaker.getGameShips();
    }

    getShipsDestroyed() {

        let shipCounter = 0;
        var activeShips = this.boardShips;

        for (let i = 0; i < this.numberOfShots; i++) {
            for (let j = 0; j < activeShips.length; j++) {

                let shotResult = activeShips[j].evaluateShipHit(this.shotsInfo[i]);

                switch(shotResult) {
                    case "destroyed":
                        activeShips.splice(j, 0);
                        shipCounter += 1;
                        break;
                    case "hit":
                        break;
                    default:
                        continue;
                }
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
        let gameboardSize = null;
        let gameboardLines = [];
        let numberOfShots = null;
        let shotsInfoArray = [];

        for (let i = 0; i < this.rawInput.length; i++) {

            const splitInput = this.rawInput[i].split(" ").filter((element) => element !== "");

            if (i === 0) {
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
    let input = "5 5\n..#.#\n#....\n...#.\n#....\n...#.\n5\n1 3\n1 4\n1 5\n2 1\n3 4";
    //let input = "5 5\n..###\n.....\n#####\n.....\n#.##.\n5\n5 1\n5 2\n1 3\n1 4\n1 5";
    //let input = "7 7\n.#....#\n###..##\n.#....#\n....#.#\n.#..#.#\n.####.#\n.......\n8\n1 1\n1 2\n2 1\n2 2\n2 3\n3 2\n5 2\n6 2";
    let lines = input.split('\n');

    const inputParser = new InputParser(lines);

    const gameboard = new Gameboard(inputParser.getParsedInput());

    console.log(gameboard.getShipsDestroyed());
}