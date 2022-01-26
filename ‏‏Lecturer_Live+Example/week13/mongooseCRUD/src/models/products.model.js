const mongoose = require('mongoose');
const validator = require('validator');

// Read latter connetions mongoose!
const Product = mongoose.model('Product2', {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  details: {
    description: {
      type: String,
      required: true,
      minLength: [10, 'Must be at least 10 chars'],
      //   validate(value) {
      //     if (value.length < 10) {
      //       throw Error('Must be at last 10 characters');
      //     }
      //   },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      //   minItems: 2,
      validate(value) {
        if (value.length < 2) {
          throw Error('Must be at last 2 items');
        }
      },
    },
    phone: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, 'he-IL')) {
          throw Error('must be a israeli mobile phone');
        }
      },
    },
    date: {
      type: Date,
      //   default: new Date(),
      default: Date.now(),
    },
  },
});

module.exports = Product;
