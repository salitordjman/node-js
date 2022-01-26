const express = require("express");
const Product = require("../models/products");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    const token = await newProduct.generateAuthToken();
    res.status(201).send({ newProduct, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/products/login", async (req, res) => {
  try {
    const prod = await Product.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await prod.generateAuthToken();
    res.send({ prod, token });
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/products/logout", auth, async (req, res) => {
  try {
    req.prod.tokens = req.prod.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.prod.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/products/logoutall", auth, async (req, res) => {
  try {
    req.prod.tokens = [];
    await req.prod.save();

    res.send();
  } catch (e) {
    res.status(500).send();
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

router.get("/products/me", auth, async (req, res) => {
  res.send(req.prod);
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

router.patch("/products/me", auth, async (req, res) => {
  console.log(req.prod);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "isActive", "discount", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => {
      update === "name" || update === "isActive"
        ? (req.prod[update] = req.body[update])
        : (req.prod.details[update] = req.body[update]);
    });
    await req.prod.save();

    res.send(req.prod);
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.patch("/products/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "isActive", "discount", "email", "password"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   try {
//     const prod = await Product.findById(req.params.id);
//     updates.forEach((update) => {
//       update === "name" || update === "isActive"
//         ? (prod[update] = req.body[update])
//         : (prod.details[update] = req.body[update]);
//     });
//     await prod.save();
//     if (!prod) {
//       return res.status(404).send();
//     }

//     res.send(prod);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.delete("/products/me", auth, async (req, res) => {
  try {
    await req.prod.remove();

    res.send(req.prod);
  } catch (e) {
    res.status(500).send();
  }
});

// router.delete("/products/:id", async (req, res) => {
//   try {
//     const prod = await Product.findByIdAndDelete(req.params.id);

//     if (!prod) {
//       return res.status(404).send();
//     }

//     res.send(prod);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

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
