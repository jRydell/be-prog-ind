const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../api/apiConfig");

const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

async function removeUser(eventId, userId) {
  try {
    const authData = JSON.parse(
      fs.readFileSync(authFilePath, { encoding: "utf8" })
    );
    const token = authData.token;

    console.log(
      `Removing user with ID: ${userId} from event with ID: ${eventId}`
    );

    const response = await axios.delete(
      `${BASE_URL}/events/${eventId}/participants/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("user removed successfully!");
  } catch (error) {
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else {
      console.error("Error removing user:", error.message);
    }
  }
}

module.exports = removeUser;
