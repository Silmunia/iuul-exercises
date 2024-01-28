class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
  
class Meteorite {
    constructor(coordinateArray) {
        this.coordinates = new Coordinates(coordinateArray[0], coordinateArray[1]);
    }
}
  
class Farm {
    constructor(coordinateArray) {
        this.topLeftCoordinate = new Coordinates(coordinateArray[0], coordinateArray[1]);
        this.bottomRightCoordinate = new Coordinates(coordinateArray[2], coordinateArray[3]);

        this.meteoriteHits = 0;
    }

    evaluateMeteoriteHit(meteorite) {
        if (meteorite.coordinates.x >= this.topLeftCoordinate.x 
            && meteorite.coordinates.x <= this.bottomRightCoordinate.x 
            && meteorite.coordinates.y <= this.topLeftCoordinate.y 
            && meteorite.coordinates.y >= this.bottomRightCoordinate.y) {

            this.meteoriteHits += 1;

        }
    }
}

class TestManager {
    constructor() {
        this.testCounter = 1;
    }

    startTesting(parsedInput) {
        for (let i = 0; i < parsedInput.length; i++) {
            this.runIndividualTest(parsedInput[i]);
        }
    }

    runIndividualTest(testInput) {

        const farmInstance = new Farm(testInput[0]);

        for (let i = 0; i < testInput[1].length; i++) {
            const meteorite = new Meteorite(testInput[1][i]);

            farmInstance.evaluateMeteoriteHit(meteorite);
        }

        this.outputTestResult(farmInstance.meteoriteHits);
    }

    outputTestResult(meteoriteHits) {
        console.log("Teste " + this.testCounter);
        console.log(meteoriteHits);

        this.testCounter += 1;
    }
} 

class InputParser {
    constructor(input) {
        this.rawInput = input;
    }

    outputParsedInput() {
        if (!this.rawInput.includes("0 0 0 0")) {
            throw new Error("Input does not include an entry to indicate end of input. Program aborted.");
        }

        var currentIndex = 0;
        var currentInput = this.rawInput[currentIndex];

        var parsedInfoArray = [];
        var testInfoArray = [null, null];
        var meteoriteCoordinatesArray = [];

        var meteoriteCounter = 0;

        while (currentInput !== "0 0 0 0") {

            const splitInput = currentInput.split(" ");

            switch (splitInput.length) {
                case 1:
    
                    if (testInfoArray[0] === null) {
                        throw new Error("Expected farm coordinates and received meteorite coordinates instead. Program aborted.");
                    } else if (meteoriteCounter !== 0) {
                        throw new Error("Expected meteorite coordinates and received number of meteorites instead. Program aborted.");
                    } else {
                        meteoriteCounter = splitInput[0];
                    }
                    
                    break;
    
                case 2:
    
                    if (testInfoArray[0] === null) {
                        throw new Error("Expected farm coordinates and received meteorite coordinates instead. Program aborted.");
                    } else if (meteoriteCounter === 0) {
                        throw new Error("Expected number of meteorites and received meteorite coordinates instead. Program aborted.");
                    } else if (meteoriteCoordinatesArray.length > meteoriteCounter) {
                        throw new Error("Expected " + meteoriteCandidates + " meteorite coordinates and received " + meteoriteCandidateCounter + " instead. Program aborted.");
                    } else {
                        meteoriteCoordinatesArray.push(splitInput);

                        if (meteoriteCoordinatesArray.length == meteoriteCounter) {

                            testInfoArray[1] = meteoriteCoordinatesArray;
                            parsedInfoArray.push(testInfoArray);

                            testInfoArray = [null, null];
                            meteoriteCoordinatesArray = [];
                            meteoriteCounter = 0;
                        }
                    }
                    
                    break;
    
                case 4:
                        
                    if (testInfoArray[0] !== null) {
                        throw new Error("Expected number of meteorites and received area coordinates instead. Program aborted.");
                    } else {
                        testInfoArray[0] = splitInput;    
                    }
                    
                    break;
    
                default:
                    throw new Error("Input includes input with invalid number of arguments:" + splitInput + ". Program aborted.");
            }
    
            currentIndex += 1;
            currentInput = this.rawInput[currentIndex];
        }

        return parsedInfoArray;
    }
}

function runTest() {
    var input = "2 4 5 1\n2\n1 2\n3 3\n2 4 3 2\n3\n1 1\n2 2\n3 3\n0 0 0 0";
    var inputLines = input.split('\n');

    const inputParser = new InputParser(inputLines);

    const testManager = new TestManager();

    testManager.startTesting(inputParser.outputParsedInput());
}
