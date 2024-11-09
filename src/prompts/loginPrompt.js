const inquirer = require("inquirer");

/**
 * Prompts the user to enter their email and password.
 *
 */
async function loginPrompt() {
  const questions = [
    {
      type: "username",
      name: "username",
      message: "Enter your username:",
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password:",
      mask: "*",
    },
  ];

  return inquirer.prompt(questions);
}

module.exports = loginPrompt;
