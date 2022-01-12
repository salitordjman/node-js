//if i put   "type": "module", inside package.json
// import http from "http";
// import url from "url";
// import fs from "fs";
// import users from "./users.json";

//URL is the ip address of localhost
//console.log(https);
//look at the following:
//CreateServer,listen, IncomingMessage METHODS, STATUS_CODES
const URL = "127.0.0.1";
const port = process.env.PORT || 3000;
const http = require("http");const 
const url = require("url");
const fs = require("fs");
const users = require("./users.json");

// The res object in Express is a subclass of Node.js's http.ServerResponse

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.end(`{"error":"${http.STATUS_CODES[405]}"}`);
  } else {
    if (req.url === "/users") {
      res.writeHead(200, {
        // Content type is also a meta tag in the header of an HTML document that can show browsers what content is being used on that specific web page.
        "Content-type": "application/json",
      });
      return res.end(JSON.stringify(users));
    }
    if (req.url === "/raw-html") {
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.write("<h1>Welcome to my page</h1>");

      return res.end();
    }
  }

  //not a must here but this module has some nice properties
  //true is to parse the query string as well

  let parsedURL = url.parse(req.url, true);
  //
  //if I had queries i can get the whole object by parsedURL.query

  /*
    /+ = anything the begins with one or more /
    | = or
    /+$ = ends with one or more /
    g = globally meaning keep searching until you find them all

     */
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  if (path === "") {
    path = "index.html";
  }
  console.log(__dirname + "public");

  let file = __dirname + "/public/" + path;
  //we want to asycrounously read files
  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      switch (path) {
        case "index.html":
          res.writeHead(200, { "Content-type": "text/html" });
          break;
        case "index.css":
          res.writeHead(200, { "Content-type": "text/css" });
          break;
        case "index.js":
          res.writeHead(200, { "Content-type": "text/javascript" });
          break;
      }
    }
    return res.end(content);
  });
});

server.listen(port, URL, () => {
  console.log(`listening to port ${port}`);
});
// // https://medium.com/bb-tutorials-and-thoughts/how-to-write-simple-nodejs-rest-api-with-core-http-module-dcedd2c1256
// // https://www.youtube.com/watch?v=gvbVjJnv-b8
