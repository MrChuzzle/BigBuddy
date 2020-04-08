//var http = require('http');
//http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('Node.js is Up and Running. \o/ *excited*\n');
//}).listen(8080, '127.0.0.1');
var BigBuddy = require("./discord/BigBuddy").oBigBuddy;
var http = require("http");
const io = require('socket.io')(buildServer());

// init big buddy bot
var oBigBuddy = new BigBuddy(process.argv.slice(2));

//Ist jetzt nach oben gewandert ^^
//buildServer();

function buildServer() {
    return http.createServer(function (oRequest, oResponse) {
        // config server
        oResponse.setHeader("Access-Control-Allow-Origin", "*");
        oResponse.setHeader("Access-Control-Allow-Credentials", true);
        oResponse.setHeader("Access-Control-Allow-Methods", "POST");
        oResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
        oResponse.writeHead(200, {"Content-Type": "application/json"});
        oResponse.write("Message successfully received!");
        oResponse.end();

        // handling requests
        var sMessageData = "";

        oRequest.on("error", oError => {
            console.log("Error: ", oError);
        }).on("data", oData => {
            sMessageData += oData.toString();
        }).on("end", () => {
            oBigBuddy.execute(sMessageData);
        });
    }).listen(8082, () => {
      console.log('HTTP server listening on port 8082');
    });
}

// Now for the socket.io stuff - NOTE THIS IS A RESTFUL HTTP SERVER
// We are only using socket.io here to respond to the npmStop signal
// To support IPC (Inter Process Communication) AKA RPC (Remote P.C.)

io.on('connection', (socketServer) => {
  socketServer.on('npmStop', () => {
  process.exit(0);
  });
});