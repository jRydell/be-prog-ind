const inquirer = require("inquirer");

async function menu() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Select an option:",
      choices: [
        { name: "User login", value: "login" },
        { name: "List all public events", value: "list" },
        { name: "List details for a specific event", value: "event-details" },
        { name: "Register a user to an event", value: "register-user" },
        { name: "Remove a user from an event", value: "remove-user" },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);
  return choice;
}

module.exports = menu;
