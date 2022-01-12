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
  if (arr.includes(req.body.new)) {
    // if (arr.find((el) => el === req.body.new)) {
    res.status(400).send(`The number ${req.body.new} already exists`);
  } else {
    console.log(req.body.new);
    arr.push(req.body.new);
    res.send(`success using post ${arr}`);
  }
});
app.delete("/numbers/:number", (req, res) => {
  const num = Number(req.params.number);
  console.log(arr);
  if (!arr.includes(num)) {
    // if (!arr.find((el) => el === num)) {
    res.status(400).send(`The number ${num} doesn't exists`);
  } else {
    console.log(num);
    const index = arr.indexOf(num);
    arr.splice(index, 1);
    // arr = arr.filter((el) => el !== num);

    res.status(206).send(`success using delete ${arr}`);
  }
});
app.put("/numbers/:number", (req, res) => {
  const num = Number(req.params.number);
  if (!arr.includes(num)) {
    // if (!arr.find((el) => el === req.body.new)) {
    res.status(401).send(`The number ${num} doesn't exists`);
  } else {
    console.log(req.body.new);
    console.log(num);
    // arr.find(
    //   (el, i) => el ===num  && (arr[i] = req.body.new)
    // );
    const index = arr.indexOf(num);
    arr.splice(index, 1, req.body.new);
    res.status(210).send(`success using put ${arr}`);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listentinig to port: ${PORT}`);
});
