const { program } = require("commander");
const login = require("./commands/login");
const listEvents = require("./commands/listEvents");
const eventDetails = require("./commands/eventDetails");
const removeUser = require("./commands/removeUser");
const loginPrompt = require("./prompts/loginPrompt");
const registerUser = require("./commands/registerUser");

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
  .command("register-user")
  .description("Register a user to an event")
  .action(registerUser);

program
  .command("remove-user <eventId> <userId>")
  .description("Remove a user from an event")
  .action((eventId, userId) => {
    removeUser(eventId, userId);
  });

program.parse(process.argv);
