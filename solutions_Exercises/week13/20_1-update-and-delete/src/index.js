const express = require("express");
require("./db/mongoose");
const productsRuoter = require("./routers/productsRuoter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(productsRuoter);
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
