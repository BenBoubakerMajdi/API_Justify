"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyTextHandler = exports.justifyText = void 0;
/**
 * Justifies the given text to a specified line length.
 * Returns the justified text with each line wrapped to the specified length.
 */
const justifyText = (text, lineLength = 80) => {
    const words = text.split(" ");
    let lines = [];
    let currentLine = [];
    for (const word of words) {
        if (currentLine.join(" ").length + word.length + currentLine.length >
            lineLength) {
            const justifiedLine = justifyLine(currentLine, lineLength);
            lines.push(justifiedLine);
            currentLine = [word];
        }
        else {
            currentLine.push(word);
        }
    }
    if (currentLine.length > 0) {
        lines.push(currentLine.join(" "));
    }
    return lines.join("\n");
};
exports.justifyText = justifyText;
/**
 * Justifies a single line of words to fit the specified line length.
 */
const justifyLine = (words, lineLength) => {
    if (words.length === 1)
        return words[0];
    const totalChars = words.reduce((sum, word) => sum + word.length, 0);
    const totalSpaces = lineLength - totalChars;
    const spaceBetweenWords = Math.floor(totalSpaces / (words.length - 1));
    const extraSpaces = totalSpaces % (words.length - 1);
    return words.reduce((justifiedLine, word, index) => {
        justifiedLine += word;
        if (index < words.length - 1) {
            justifiedLine += " ".repeat(spaceBetweenWords);
            if (index < extraSpaces) {
                justifiedLine += " ";
            }
        }
        return justifiedLine;
    }, "");
};
/**
 * Express route handler for justifying text based on request input.
 */
const justifyTextHandler = (req, res) => {
    const { body, query } = req;
    const { size } = query;
    if (body.trim() === "") {
        return res.status(400).json({
            error: "Missing or invalid text",
        });
    }
    const justifiedText = (0, exports.justifyText)(body, size || 80);
    return res.status(200).type("text/plain").send(justifiedText);
};
exports.justifyTextHandler = justifyTextHandler;
