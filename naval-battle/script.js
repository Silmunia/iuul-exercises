class InputParser {
    constructor(input) {
        this.rawInput = input;
    }

    getParsedInput() {
        var parsedInputArray = [];

        var boardInfoAray = [];
        var shotsInfoArray = [];

        for (let i = 0; i < this.rawInput.length; i++) {

            const splitInput = this.rawInput[i].split(" ").filter((element) => element != "");

            if (i == 0) {
                parsedInputArray.push(splitInput);
            } else if (i <= parsedInputArray[0][0]) {
                boardInfoAray.push(splitInput);
            } else if (splitInput.length == 1) {
                parsedInputArray.push(boardInfoAray);
                parsedInputArray.push(splitInput);
            } else {
                shotsInfoArray.push(splitInput);
            }
        }

        parsedInputArray.push(shotsInfoArray);

        return parsedInputArray;
    }
}

function runTest() {
    var input = "5 5\n..#.#\n#....\n...#.\n#....\n...#.\n5\n1 3\n1 4\n1 5\n2 1\n3 4";
    var lines = input.split('\n');

    const inputParser = new InputParser(lines);

    console.log(inputParser.getParsedInput());
}