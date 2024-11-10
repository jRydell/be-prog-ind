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
      validate: (input) => {
        if (!input) {
          return "username cannot be empty.";
        }
        return true;
      },
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password:",
      mask: "*",
      validate: (input) => {
        if (!input) {
          return "password cannot be empty.";
        }
        return true;
      },
    },
  ];

  return inquirer.prompt(questions);
}

module.exports = loginPrompt;
