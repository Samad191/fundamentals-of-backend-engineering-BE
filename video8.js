const http = require('http')
const WebSocketServer = require('websocket').server
let connections = [];

const httpServer  = http.createServer()
const websocket = new WebSocketServer({ "httpServer": httpServer })


httpServer.listen(8080, () => {
    console.log('Server is listening on port 8080')
})


// when a legit websocket request comes listen to it and get the connection ...
websocket.on('request', request => {
    console.log('got request')
    const connection = request.accept(null, request.origin)
    connection.on('message', (message) => {
    // the remote port is used as a unique identifier
    // someone sent a message tell everyone
    connections.forEach(conn => conn.send(`Users ${connection.socket.remotePort} says ${message.utf8Data}`))
    })
    connections.push(connection)

    // some one connected tell everyone
    connections.forEach(c => c.send(`User ${connection.socket.remotePort} just connected`))

})