const axios = require("axios");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../api/apiConfig");

const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

async function login(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    const token = response.data.token;
    console.log("Login successful!");

    const authData = {
      token: token,
    };

    fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2), {
      encoding: "utf8",
    });

    return token;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
}

module.exports = login;
