const express = require("express");
const Product = require("../models/products");
const router = new express.Router();

router.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/products", async (req, res) => {
  try {
    const prod = await Product.find({});
    res.send(prod);
  } catch (e) {
    res.status(500).send();
  }
});

//!בגלל שזה לפני האי.די אז ניתן לרשום גם ככה
// router.get("/products/active", async (req, res) => {
router.get("/products/check/active", async (req, res) => {
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

router.get("/products/:id", async (req, res) => {
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
router.get("/products/check/:min/:max", async (req, res) => {
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
router.patch("/products/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["isActive", "details.discount"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!prod) {
      return res.status(404).send();
    }

    res.send(prod);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);

    if (!prod) {
      return res.status(404).send();
    }

    res.send(prod);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/products/", async (req, res) => {
  try {
    const prod = await Product.deleteMany({});

    if (!prod) {
      return res.status(404).send();
    }

    res.send(prod);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
