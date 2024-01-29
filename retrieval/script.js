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

class TestManager {
    constructor(input) {
        this.testCounter = 1;

        this.testInput = input;
    }

    startTests() {
        for (let i = 0; i < this.testInput.length; i++) {
            this.runIndividualTest(this.testInput[i]);
        }
    }
    
    runIndividualTest(input) {

        var sum = 0;
        var result = null;
        const numberOfValues = input[0];
        const arrayOfValues = input[1];

        for (let i = 0; i < numberOfValues; i++) {

            if (isNaN(arrayOfValues[i]) 
                || Number(arrayOfValues[i]) < -30 
                || Number(arrayOfValues[i]) > 30) {
                continue;
            }

            if (Number(arrayOfValues[i]) == sum) {
                result = arrayOfValues[i];
                break;
            }

            sum += Number(arrayOfValues[i]);
        }

        this.outputTestResult(result !== null ? result : "nao achei");
    }

    outputTestResult(result) {
        console.log("Instancia " + this.testCounter);
        console.log(result);
        console.log("\n");
    }
}



function runTest() {
    var input = "1\n0\n7\n1 2 3 4 5 6 7\n3\n5 20 35";
    var lines = input.split('\n');

    const inputParser = new InputParser(lines);

    const testManager = new TestManager(inputParser.getParsedInput());

    testManager.startTests();
}