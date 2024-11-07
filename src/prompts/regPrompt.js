const inquirer = require("inquirer");

async function selectEvent(events) {
  const eventChoices = events.map((event) => ({
    name: event.title,
    value: event._id,
  }));

  const { selectedEventId } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedEventId",
      message: "Select event to register user to:\n",
      choices: eventChoices,
    },
  ]);

  return selectedEventId;
}

async function selectUser(users) {
  const userChoices = users.map((user) => ({
    name: user.name,
    value: user._id, //
  }));

  const { selectedUserId } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedUserId",
      message: "Select user to register for event:\n",
      choices: userChoices,
    },
  ]);

  return selectedUserId;
}

module.exports = { selectEvent, selectUser };
