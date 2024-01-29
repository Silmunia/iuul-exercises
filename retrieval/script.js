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

            parsedInputArray.push([this.rawInput[i], this.rawInput[i+1]]);
        }

        return parsedInputArray;
    }
}



function runTest() {
    var input = "1\n0\n7\n1 2 3 4 5 6 7\n3\n5 20 35";
    var lines = input.split('\n');

    const inputParser = new InputParser(lines);

    console.log(inputParser.getParsedInput());
}