try{
const WebSocket = require('ws');
const http = require('http');
}catch(e){
console.log("[ERROR] ERROR WHEN LOADING REQUIRE PACKAGES: %s.",e.message);
process.exit(1);
}
var now = new Date();
var port = 19130;//now.getSeconds()*now.getMilliseconds();
const wss = new WebSocket.Server({ port: port });
const key="";

function getPage(url) {
    var pm = new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            var html = '';
            res.on('data', function (d) {
                html += d.toString()
            });
            res.on('end', function () {
                resolve(html);
            });
        });
    });
    return pm;
};
console.log("Made by CAIMEO");
console.log("Please Connect to 127.0.0.1:%s.",port);
wss.on('connection', function connection(ws) {
    function output(msg) {
    ws.send(JSON.stringify({
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine": "me "+msg,
            "version": 1
        },
        "header": {
            "requestId": "add538f2-94c1-422b-8334-41fa5e8778c9",
            "messagePurpose": "commandRequest",
            "version": 1,
            "messageType": "commandRequest"
        }
    }));
};
   output("§aMade by CAIMEO");
    ws.on("message", function incoming(message) {
        console.log("received: %s",message);
        //console.warn("null");
        var aitext = JSON.parse(message).body.eventName;
        if(aitext=="PlayerMessage" && JSON.parse(message).body.properties.MessageType=="chat"){
            var player_text = JSON.parse(message).body.properties.Message;
           getPage("http://www.tuling123.com/openapi/api?key="+key+"&info="+player_text).then(function (d) {
                    output(d);
                });
}
    
});
