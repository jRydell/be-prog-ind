const axios = require("axios");

async function listEvents() {
  try {
    const response = await axios.get(`${process.env.API_URL}/events`);
    console.log("Public Events:", response.data);
  } catch (error) {
    console.error("Error fetching events:", error.message);
  }
}

module.exports = listEvents;
