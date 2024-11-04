require("dotenv").config();
const { program } = require("commander");
const login = require("./commands/login");
const listEvents = require("./commands/listEvents");

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

program.parse(process.argv);
