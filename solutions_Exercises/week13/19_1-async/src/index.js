const express = require("express");
require("./db/mongoose");
const Product = require("./models/products");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/products", async (req, res) => {
  try {
    const prod = await Product.find({});
    res.send(prod);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/products/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const prod = await Product.findById(_id);
    console.log(prod);
    if (!prod) {
      return res.status(404).send();
    }

    res.send(prod);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/products/check/active", async (req, res) => {
  try {
    const prod = await Product.find({ isActive: true });
    if (!prod) {
      return res.status(404).send();
    }
    res.send(prod);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/products/check/:min/:max", async (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  try {
    const prod = await Product.find({
      "details.price": { $gte: min, $lte: max },
    });
    if (!prod) {
      return res.status(404).send();
    }
    res.send(prod);
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
