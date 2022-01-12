const http = require("http");
const users = require("./users.json");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 400;
    // res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
  }
  if (req.url === "/users") {
    if (req.method === "GET") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(users));
    }
    if (req.method === "POST") {
      res.end("i created a new user");
    }
  }
});
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is runnnig in port: ${PORT}`);
});
