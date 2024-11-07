const inquirer = require("inquirer");

function eventPrompt(events) {
  return inquirer.prompt([
    {
      type: "list",
      name: "eventId",
      message: "Select event to view details:",
      choices: events.map((event) => ({
        name: event.title,
        value: event._id,
      })),
    },
  ]);
}

module.exports = eventPrompt;
