const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mongodb-ProductModel", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//! postman
// {
//   "name": "gdfhhg  dfgh",
//   "category": "fghdf",
//   "isActive": true,
//   "details":
//   {
//     "description": "tgfhfh ftgthfryt tyyety  retyer",
//     "price": 5645646,
//     "discount": 34563,
//     "images": ["fgdfg", "gdfgd", "dfgdf"],
//     "phone": "0529874658"
//   }
// }

// {
//   "name": "fvsdfvd sdf",
//   "category": "dff df ",
//   "isActive": true,
//   "details":
//   {
//     "description": " bdgfb dg g fgf fv dgfd dgh gngng dgf",
//     "price": 55555555,
//     "discount": 5554323,
//     "images": ["tggb", "fggf", "dfgff"],
//     "phone": "0524713698"
//   }
// }

//! js
// const newProduct1 = new Product({
//   name: "gdfhhg  dfgh",
//   category: "fghdf",
//   isActive: true,
//   details: {
//     description: "tgfhfh ftgthfryt tyyety  retyer",
//     price: 5645646,
//     discount: 34563,
//     images: ["fgdfg", "gdfgd", "dfgdf"],
//     phone: "0529874658",
//   },
// });
// newProduct1
//   .save()
//   .then(() => {
//     console.log(newProduct1);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

// const newProduct2 = new Product({
//   name: "fgdfg",
//   category: "fg dfhdf",
//   isActive: false,
//   details: {
//     description: "tg fg ghh dfhhdth dsr ",
//     price: 56,
//     discount: 21,
//     images: [2, 45, 546],
//     phone: "0598745658",
//   },
// });

// newProduct2
//   .save()
//   .then(() => {
//     console.log(newProduct2);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

// const newProduct3 = new Product({
//   name: "fgvsf",
//   category: "ff fdf",
//   isActive: false,
//   details: {
//     description: "fddfv dfdghn fgghsdrfyhfm xfgz xgmgh",
//     price: 454,
//     discount: 233,
//     images: ["cgfbf", "dcgnj", "gjuhk", "dgg"],
//     phone: "0501459876",
//   },
// });

// newProduct3
//   .save()
//   .then(() => {
//     console.log(newProduct3);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });
