/**
 * A simple Node.js server that handles three endpoints:
 * 1. /Get - Returns a "Hello World" message.
 * 2. /DaysBetweenDates - Calculates the number of days between two dates provided as query parameters.
 * 3. /ValidatePhoneNumber - Validates a phone number with Spanish format.
 */

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  /**
   * Endpoint: /Get
   * Method: GET
   * Description: Returns a "Hello World" message.
   * Response: 
   *   - Status: 200
   *   - Content-Type: text/plain
   *   - Body: "Hello World"
   */
  if (pathname === '/Get') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  } 
  /**
   * Endpoint: /DaysBetweenDates
   * Method: GET
   * Description: Calculates the number of days between two dates.
   * Query Parameters:
   *   - date1: The start date (required).
   *   - date2: The end date (required).
   * Response:
   *   - Status: 200
   *   - Content-Type: application/json
   *   - Body: { "daysBetween": <number_of_days> }
   *   - Status: 400 (if dates are invalid)
   *   - Content-Type: application/json
   *   - Body: { "error": "Invalid dates" }
   */
  else if (pathname === '/DaysBetweenDates') {
    const date1 = new Date(query.date1);
    const date2 = new Date(query.date2);

    if (!isNaN(date1) && !isNaN(date2)) {
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ daysBetween: diffDays }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid dates' }));
    }
  } 
  /**
   * Endpoint: /ValidatePhoneNumber
   * Method: GET
   * Description: Validates a Spanish phone number.
   * Query Parameters:
   *   - phoneNumber: The phone number to validate (required).
   * Response:
   *   - Status: 200
   *   - Content-Type: application/json
   *   - Body: { "result": "valid" | "invalid" }
   */
  else if (pathname === '/ValidatePhoneNumber') {
    const phoneNumber = query.phoneNumber;
    const phoneRegex = /^\+34[0-9]{9}$/;
    const isValid = phoneRegex.test(phoneNumber);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ result: isValid ? 'valid' : 'invalid' }));
  } 
  /**
   * Default case for undefined endpoints
   * Response:
   *   - Status: 404
   *   - Content-Type: text/plain
   *   - Body: "Not Found"
   */
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});