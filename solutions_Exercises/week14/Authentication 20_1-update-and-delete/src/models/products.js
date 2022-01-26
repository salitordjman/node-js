const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const detailsSchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   lowercase: true,
  //   validate(value) {
  //     if (!validator.isEmail(value)) {
  //       throw new Error("Email is invalid");
  //     }
  //   },
  // },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  //   password: {
  //     type: String,
  //     required: true,
  //     minlength: 7,
  //     trim: true,
  //     validate(value) {
  //         if (value.toLowerCase().includes('password')) {
  //             throw new Error('Password cannot contain "password"')
  //         }
  //     }
  // },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
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

const ProductSchema = new mongoose.Schema({
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  details: detailsSchema,
});

ProductSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

ProductSchema.methods.toJSON = function () {
  const prod = this;
  const prodObject = prod.toObject();

  delete prodObject.details.password;
  delete prodObject.tokens;

  return prodObject;
};

ProductSchema.methods.generateAuthToken = async function () {
  const prod = this;
  const token = jwt.sign({ _id: prod._id.toString() }, "thisismynewproduct");

  prod.tokens = prod.tokens.concat({ token });
  await prod.save();

  return token;
};

ProductSchema.statics.findByCredentials = async (email, password) => {
  const prod = await Product.findOne({ "details.email": email });
  if (!prod) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, prod.details.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return prod;
};

// Hash the plain text password before saving

ProductSchema.pre("save", async function (next) {
  const product = this;
  if (product.details.isModified("password")) {
    product.details.password = await bcrypt.hash(product.details.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
ProductSchema.pre("remove", async function (next) {
  const prod = this;
  await Task.deleteMany({ owner: prod._id });
  next();
});

const Product = mongoose.model("Product", ProductSchema);

//!
// const validateEmail = function (email) {
//   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

// const detailsSchema = mongoose.Schema({
//   email: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     unique: true,
//     required: "Email address is required",
//     validate: [validateEmail, "Please fill a valid email address"],
//     match: [
//       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//       "Please fill a valid email address",
//     ],
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: 6,
//   },
//   description: {
//     type: String,
//     required: true,
//     minLength: 10,
//   },
//   price: {
//     type: Number,
//     required: true,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Price must be a postive number");
//       }
//     },
//   },
//   discount: {
//     type: Number,
//     default: 0,
//   },
//   images: {
//     type: Array,
//     // type: [String],
//     required: true,
//     // minItems:2,
//     validate(value) {
//       if (value.length < 2) {
//         throw new Error("must include at least two images");
//       }
//     },
//   },
//   phone: {
//     type: String,
//     required: true,
//     validate(value) {
//       if (!validator.isMobilePhone(value, "he-IL")) {
//         throw new Error("must be only Israeli phone number");
//       }
//     },
//   },
//   DateAdded: {
//     type: Date,
//     default: Date(),
//   },
// });

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
//   details: detailsSchema,
// });

//!

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
