const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { selectEvent, selectUser } = require("../prompts/regPrompt");
const BASE_URL = require("../api/apiConfig");
const chalk = require("chalk");
const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

/**
 * Registers a user for a public event.
 */
async function registerUser() {
  try {
    const authData = JSON.parse(
      fs.readFileSync(authFilePath, { encoding: "utf8" })
    );
    const token = authData.token;

    const eventResponse = await axios.get(`${BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const events = eventResponse.data.filter((event) => event.isPublic);
    const selectedEventId = await selectEvent(events);

    const userResponse = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const users = userResponse.data;

    const selectedUserId = await selectUser(users);

    await axios.post(
      `${BASE_URL}/events/${selectedEventId}/participants`,
      { userId: selectedUserId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("\n");
    console.log(chalk.green("User registered successfully!\n"));
  } catch (error) {
    if (error.response) {
      console.log("\n");

      console.error("Error:", error.response.data.message);
      console.log("\n");
    } else {
      console.log("\n");
      console.error("Error registering user, please login");
      console.log("\n");
    }
  }
}

module.exports = registerUser;
