const express = require("express");
const app = express();

const data = [1, 2, 3, 4, 5, 6];

app.use(express.json());

app.get("/numbers", (req, res) => {
  res.send(data);
});

app.post("/numbers", (req, res) => {
  console.log(req.body);
  const { number } = req.body;

  if (data.includes(number)) {
    return res.status(400).send({ error: 400, message: "this is my message" });
  }
  data.push(number);
  res.send(data);
});

app.delete("/numbers/:number", (req, res) => {
  const number = Number(req.params.number);
  if (!data.includes(number)) {
    return res.status(400).send({ error: "number doesnt exists" });
  }
  const index = data.indexOf(number);
  data.splice(index, 1);
  res.send(data);
});

app.put("/numbers/:number", (req, res) => {
  const number = Number(req.params.number);
  const newNumber = Number(req.body.number);
  if (!data.includes(number)) {
    return res.status(400).send({ error: "number doesnt exists" });
  }
  const index = data.indexOf(number);
  data.splice(index, 1, newNumber);
  res.send(data);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listentinig to port");
});
