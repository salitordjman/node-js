const jwt = require("jsonwebtoken");
const Product = require("../models/products");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewproduct");
    const prod = await Product.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!prod) {
      throw new Error();
    }
    req.token = token;
    req.prod = prod;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
