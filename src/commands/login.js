const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Define the path to the auth.json file
const authFilePath = path.join(__dirname, "..", "auth", "auth.json");

async function login(email, password) {
  try {
    const response = await axios.post(`${process.env.API_URL}/users/login`, {
      email,
      password,
    });
    const token = response.data.token;
    console.log("Login successful! Your token:", token);

    // Save the token to auth.json
    const authData = {
      token: token,
    };

    fs.writeFileSync(authFilePath, JSON.stringify(authData, null, 2), {
      encoding: "utf8",
    });
    console.log("Token saved to auth.json.");

    return token;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
}

module.exports = login;
