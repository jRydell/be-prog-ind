const login = require("./functions/login");
const listEvents = require("./functions/listEvents");
const eventDetails = require("./functions/eventDetails");
const removeUser = require("./functions/removeUser");
const loginPrompt = require("./prompts/loginPrompt");
const registerUser = require("./functions/registerUser");
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
