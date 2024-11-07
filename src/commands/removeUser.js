const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { selectEvent, selectUser } = require("../prompts/removePrompt");
const BASE_URL = require("../api/apiConfig");

const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

async function removeUser() {
  try {
    const authData = JSON.parse(
      fs.readFileSync(authFilePath, { encoding: "utf8" })
    );
    const token = authData.token;

    // Get events and select one
    const eventResponse = await axios.get(`${BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const events = eventResponse.data.filter((event) => event.isPublic);
    const selectedEventId = await selectEvent(events);

    // Get participant IDs for the selected event
    const eventDetailsResponse = await axios.get(
      `${BASE_URL}/events/${selectedEventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const participantIds = eventDetailsResponse.data.participants;

    // Fetch full user details for each participant ID
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

    // Select user to remove from the event
    const selectedUserId = await selectUser(users);

    // Remove the selected user from the event participants
    await axios.delete(
      `${BASE_URL}/events/${selectedEventId}/participants/${selectedUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("User removed successfully!");
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
