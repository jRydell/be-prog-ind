const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../api/apiConfig");

const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

async function registerUser(eventId, userId) {
  console.log(
    `Registering user with ID: ${userId} for event with ID: ${eventId}`
  );

  try {
    const authData = JSON.parse(
      fs.readFileSync(authFilePath, { encoding: "utf8" })
    );
    const token = authData.token;

    const response = await axios.post(
      `${BASE_URL}/events/${eventId}/participants`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("User registered successfully!");
  } catch (error) {
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else {
      console.error("Error registering user:", error.message);
    }
  }
}

module.exports = registerUser;
