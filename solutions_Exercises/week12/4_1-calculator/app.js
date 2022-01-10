const yargs = require("yargs");
yargs.command({
  command: "add",
  describe: "Add 2 Numbers",
  builder: {
    num1: {
      describe: "num 1",
      demandOption: true,
      type: "integer",
      // type: "number",
    },
    num2: {
      describe: "num 2",
      demandOption: true,
      type: "integer",
      // type: "number",
    },
  },
  handler: function (argv) {
    console.log(argv.num1 + argv.num2);
  },
});
yargs.command({
  command: "sub",
  describe: "Sub 2 Numbers",
  builder: {
    num1: {
      describe: "num 1",
      demandOption: true,
      type: "integer",
    },
    num2: {
      describe: "num 2",
      demandOption: true,
      type: "integer",
    },
  },
  handler: function (argv) {
    console.log(argv.num1 - argv.num2);
  },
});
yargs.command({
  command: "mult",
  describe: "Mult 2 Numbers",
  builder: {
    num1: {
      describe: "num 1",
      demandOption: true,
      type: "integer",
    },
    num2: {
      describe: "num 2",
      demandOption: true,
      type: "integer",
    },
  },
  handler: function (argv) {
    console.log(argv.num1 * argv.num2);
  },
});
yargs.command({
  command: "pow",
  describe: "Pow 2 Numbers",
  builder: {
    num: {
      describe: "num 1",
      demandOption: true,
      type: "integer",
    },
    numpow: {
      describe: "num 2",
      demandOption: true,
      type: "integer",
    },
  },
  handler: function (argv) {
    console.log(Math.pow(argv.num, argv.numpow));
  },
});
yargs.parse();
