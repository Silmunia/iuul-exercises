class InputParser {
    constructor(input) {
        this.rawInput = input;
    }

    getParsedInput() {
        var parsedInputArray = [];

        for (let i = 0; i < this.rawInput.length-1; i += 2) {
            if (isNaN(this.rawInput[i])) {
                continue;
            }

            const valuesToProcess = this.rawInput[i+1].split(" ").filter((value) => value != "");

            parsedInputArray.push([this.rawInput[i], valuesToProcess]);
        }

        return parsedInputArray;
    }
}

class TestUnit {
    constructor(counter, values) {
        if (isNaN(counter) || Number(counter) < 1 || Number(counter) > 100) {
            throw new Error("TestUnit constructor expects a 'counter' parameter between 1 and 100, and received " + counter + " instead. Program aborted.");
        }

        this.counter = Number(counter);
        this.values = [];

        for (let i = 0; i < values.length; i++) {
            if (isNaN(values[i])) {
                throw new Error("TestUnit constructor expects a 'values' parameter containing only numbers and received " + values + " instead. Program aborted.")
            }

            this.values.push(Number(values[i]));
        }
    }
}

class TestManager {
    constructor(input) {
        this.testCounter = 1;

        this.testInput = input;
    }

    startTests() {
        for (let i = 0; i < this.testInput.length; i++) {

            const currentTest = new TestUnit(this.testInput[i][0], this.testInput[i][1]);

            this.runIndividualTest(currentTest);
        }
    }
    
    runIndividualTest(testUnit) {

        var sum = 0;
        var result = null;
        const numberOfValues = testUnit.counter;
        const arrayOfValues = testUnit.values;

        for (let i = 0; i < numberOfValues; i++) {

            if (arrayOfValues[i] == sum) {
                result = arrayOfValues[i];
                break;
            }

            sum += arrayOfValues[i];
        }

        this.outputTestResult(result !== null ? result : "nao achei");
    }

    outputTestResult(result) {
        console.log("Instancia " + this.testCounter);
        console.log(result);
        console.log("\n");

        this.testCounter += 1;
    }
}



function runTest() {
    var input = "1\n0\n7\n1 2 3 4 5 6 7\n3\n5 20 35";
    var lines = input.split('\n');

    const inputParser = new InputParser(lines);

    const testManager = new TestManager(inputParser.getParsedInput());

    testManager.startTests();
}