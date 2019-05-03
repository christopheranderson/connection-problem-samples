var http=require('http')
var server=http.createServer((function(request,response)
{
    // never respond
    console.log("Server: Got request. Never gonna response");
}));
server.listen(7000);