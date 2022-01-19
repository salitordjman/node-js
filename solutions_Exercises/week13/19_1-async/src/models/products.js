const mongoose = require("mongoose");
const validator = require("validator");

const detailsSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    minLength: 10,
  },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Price must be a postive number");
      }
    },
  },
  discount: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    // type: [String],
    required: true,
    // minItems:2,
    validate(value) {
      if (value.length < 2) {
        throw new Error("must include at least two images");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value, "he-IL")) {
        throw new Error("must be only Israeli phone number");
      }
    },
  },
  DateAdded: {
    type: Date,
    default: Date(),
  },
});

const Product = mongoose.model("Product", {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  details: detailsSchema,
});

// const Product = mongoose.model("Product", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   isActive: {
//     type: Boolean,
//   },
//   details: {
//     description: {
//       type: String,
//       required: true,
//       minLength: 10,
//     },
//     price: {
//       type: Number,
//       required: true,
//       validate(value) {
//         if (value < 0) {
//           throw new Error("Price must be a postive number");
//         }
//       },
//     },
//     discount: {
//       type: Number,
//       default: 0,
//     },
//     images: {
//       type: Array,
//       // type: [String],
//       required: true,
//       // minItems:2,
//       validate(value) {
//         if (value.length < 2) {
//           throw new Error("must include at least two images");
//         }
//       },
//     },
//     phone: {
//       type: String,
//       required: true,
//       validate(value) {
//         if (!validator.isMobilePhone(value, "he-IL")) {
//           throw new Error("must be only Israeli phone number");
//         }
//       },
//     },
//     DateAdded: {
//       type: Date,
//       default: Date(),
//     },
//   },
// });

module.exports = Product;
