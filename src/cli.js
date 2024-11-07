const login = require("./commands/login");
const listEvents = require("./commands/listEvents");
const eventDetails = require("./commands/eventDetails");
const removeUser = require("./commands/removeUser");
const loginPrompt = require("./prompts/loginPrompt");
const registerUser = require("./commands/registerUser");
const menu = require("./prompts/menuPrompt");

/**
 * Main function that runs the CLI application.
 */
async function main() {
  let choice = "";

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
        console.log("Thank you for playing...\n");
        break;
      default:
        console.log("\n");
        console.log("Invalid choice\n");
    }
  }
}

main();
