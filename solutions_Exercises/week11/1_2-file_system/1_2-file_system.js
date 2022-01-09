const fs = require("fs");

fs.writeFileSync("notes.txt", "My name is Sali");

fs.copyFileSync("notes.txt", "copyTXT.txt");
fs.renameSync("copyTXT.txt", "newPath.txt");
fs.readdirSync("./").forEach((file) => {
  console.log(file);
});
fs.appendFileSync("notes.txt", " I live in TLV");
