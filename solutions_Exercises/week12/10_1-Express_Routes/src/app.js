const express = require("express");
const app = express();
// const users = require("../public/users.json");
let arr = [1, 2, 3, 4, 5, 6];

//telling express to deal with json
app.use(express.json());

app.get("/numbers", (req, res) => {
  res.status(201).send(arr);
  console.log("success using get");
});
app.post("/numbers", (req, res) => {
  console.log(req.body.new);
  arr.push(req.body.new);
  res.send(`success using post ${arr}`);
});
app.delete("/numbers", (req, res) => {
  console.log(req.body.new);
  arr = arr.filter((el) => el !== req.body.new);

  res.status(206).send(`success using delete ${arr}`);
});
app.put("/numbers", (req, res) => {
  console.log(req.body.new);
  console.log(req.body.to);
  arr.find((el, i) => el === req.body.new && (arr[i] = req.body.to));
  res.status(210).send(`success using put ${arr}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listentinig to port: ${PORT}`);
});
