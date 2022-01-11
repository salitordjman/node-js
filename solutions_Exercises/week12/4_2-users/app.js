const yargs = require("yargs");
const users = require("./users.js");
const { v4: uuidv4 } = require("uuid");

// Customize yargs version
yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new user",
  builder: {
    name: {
      describe: "User Name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "User Email",
      demandOption: true,
      type: "string",
    },
    id: {
      describe: "User Id",
      type: "string",
    },
  },
  handler(argv) {
    users.addUser(argv.name, argv.email, argv.id ? argv.id : uuidv4());
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a user",
  builder: {
    id: {
      describe: "User id",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    users.removeUser(argv.id);
  },
});

yargs.command({
  command: "read",
  describe: "Read a user",
  builder: {
    id: {
      describe: "User id",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    users.readUser(argv.id);
  },
});

yargs.command({
  command: "update",
  describe: "Update a user",
  builder: {
    name: {
      describe: "User Name",
      type: "string",
    },
    email: {
      describe: "User Email",
      type: "string",
    },
    id: {
      describe: "User Id",
      demandOption: true,
      type: "string",
    },
    newId: {
      describe: "User new Id",
      type: "string",
    },
  },
  handler(argv) {
    users.updateUser(argv.name, argv.email, argv.id, argv.newId);
  },
});
yargs.parse();
