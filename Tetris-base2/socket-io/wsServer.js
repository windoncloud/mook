// var app = require('http').createServer(handler)
var app = require('http').createServer()
var io = require('socket.io')(app);
// var fs = require('fs');
var PORT = 3000
var clientCount = 0
app.listen(PORT);

// function handler (req, res) {
//     fs.readFile(__dirname + '/index.html',
//         function (err, data) {
//             if (err) {
//                 res.writeHead(500);
//                 return res.end('Error loading index.html');
//             }
//
//             res.writeHead(200);
//             res.end(data);
//         });
// }

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });

    socket.on('my other event', function (data) {
        console.log(data);
    });
    clientCount++
    conn.nickname = 'user' + clientCount
});



// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++
    conn.nickname = 'user' + clientCount
    var mes ={}
    mes.type = "enter"
    mes.data = conn.nickname + 'comes in'
    // broadcast(conn.nickname + 'comes in')
    broadcast(JSON.stringify(mes))
    conn.on("text", function (str) {
        console.log("Received "+str)
        // conn.sendText(str.toUpperCase()+"!!!")
        var mes = {}
        mes.type = "message"
        mes.data = conn.nickname + ' says: ' +str
        broadcast(JSON.stringify(mes))
        // broadcast(str)
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        var mes = {}
        mes.type = "leave"
        mes.data = conn.nickname + 'left'
        broadcast(JSON.stringify(mes))
        // broadcast(conn.nickname + 'left')
    })
    conn.on("error", function(err){
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT)

console.log("websocket server listening on port " + PORT);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}