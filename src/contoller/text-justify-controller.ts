import { Request, Response } from "express" 

/**
 * Justifies the given text to a specified line length.
 *
 * @param text - The input text to be justified.
 * @param lineLength - The maximum length of each justified line (default is 80).
 * @returns A string containing the justified text, with each line wrapped to the specified length.
 */
export const justifyText = (text: string, lineLength: number = 80): string => {
  const words = text.split(" ") // Split the text into an array of words
  let lines: string[] = [] // Initialize an array to hold the justified lines
  let currentLine: string[] = [] // Initialize an array to build the current line

  for (const word of words) {
    // Check if adding the next word exceeds the line length
    if (
      currentLine.join(" ").length + word.length + currentLine.length >
      lineLength
    ) {
      const justifiedLine = justifyLine(currentLine, lineLength) // Justify the current line
      lines.push(justifiedLine) // Add the justified line to the array of lines
      currentLine = [word] // Start a new line with the current word
    } else {
      currentLine.push(word) // Add the word to the current line
    }
  }

  // Add any remaining words as the last line without justification
  if (currentLine.length > 0) {
    lines.push(currentLine.join(" ")) // Append the last line
  }

  return lines.join("\n") // Join all lines with newline characters
}

/**
 * Justifies a single line of words to fit the specified line length.
 *
 * @param words - An array of words to justify.
 * @param lineLength - The maximum length of the justified line.
 * @returns A single string containing the justified line.
 */
const justifyLine = (words: string[], lineLength: number): string => {
  if (words.length === 1) return words[0] // If there's only one word, return it as is

  const totalChars = words.reduce((sum, word) => sum + word.length, 0) // Calculate total character count
  const totalSpaces = lineLength - totalChars // Calculate total spaces to distribute
  const spaceBetweenWords = Math.floor(totalSpaces / (words.length - 1)) // Base spaces between words
  const extraSpaces = totalSpaces % (words.length - 1) // Remaining spaces to distribute

  return words.reduce((justifiedLine, word, index) => {
    justifiedLine += word // Add the word to the justified line

    // Add base spaces
    if (index < words.length - 1) {
      justifiedLine += " ".repeat(spaceBetweenWords) // Add base spaces between words

      // Distribute any extra spaces to the first few gaps
      if (index < extraSpaces) {
        justifiedLine += " " // Add an extra space
      }
    }

    return justifiedLine // Return the current state of the justified line
  }, "")
}

/**
 * Express route handler for justifying text based on request input.
 *
 * @param req - The request object from Express, containing the input text and optional size parameter.
 * @param res - The response object from Express used to send the response back to the client.
 *
 * @returns void - Sends a JSON response with the justified text or an error message.
 */
export const justifyTextHandler = (req: Request, res: Response): any => {
  const { body, query } = req // Destructure the body and query from the request
  const { size }: { size?: number } = query // Extract the optional size parameter from query

  // Validate input text
  if (body.trim() === "") {
    return res.status(400).json({
      error: "Missing or invalid text", // Respond with an error if text is missing or empty
    })
  }

  // Justify the text using the specified size or default to 80
  const justifiedText = justifyText(body, size || 80)

  // Send the justified text as a plain text response
  return res.status(200).type("text/plain").send(justifiedText)
}
