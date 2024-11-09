const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../api/apiConfig");
const chalk = require("chalk");

const authFilePath = path.join(__dirname, "..", "auth", "auth.json");
const authFolderPath = path.join(__dirname, "..", "auth");

/**
 * Logs in a user with the provided email and password.
 */
async function login(email, password) {
  try {
    if (fs.existsSync(authFilePath)) {
      console.log("\n");
      console.log(chalk.green("Already logged in\n"));
      return;
    }
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    const token = response.data.token;
    console.log("\n");

    const authData = {
      token: token,
    };

    if (!fs.existsSync(authFolderPath)) {
      fs.mkdirSync(authFolderPath);
    }

    if (fs.existsSync(authFolderPath)) {
      fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2), {
        encoding: "utf8",
      });
      console.log(chalk.green("Login successful!\n"));
    } else {
      console.log(chalk.red("Login failed\n"));
    }

    return token;
  } catch (error) {
    if (error.response) {
      console.log("\n");
      console.error("Error:", error.response.data.message);
      console.log("\n");
    } else if (error.request) {
      console.error("Error: Could not reach server.");
    } else {
      console.error("Error:", error.message);
    }
  }
}

module.exports = login;
