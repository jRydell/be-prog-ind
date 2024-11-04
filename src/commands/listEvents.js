const axios = require("axios");

async function listEvents() {
  try {
    const response = await axios.get(`${process.env.API_URL}/events`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_SECRET}`,
      },
    });
    console.log("Public Events:", response.data);
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
