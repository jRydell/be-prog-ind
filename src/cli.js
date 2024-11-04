require("dotenv").config();
const { program } = require("commander");
const { listEvents, viewEvent, registerUser } = require("./commands");

program
  .command("list")
  .description("List all public events")
  .action(listEvents);

program
  .command("view <id>")
  .description("View details for a specific event")
  .action(viewEvent);

program
  .command("register <eventId> <userId>")
  .description("Register a user for an event")
  .action(registerUser);

program.parse(process.argv);
