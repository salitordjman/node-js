const express = require('express');
const Products = require('../models/products.model');
const router = express.Router();

router
  //   .get('/products', async (req, res) => {
  //     console.log('req.');
  //     const { minPrice, maxPrice } = req.query;
  //     try {
  //       const products = await Products.find({
  //         'details.price': { $gte: minPrice, $lte: maxPrice },
  //       });
  //     } catch (err) {
  //       res.status(500).send(err.message);
  //     }
  //   })
  .get('/products', async (req, res) => {
    console.log('req.');
    try {
      const products = await Products.find({});
      res.send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .get('/products/active', async (req, res) => {
    try {
      const products = await Products.find({ isActive: true });
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .get('/products/:id', async (req, res) => {
    const _id = req.params.id;
    try {
      const product = await Products.findById(_id);
      if (!product) {
        return res.status(404).send({ error: 'No product' });
      }
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;
