const { program } = require("commander");

const login = require("./commands/login");
const listEvents = require("./commands/listEvents");
const eventDetails = require("./commands/eventDetails");
const registerUser = require("./commands/registerUser");
const removeUser = require("./commands/removeUser");
const loginPrompt = require("./prompts/loginPrompt");

program
  .command("login")
  .description("User login")
  .action(async () => {
    const { email, password } = await loginPrompt();
    await login(email, password);
  });

program
  .command("list")
  .description("List all public events")
  .action(listEvents);

program
  .command("event-details")
  .description("List details for a specific event")
  .action(async () => {
    await eventDetails();
  });

program
  .command("register-user <eventId> <userId>")
  .description("Register a user to an event")
  .action((eventId, userId) => {
    registerUser(eventId, userId);
  });

program
  .command("remove-user <eventId> <userId>")
  .description("Remove a user from an event")
  .action((eventId, userId) => {
    removeUser(eventId, userId);
  });

program.parse(process.argv);
