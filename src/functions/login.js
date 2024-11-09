const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../api/apiConfig");
const chalk = require("chalk");

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
    console.log(chalk.green("Login successful!\n"));

    const authData = {
      token: token,
    };

    fs.mkdirSync(path.join(__dirname, "..", "auth"));

    fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2), {
      encoding: "utf8",
    });

    return token;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data.message);
    }
    if (error.request) {
      console.log("\n");
      console.error("Error: server offline \n");
    }
  }
}

module.exports = login;
