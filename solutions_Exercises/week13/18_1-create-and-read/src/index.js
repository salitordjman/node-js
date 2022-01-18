const express = require("express");
require("./db/mongoose");
const Product = require("./models/products");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/products", (req, res) => {
  const newProduct = new Product(req.body);

  newProduct
    .save()
    .then(() => {
      res.status(201).send(newProduct);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/products", (req, res) => {
  Product.find({})
    .then((prod) => {
      res.send(prod);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/products/:id", (req, res) => {
  const _id = req.params.id;

  Product.findById(_id)
    .then((prod) => {
      if (!prod) {
        return res.status(404).send();
      }

      res.send(prod);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/products/check/active", (req, res) => {
  Product.find({ isActive: true })
    .then((prod) => {
      if (!prod) {
        return res.status(404).send();
      }
      res.send(prod);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/products/check/:min/:max", (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  Product.find({ "details.price": { $gte: min, $lte: max } })
    .then((prod) => {
      if (!prod) {
        return res.status(404).send();
      }
      res.send(prod);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
