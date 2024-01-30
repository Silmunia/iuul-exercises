class Coordinates {
    constructor(x, y) {

        if (isNaN(x) || isNaN(y) || x < 0 || y < 0 || x > 10000 || y > 10000) {
            throw new Error("Coordinates constructor expects two numbers between 0 and 10.000, and received [" + x + " - " + y + "] instead. Program aborted.");
        }

        this.x = x;
        this.y = y;
    }
}
  
class Meteorite {
    constructor(coordinateArray) {

        if (coordinateArray.length != 2) {
            throw new Error("Meteorite constructor expects an Array with two elements and received [" + coordinateArray + "] instead. Program aborted.");
        }

        this.coordinates = new Coordinates(coordinateArray[0], coordinateArray[1]);
    }
}
  
class Farm {
    constructor(coordinateArray) {

        if (coordinateArray.length != 4) {
            throw new Error("Farm constructor expects an Array with four elements and received [" + coordinateArray + "] instead. Program aborted.");
        }

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
            throw new Error("Input does not include an entry to indicate end of input. Program aborted with input: " + this.rawInput);
        }

        let currentIndex = 0;
        let currentInput = this.rawInput[currentIndex];

        let parsedInfoArray = [];
        let testInfoArray = [null, null];
        let meteoriteCoordinatesArray = [];

        let meteoriteCounter = null;

        while (currentInput !== "0 0 0 0") {
            
            const splitInput = currentInput.split(" ").filter((element) => element !== "");

            switch (splitInput.length) {
                case 1:
    
                    if (testInfoArray[0] === null) {
                        throw new Error("Expected farm coordinates and received meteorite coordinates instead. Program aborted with input: " + this.rawInput);
                    } else if (meteoriteCounter !== null) {
                        throw new Error("Expected meteorite coordinates and received number of meteorites instead. Program aborted with input: " + this.rawInput);
                    } else if (splitInput[0] < 0 || splitInput[0] > 10000) {
                        throw new Error("Expected number of meteorites between 0 and 10000, and received " + splitInput[0] + " instead. Program aborted with input: " + this.rawInput);
                    } else if (splitInput[0] === "0") {
                        testInfoArray = [null, null];
                        meteoriteCoordinatesArray = [];
                        meteoriteCounter = null;
                    } else {
                        meteoriteCounter = splitInput[0];
                    }
                    
                    break;
    
                case 2:
    
                    if (testInfoArray[0] === null) {
                        throw new Error("Expected farm coordinates and received meteorite coordinates instead. Program aborted with input: " + this.rawInput);
                    } else if (meteoriteCounter === null) {
                        throw new Error("Expected number of meteorites and received meteorite coordinates instead. Program aborted with input: " + this.rawInput);
                    } else if (meteoriteCoordinatesArray.length > meteoriteCounter) {
                        throw new Error("Expected " + meteoriteCandidates + " meteorite coordinates and received " + meteoriteCandidateCounter + " instead. Program aborted with input: " + this.rawInput);
                    } else {
                        meteoriteCoordinatesArray.push(splitInput);

                        if (meteoriteCoordinatesArray.length == meteoriteCounter) {

                            testInfoArray[1] = meteoriteCoordinatesArray;
                            parsedInfoArray.push(testInfoArray);

                            testInfoArray = [null, null];
                            meteoriteCoordinatesArray = [];
                            meteoriteCounter = null;
                        }
                    }
                    
                    break;
    
                case 4:
                        
                    if (testInfoArray[0] !== null) {
                        throw new Error("Expected number of meteorites and received area coordinates instead. Program aborted with input: " + this.rawInput);
                    } else {
                        testInfoArray[0] = splitInput;    
                    }
                    
                    break;
    
                default:
                    throw new Error("Input includes input with invalid number of arguments:" + splitInput + ". Program aborted with input: " + this.rawInput);
            }
    
            currentIndex += 1;
            currentInput = this.rawInput[currentIndex];
        }

        return parsedInfoArray;
    }
}

function runTest() {
    let input = "2 4 5 1\n2\n1 2\n3 3\n2 4 3 2\n3\n1 1\n2 2\n3 3\n0 10000 10000 0\n4\n0 0\n0 10000\n10000 0\n10000 10000\n0 0 0 0";
    let lines = input.split('\n');

    const inputParser = new InputParser(lines);

    const testManager = new TestManager();

    testManager.startTesting(inputParser.outputParsedInput());
}
