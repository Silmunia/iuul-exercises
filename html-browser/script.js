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
            if (inputWords[i] == "<br>") {
                currentLine = currentLine.slice(0, -1);
                currentLine += "\n";
                result += currentLine;
                currentLine = "";
            } else if (inputWords[i] == "<hr>") {
                currentLine = currentLine.slice(0, -1);
                result += currentLine.length > 0 ? currentLine + "\n" : "";
                currentLine = "";
                result += "--------------------------------------------------------------------------------\n";
            } else if (currentLine.length + inputWords[i].length <= 80) {
                if (i == inputWords.length-1) {
                    currentLine += inputWords[i] + "\n";
                    result += currentLine;
                } else {
                    currentLine += inputWords[i] + " ";
                }
            } else {
                currentLine = currentLine.slice(0, -1);
                result += currentLine + "\n";
                currentLine = inputWords[i] + " ";
            }
        }

        return result;
    }
}

function runTest() {
    //let input = "filename]... g++ [ option | filename ]... WARNING The information in this man page is an extract from the full documentation of the GNU C compiler, and is limited to the meaning of the options. This man page is not kept up to date except when volunteers want to maintain it. If you find a discrepancy between the man page and the software, please check the Info file,";
    let input = "Hallo, dies ist eine\nziemlich lange Zeile, die in Html\naber nicht umgebrochen wird.\n<br>\nZwei <br> <br> produzieren zwei Newlines.\nEs gibt auch noch das tag <hr> was einen Trenner darstellt.\nZwei <hr> <hr> produzieren zwei Horizontal Rulers.\nAchtung mehrere Leerzeichen irritieren\nHtml genauso wenig wie\nmehrere Leerzeilen.";
    let lines = input.split("\n");

    const processor = new HTMLProcessor(lines);

    console.log(processor.getProcessedInput());
}