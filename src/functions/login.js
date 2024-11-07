const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../api/apiConfig");

const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

/**
 * Logs in a user with the provided email and password.
 */
async function login(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    const token = response.data.token;
    console.log("\n");
    console.log("Login successful!\n");

    const authData = {
      token: token,
    };

    fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2), {
      encoding: "utf8",
    });

    return token;
  } catch (error) {
    console.log("\n");
    console.error("Login failed:", error.response?.data || error.message);
    console.log("\n");
  }
}

module.exports = login;
