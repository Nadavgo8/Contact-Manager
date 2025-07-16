const commandHandler = require("./commands/commandHandler");

const [, , command, ...args] = process.argv;

commandHandler.handle(command, args);
