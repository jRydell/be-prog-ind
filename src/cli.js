const { program } = require("commander");
const login = require("./commands/login");
const listEvents = require("./commands/listEvents");
const eventDetails = require("./commands/eventDetails");
const registerUser = require("./commands/registerUser");

program
  .command("login <email> <password>")
  .description("Login and get an authorization token")
  .action((email, password) => {
    login(email, password);
  });

program
  .command("list")
  .description("List all public events")
  .action(listEvents);

program
  .command("event-details <eventId>")
  .description("List details for a specific event")
  .action((eventId) => {
    eventDetails(eventId);
  });

program
  .command("register-user <eventId> <userId>")
  .description("Register a user to an event")
  .action((eventId, userId) => {
    registerUser(eventId, userId);
  });

program.parse(process.argv);
