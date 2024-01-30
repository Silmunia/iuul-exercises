class HTMLProcessor {
    constructor(input) {
        this.rawWords = input;
    }

    getIndividualWords() {
        var wordsArray = [];

        for (let i = 0; i < this.rawWords.length; i++) {
            const lineWords = this.rawWords[i].split(" ").filter((word) => word !== "");

            for (let j = 0; j < lineWords.length; j++) {
                wordsArray.push(lineWords[j]);
            }
        }

        return wordsArray;
    }

    getProcessedInput() {

        const inputWords = this.getIndividualWords();

        let result = "";
        let currentLine = "";

        for (let i = 0; i < inputWords.length; i++) {
            if (currentLine.length + inputWords[i].length <= 80) {
                currentLine += inputWords[i] + " ";
            } else {
                result += currentLine + "\n";
                currentLine = inputWords[i] + " ";
            }
        }

        result += currentLine;

        return result;
    }
}

function runTest() {
    let input = "Hallo, dies ist eine\nziemlich lange Zeile, die in Html\naber nicht umgebrochen wird.\n<br>\nZwei <br> <br> produzieren zwei Newlines.\nEs gibt auch noch das tag <hr> was einen Trenner darstellt.\nZwei <hr> <hr> produzieren zwei Horizontal Rulers.\nAchtung mehrere Leerzeichen irritieren\nHtml genauso wenig wie\nmehrere Leerzeilen.";
    let lines = input.split("\n");

    const processor = new HTMLProcessor(lines);

    console.log(processor.getProcessedInput());
}