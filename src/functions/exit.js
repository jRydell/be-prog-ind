const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const authFolderPath = path.join(__dirname, "..", "auth");

/**
 * Removes the auth folder and token when user exits the program
 *
 */

function exit() {
  if (fs.existsSync(authFolderPath)) {
    fs.rmSync(authFolderPath, { recursive: true, force: true });
    console.log("\n");
    console.log(chalk.green("Logging off..\n"));
  }
}

module.exports = exit;
