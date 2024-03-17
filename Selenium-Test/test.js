const { Builder, By, Key, until } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function testApiResponseBodyWithSelenium() {
  try {
    // Make a GET request to the API endpoint using Axios
    const response = await axios.get('https://www.konga.com/');

    // Access the response body
    const responseBody = response.data;

    // Launch the browser
    let driver = await new Builder().forBrowser('chrome').build();

    try {
      // Create a dummy HTML page with a script to access the response body
      const dummyHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Dummy Page</title>
        </head>
        <body>
          <script>
            // Inject the response body obtained from Axios
            window.apiResponseBody = ${JSON.stringify(responseBody)};
          </script>
        </body>
        </html>
      `;

      // Write the dummy HTML content to a temporary file
 
      //const tmpFilePath = path.join('./Selenium-Test/', 'dummy.html');
      const filePath = './Selenium-Test/dummy.html';
      const data = 'dummy.html';
      fs.writeFileSync(filePath, data);

      // Navigate to the dummy HTML page
      await driver.get(`file://${filePath}`);

      // Access the response body from the page using Selenium WebDriver
      const apiResponseBody = await driver.executeScript('return window.apiResponseBody');

      // Check if the response body contains the expected content
      if (apiResponseBody) {
        console.log('Buy Phones, Fashion, Electronics in Nigeria');
      } else {
        console.log('Response body does not contain expected content');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      // Quit the browser
      await driver.quit();

      // Delete the temporary HTML file
      //fs.unlinkSync(tmpFilePath);
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Run the test
testApiResponseBodyWithSelenium();