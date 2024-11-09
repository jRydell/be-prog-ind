const inquirer = require("inquirer");

/**
 * Prompts the user to select an event from a list of events.
 */
function eventPrompt(events) {
  return inquirer.prompt([
    {
      type: "list",
      name: "eventId",
      message: "Select event to view details:\n",
      choices: events.map((event) => ({
        name: event.title,
        value: event._id,
      })),
    },
  ]);
}

module.exports = eventPrompt;
