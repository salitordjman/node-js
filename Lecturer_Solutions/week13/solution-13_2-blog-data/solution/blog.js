/*
users,posts,comments
users has own collection
posts has own collection and comments are embedded
we have a owner reference from user for posts and comments

1. Write down the schema
2. create and connect to the mongo server
3. Create a users collection with at least two users
 - avoid created dublicate users based on their email
4. Create a post collection from a user which has embdded comments empty array
5. Create a comment from a different user to the other users post.
*/

const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/blog?poolSize=20&w=majority";
MongoClient.connect(
  uri,
  { useUnifiedTopology: true },
  async (error, client) => {
    if (error) {
      return console.log("can't connect");
    }
    console.log("connected correctly");

    const db = client.db("blog");
    try {
      //email needs to be unique
      db.collection("users").createIndex({ email: 1 }, { unique: true });
      await db.collection("users").insertMany([
        { name: "Pini", email: "pini@gmail.com" },
        { name: "Mike", email: "mike@gmail.com" },
      ]);

      //a user creates a post
      const post = {
        title: "My first post",
        text: "I'm so excited to post here",
        tags: ["first", "excited"],
      };

      //get the id of that user to get reference we will usually get this from the client side because they are logged in
      const userPost = await db
        .collection("users")
        .findOne({ email: "pini@gmail.com" });

      //store it in our posts collection
      await db.collection("posts").insertOne({
        myId: 1,
        title: post.title,
        text: post.text,
        tags: post.tags,
        comments: [],
        owner: userPost._id,
      });

      //somebody made a comment
      const comment = { text: "Fantastic post!" };

      //find user for comment, again we will get their object because they are logged in
      const userComment = await db
        .collection("users")
        .findOne({ email: "mike@gmail.com" });

      //should get object id but for now get our own id so when we kill our collection we don't need to fetch id again

      await db.collection("posts").updateOne(
        { myId: 1 },
        {
          $push: { comments: { text: comment.text, owner: userComment._id } },
        }
      );
    } catch (e) {
      console.log(e);
    }

    // client.close();
  }
);
