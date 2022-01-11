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
    console.log("Joke: " + data.joke);
  } catch (e) {
    console.log("Error number: " + e.errno);
  }
};
search();

axios
  .get(url)
  .then(({ data }) => {
    console.log("Joke: " + data.joke);
  })
  .catch(function (error) {
    console.log("hostname: " + error.hostname);
  });
const search1 = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Joke: " + data.joke);
  } catch (e) {
    console.log("Error type " + e.type);
  }
};
search1();
