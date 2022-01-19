const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/mongodb-ProductModel", {
  useNewUrlParser: true,
  useCreateIndex: true,
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
  details: {
    description: {
      type: String,
      required: true,
      minLength: 10,
      // minLength: [10, 'Must be at least 10 chars' ],
      // validate(value) {
      //   if (value.length < 10) {
      //     throw new Error("must include at least 10 chars");
      //   }
      // },
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
      // type: [string],
      // minItems:2,
      required: true,
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
  },
});

const newProduct1 = new Product({
  name: "gdfhhg  dfgh",
  category: "fghdf",
  isActive: true,
  details: {
    description: "tgfhfh ftgthfryt tyyety  retyer",
    price: 5645646,
    discount: 34563,
    images: ["fgdfg", "gdfgd", "dfgdf"],
    phone: "0529874658",
  },
});
newProduct1
  .save()
  .then(() => {
    console.log(newProduct1);
  })
  .catch((error) => {
    console.log("Error!", error);
  });

const newProduct2 = new Product({
  name: "fgdfg",
  category: "fg dfhdf",
  isActive: false,
  details: {
    description: "tg fg ghh dfhhdth dsr ",
    price: 56,
    discount: 21,
    images: [2, 45, 546],
    phone: "0598745658",
  },
});

newProduct2
  .save()
  .then(() => {
    console.log(newProduct2);
  })
  .catch((error) => {
    console.log("Error!", error);
  });

const newProduct3 = new Product({
  name: "fgvsf",
  category: "ff fdf",
  isActive: false,
  details: {
    description: "fddfv dfdghn fgghsdrfyhfm xfgz xgmgh",
    price: 454,
    discount: 233,
    images: ["cgfbf", "dcgnj", "gjuhk", "dgg"],
    phone: "0501459876",
  },
});

newProduct3
  .save()
  .then(() => {
    console.log(newProduct3);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
