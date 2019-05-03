// @ts-check

const http = require("http");

require("./timeoutserver"); // Starts listening on 7000

async function sleep(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
}

async function main() {
  await sleep(1000); //wait for server to come up
  const req = http
    .get(
      {
        agent: new http.Agent({
          timeout: 1
        }),
        host: "localhost",
        path: "/",
        port: 7000
      },
      function(res) {
        var bodyChunks = [];

        res
          .on("data", function(chunk) {
            // Store data chunks in an array
            bodyChunks.push(chunk);
            console.log("RES: DATA: ", chunk);
          })
          .on("error", function(e) {
            // Call callback function with the error object which comes from the response
            console.log("RES: ERROR: ", e);
          })
          .on("end", function() {
            // Call callback function with the concatenated chunks parsed as a JSON object (for example)
            console.log("RES: END: " + bodyChunks);
          });
      }
    )
    .on("error", function(e) {
      // Call callback function with the error object which comes from the request
      console.log("REQ: ERROR: ", e); // This will be ECONNRESET
      process.exit(0);
    });
  req.once("socket", socket => {
    socket.once("timeout", e => {
      console.log("Timeout happened, cancelling request");
      req.abort();
    });
  });

  // Safety code
  setTimeout(() => {
    console.log("Timer passed. Closing process");
    process.exit(1);
  }, 10000);
}

main().catch(console.error);
