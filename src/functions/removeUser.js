const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { selectEvent, selectUser } = require("../prompts/removePrompt");
const BASE_URL = require("../api/apiConfig");
const chalk = require("chalk");
const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

/**
 * Remove a user from a public event.
 */

async function removeUser() {
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

    const eventDetailsResponse = await axios.get(
      `${BASE_URL}/events/${selectedEventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const participantIds = eventDetailsResponse.data.participants;

    if (participantIds.length === 0) {
      console.log("\n");
      console.log(chalk.red("Error: No participants found for this event.\n"));
      return;
    }

    const users = await Promise.all(
      participantIds.map(async (id) => {
        const userResponse = await axios.get(`${BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return userResponse.data;
      })
    );

    const selectedUserId = await selectUser(users);

    await axios.delete(
      `${BASE_URL}/events/${selectedEventId}/participants/${selectedUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("\n");
    console.log(chalk.green("User removed successfully!\n"));
  } catch (error) {
    if (error.response) {
      console.log("\n");
      console.error("Error:", error.response.data.message);
      console.log("\n");
    } else {
      console.log("\n");
      console.error("Error removing user, please login");
      console.log("\n");
    }
  }
}

module.exports = removeUser;
