const inquirer = require("inquirer");

async function loginPrompt() {
  const questions = [
    {
      type: "email",
      name: "email",
      message: "Enter your e-mail:",
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
