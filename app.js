global.approot = __dirname; 
var path = require('path'); 
global.parentRoot = path.join(__dirname, '../');

var express = require("express"),
	http = require('http'),
    bodyParser = require("body-parser"),
    app = express();

app.set('port', 4000);
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(express.static(__dirname + '/public'));

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var activeUser = {}

io.on('connection', function(socket){
    socket.on('loginEvnt', function(data){
		if(activeUser[data]){
			socket.emit('usrExist', true);
		}else{
			activeUser[data] = new Date()
			socket.emit('usrExist', false);
		}
	});    

	socket.on('logout', function(data){
		delete activeUser[data];
	})

	socket.on('exitUsr', function(data){
		delete activeUser[data];
	})
	setInterval(function(){
		var acUsrBr = {}
		var usrArr = Object.keys(activeUser)
		usrArr.forEach(function(key, inx){
			acUsrBr[key] = (new Date() - activeUser[key])/1000
			if(inx == usrArr.length-1){
				io.sockets.emit('broadcast',{ description: acUsrBr})
			}
		})

	}, 2000);
});

server.listen(4000, function () {
    console.log('Listening on port 4000'); 
})

