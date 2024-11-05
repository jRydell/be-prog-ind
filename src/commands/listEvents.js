const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../api/apiConfig");

// Define the path to the auth.json file
const authFilePath = path.join(__dirname, "..", "auth", "auth.json");
console.log("🚀 ~ authFilePath:", authFilePath);

async function listEvents() {
  try {
    // Read the token from auth.json
    const authData = JSON.parse(
      fs.readFileSync(authFilePath, { encoding: "utf8" })
    );
    const token = authData.token;

    // Make the API request with the token
    const response = await axios.get(`${BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.data
      .filter((event) => event.isPublic)
      .forEach((event) => {
        console.log(event.title);
      });
  } catch (error) {
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else {
      console.error("Error fetching events:", error.message);
    }
  }
}

module.exports = listEvents;
