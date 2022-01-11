const https = require("https");
const requestApi = require("./requestApi.js");
const axios = require("axios");
const fetch = require("node-fetch");

const url = "https://geek-jokes.sameerkumar.website/api?format=json";
requestApi(url, (data) => {
  console.log(data);
});
//!
// requestApi(url, (error, data) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log(data);
// });

const search = async () => {
  try {
    const { data } = await axios.get(url);
    console.log("Joke 2: " + data.joke);
  } catch (e) {
    console.log("Error number: " + e.errno);
  }
};
search();

axios
  .get(url)
  .then(({ data }) => {
    console.log("Joke 3: " + data.joke);
  })
  .catch(function (error) {
    console.log("hostname: " + error.hostname);
  });
(async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Joke 4: " + data.joke);
  } catch (e) {
    console.log("Error type " + e.type);
  }
})();

const request = https.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log("joke 5: " + body.joke);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
