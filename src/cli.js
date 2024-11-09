const login = require("./functions/login");
const listEvents = require("./functions/listEvents");
const eventDetails = require("./functions/eventDetails");
const removeUser = require("./functions/removeUser");
const loginPrompt = require("./prompts/loginPrompt");
const registerUser = require("./functions/registerUser");
const menu = require("./prompts/menuPrompt");
const chalk = require("chalk");

/**
 * Main function that runs the CLI application.
 */
async function main() {
  let choice = "";
  console.log(chalk.green("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ \n"));
  console.log(chalk.green("            Welcome\n"));
  console.log(chalk.green("Please login to use application\n"));
  console.log(chalk.green("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _  \n"));
  while (choice !== "exit") {
    choice = await menu();

    switch (choice) {
      case "login":
        const { email, password } = await loginPrompt();
        await login(email, password);
        break;
      case "list":
        await listEvents();
        break;
      case "event-details":
        await eventDetails();
        break;
      case "register-user":
        await registerUser();
        break;
      case "remove-user":
        await removeUser();
        break;
      case "exit":
        console.log("\n");
        console.log(chalk.green("Thank you for playing...\n"));

        break;
      default:
        console.log(chalk.green("\n"));
        console.log(chalk.red("Invalid choice\n"));
    }
  }
}

main();
