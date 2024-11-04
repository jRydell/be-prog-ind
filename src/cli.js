require("dotenv").config();
const { program } = require("commander");
const listEvents = require("./commands/listEvents");

program
  .command("list")
  .description("List all public events")
  .action(listEvents);

program.parse(process.argv);
