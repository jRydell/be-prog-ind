const inquirer = require("inquirer");

async function menu() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Select an option:\n",
      choices: [
        { name: "Login", value: "login" },
        { name: "All public events", value: "list" },
        { name: "Event details", value: "event-details" },
        { name: "Register users", value: "register-user" },
        { name: "Remove users\n", value: "remove-user" },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);
  return choice;
}

module.exports = menu;
