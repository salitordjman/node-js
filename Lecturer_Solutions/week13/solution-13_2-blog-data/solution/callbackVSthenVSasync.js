const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/example?poolSize=20&w=majority";
MongoClient.connect(
  uri,
  { useUnifiedTopology: true },
  async (error, client) => {
    if (error) {
      console.log(error);
    }
    console.log("connection was a success!");
    const db = client.db("testing");
    //* callbacks
    db.collection("testcollection").insertOne(
      { name: "callback" },
      (error, result) => {
        if (error) {
          console.log(e);
        }
        console.log(result);
      }
    );
    //* .then
    db.collection("testcollection")
      .insertOne({ name: ".then" })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    //* async await
    try {
      const result = await db
        .collection("testCollection")
        .insertOne({ name: "async" });
      await db.collection("testCollection").insertOne({ name: "" });
      console.log(result);
    } catch (e) {
      console.log(e);
    }

    client.close();
  }
);
