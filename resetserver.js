var http=require('http')
var server=http.createServer((function(request,response)
{
    // never respond
    console.log("Server: Got request. Gonna hang up now.");
    request.destroy();
}));
server.listen(7001);