const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "BlogData";
const id1 = new ObjectID();
const id2 = new ObjectID();
const idPost1 = new ObjectID();
const idPost2 = new ObjectID();
const idPost3 = new ObjectID();
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }
    const db = client.db(databaseName);
    // db.collection("Users").createIndex({ Email: 1 }, { unique: true });
    // db.collection("Users").insertMany(
    //   [
    //     {
    //       _id: id1,
    //       Name: "aaa",
    //       Email: "a@b.com",
    //     },
    //     {
    //       _id: id2,
    //       Name: "bbb",
    //       Email: "b@b.com",
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    db.collection("posts").insertMany(
      [
        {
          Title: "frgd",
          Text: "dfgd dfgdf dfdrtty  fj f",
          Tags: ["fff", "rthh", "thth"],
          Owner: id1,
          Comments: [{ idPost3 }],
        },
        {
          Title: "nfn",
          Text: "gf fhjgf y sdr ukuyh ",
          Tags: ["fgth", "uku", "thth"],
          Owner: id2,
          Comments: [{ idPost1 }, { idPost2 }],
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks!");
        }

        console.log(result.ops);
      }
    );
    db.collection("Comments").insertMany(
      [
        {
          _id: idPost1,
          Text: "blaaa blaaa",
          Owner: id1,
        },
        {
          _id: idPost2,
          Text: "dfddfbdfb ethyth",
          Owner: id2,
        },
        {
          _id: idPost3,
          Text: "dtht dthdth myhyhy",
          Owner: id2,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks!");
        }

        console.log(result.ops);
      }
    );
  }
);
