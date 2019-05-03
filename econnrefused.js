// @ts-check

const http = require("http");
const url = "http://localhost:7777"; // Not actually running locally.

http.get(url, function(res)
{
    var bodyChunks = [];

    res.on('data', function(chunk)
    {
        // Store data chunks in an array
        bodyChunks.push(chunk);
        console.log("RES: DATA: ", chunk);
    }).on('error', function(e)
    {
        // Call callback function with the error object which comes from the response
        console.log("RES: ERROR: ", e);
    }).on('end', function()
    {
        // Call callback function with the concatenated chunks parsed as a JSON object (for example)
        console.log("RES: END: " + bodyChunks);
    });
}).on('error', function(e) {
    // Call callback function with the error object which comes from the request
    console.log("REQ: ERROR: ", e);
});