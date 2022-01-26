const express = require("express");
require("./db/mongoose");
const productsRuoter = require("./routers/productsRuoter");
const taskRouter = require("./routers/taskRuoter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(productsRuoter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// // const Task = require("./models/task");
// const Product = require("./models/products");

// const main = async () => {
//   // const task = await Task.findById("61f150ef84dd8b82488285f6");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const prod = await Product.findById("61f1388772cb909a942e21c6");
//   await prod.populate("tasks").execPopulate();
//   console.log(prod.tasks);
// };

// main();
