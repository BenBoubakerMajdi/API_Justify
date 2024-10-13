# Justify API

## Objective

This project implements and deploys a REST API that justifies a given text. Justification refers to adjusting the spacing between words in a text to ensure that the text aligns perfectly on both the left and right sides.

## Constraints

- The justified text must have a line length of 80 characters.
- The endpoint for text justification is `/api/justify`, which returns justified text upon receiving a POST request with a body of Content-Type `text/plain`.
- The API uses a token-based authentication mechanism. A unique token can be obtained via the endpoint `/api/token`, which requires a POST request with a JSON body containing the user's email (e.g., `{"email": "foo@bar.com"}`).
- Each token has a rate limit for the `/api/justify` endpoint, allowing a maximum of 80,000 words per day. If this limit is exceeded, the API will respond with a `402 Payment Required` error.
- The code must be deployed to a publicly accessible URL or IP address.
- The source code is hosted on GitHub (or GitLab).
- Language: Node.js with TypeScript.
- **No external libraries are used for text justification.**

### Prerequisites

- Node.js (v20.15.1 or higher)
- npm 
- TypeScript
- A MongoDB Atlas database (for user authentication and token storage)

### API Endpoints

- **POST `/api/token`**
  - Request body: `{ "email": "email@example.com" }`
  - Response: `{ "email": "email@example.com", "token": "the_generated_token" }`

- **POST `/api/justify`**
  - Request headers: `Authorization: Bearer the_generated_token`
  - Request body: `text_to_justify` (Content-Type: `text/plain`)
  - Response: `{ justified_text }`

### Rate Limiting

- Each token is limited to 80,000 words per day for the `/api/justify` endpoint. Exceeding this limit will result in a `402 Payment Required` error.

## Deployment

The application is deployed on a public server. Access it .


Feel free to fork the repository and submit pull requests for any enhancements or fixes.

## License

This project is licensed under the MIT License.
