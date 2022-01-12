const express = require("express");
const app = express();
const users = require("./users.json");

//telling express to deal with json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/users", (req, res) => {
  //automatically gives you the type header and dont need to stringify the json
  res.send(users);
});
app.post("/users", (req, res) => {
  console.log(req.body.name);
  //create a user
  //best practice is to send the object you created back
  res.status(201).send({ id: 133442, name: "pini" });
});

app.delete("/users/:id/", (req, res) => {
  console.log(req.params);
  //delete the user
  //send back the deleted user
});
app.put("/users/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  //send back the modified user
});
app.get("/users/filter", (req, res) => {
  console.log(req.query);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`listentinig to port: ${PORT}`);
});
