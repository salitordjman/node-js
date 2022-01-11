const request = require("request");
const requestApi = (url, callback) => {
  request({ url: url, json: true }, (error, response) => {
    //   if (error) {
    //     return callback("Unable to connect service!" + error, undefined);
    //   }
    //   callback(undefined, "Joke: " + response.body.joke);
    // });
    if (error) {
      return callback("Unable to connect service!" + error);
    }
    callback("Joke: " + response.body.joke);
  });
};
module.exports = requestApi;
