var BigBuddy = require("./BigBuddy").oBigBuddy;
var http = require("http");

// init big buddy bot
var oBigBuddy = new BigBuddy(process.argv.slice(2));

buildServer();

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
    }).listen(8082);
}
