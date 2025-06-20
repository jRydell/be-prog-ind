const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../api/apiConfig");
const chalk = require("chalk");
const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

/**
 * Fetches and displays all public events
 */

async function listEvents() {
  try {
    const authData = JSON.parse(
      fs.readFileSync(authFilePath, { encoding: "utf8" })
    );
    const token = authData.token;

    const response = await axios.get(`${BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("\n");
    console.log(chalk.green("Public Events:\n"));

    response.data
      .filter((event) => event.isPublic)
      .forEach((event) => {
        console.log(event.title);
      });
    console.log("\n");
  } catch (error) {
    if (error.response) {
      console.log("\n");
      console.error("Error:", error.response.data.message);
      console.log("\n");
    } else {
      console.log("\n");
      console.error("Error fetching events, please login");
      console.log("\n");
    }
  }
}

module.exports = listEvents;
