const fs = require("fs");
// const fs = require("fs").promises

//*syncrounous
try {
  fs.writeFileSync("readme.txt", "this is the readme");
  fs.copyFileSync("readme.txt", "syncCopy.txt");
  fs.renameSync("readme.txt", "changed.txt");
} catch (e) {
  console.log("error", e.message);
}
const files = fs.readdirSync(__dirname);
files.forEach((file) => {
  console.log(file);
});

//*asynchrnous
fs.writeFile("readme.txt", "this is the readme", (error, data) => {
  if (error) {
    return console.log(error);
  }
  fs.copyFile("readme.txt", "copyreadme.txt", (err, data) => {
    if (err) {
      return console.log(err);
    }
    fs.rename("readme.txt", "changed.txt", (err, data) => {
      if (err) {
        console.log(err);
      }
    });
  });
});
fs.readdir(__dirname, (error, files) => {
  files.forEach((file) => console.log(file));
});

//* async await
const writeFile = async () => {
  //you need comment out (fs).promises above to make it work
  await fs.writeFile("readme.txt", "this is the readme");
  await fs.copyFile("readme.txt", "new.txt");
};
writeFile();
