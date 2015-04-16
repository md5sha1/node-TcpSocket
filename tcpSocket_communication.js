/* TCP socket: fundamental concept of the TCP client/server chat communication. Run this as server and then connect from another terminal as client using 'nc local host port' command */

var net = require('net');
var sockets=[]; //sockets to store SOCKET stream

var tcpServer = net.createServer();
tcpServer.on('connection', function(socket){
	console.log('A client is connected!' + new Date());
	socket.setEncoding('utf8');
//insert socket from client connection
	sockets.push(socket);
	socket.on('data', function(data){
		console.log(data);
//send msg to each client socket
		var clients = sockets.length;
	for (var i=0; i<clients; i++)	{
		if(sockets[i]===socket) continue; //skip the socket where client is sending msg to himself
		sockets[i].write(data); //sending msg to all other client sockets
	}
	});
//handle the socket connection if one of the socket client disconnects
//so that all other sockets stay alive on the server
//remove the dead socket from the array and update 
socket.on('end', function(){
	sockets.splice(sockets.indexOf(socket), 1);
	console.log('A client is disconnected ' + new Date());
});
})
tcpServer.listen(9090, function(){console.log(new Date() + " ->Server is connected on port:9090")});
console.log('Looking for connection...');
