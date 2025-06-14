const axios = require("axios");
const path = require("path");
const fs = require("fs");
const BASE_URL = require("../api/apiConfig");
const inquirer = require("inquirer");
const eventPrompt = require("../prompts/eventPrompt");
const chalk = require("chalk");
const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

/**
 * Fetches and displays details of a selected public event.
 */
async function eventDetails() {
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

    const events = response.data.filter((event) => event.isPublic);

    const { eventId } = await eventPrompt(events);

    const eventResponse = await axios.get(`${BASE_URL}/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const event = eventResponse.data;
    console.log("\n");
    console.log(chalk.green("Event Details:\n"));
    console.log(`Title: ${event.title}`);
    console.log(`Description: ${event.description}`);
    console.log(`Date: ${event.date}`);
    console.log(`Location: ${event.location}`);
    console.log(`Public: ${event.isPublic ? "Yes" : "No"}`);
    console.log(`Requires Approval: ${event.requiresApproval ? "Yes" : "No"}`);
    console.log(`Requires Payment: ${event.requiresPayment ? "Yes" : "No"}`);
    console.log(`Max Participants: ${event.maxParticipants}`);
    console.log(
      `Organizers: ${event.organizers.map((org) => org.name).join(", ")}`
    );
    console.log("\n");
  } catch (error) {
    if (error.response) {
      console.log("\n");

      console.error("Error:", error.response.data.message);
      console.log("\n");
    } else {
      console.log("\n");
      console.error("Error fetching event details, please login");
      console.log("\n");
    }
  }
}

module.exports = eventDetails;
