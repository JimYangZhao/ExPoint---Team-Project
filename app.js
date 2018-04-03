var mongojs = require("mongojs");
var db = mongojs("localhost:27017/ExPoint", ['account','progress']);

db.account.insert({username:"b",password:"bb"});
var express = require('express');
var app = express();
var serv = require('http').Server(app);


app.get('/',function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
    
serv.listen(2000);
console.log("Server Start.");

var SOCKET_LIST = {};
var Player = {};




Player.list = {};
Player.onConnect = function(socket){
}


var DEBUG = true;

var USERS = {
	//username:password
	"bob":"asd",
	"bob2":"bob",
	"bob3":"ttt",	
}


var addUser = function(data,cb){
    db.account.insert({username:data.username,password:data.password},function(err){
        cb();
    });
}
 

var isValidPassword = function(data,cb){
    setTimeout(function(){
        cb(USERS[data.username] === data.password);
    },10);
}
var isUsernameTaken = function(data,cb){
    setTimeout(function(){
        cb(USERS[data.username]);
    },10);
}
var addUser = function(data,cb){
    setTimeout(function(){
        USERS[data.username] = data.password;
        cb();
    },10);
}




var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
   
    socket.on('signIn',function(data){
        isValidPassword(data,function(res){
            if(res){
                Player.onConnect(socket);
                socket.emit('signInResponse',{success:true});
            } else {
                socket.emit('signInResponse',{success:false});         
            }
        });
    });
    socket.on('signUp',function(data){
        isUsernameTaken(data,function(res){
            if(res){
                socket.emit('signUpResponse',{success:false});     
            } else {
                addUser(data,function(){
                    socket.emit('signUpResponse',{success:true});                  
                });
            }
        });    
    });
   
   
    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        });
    socket.on('sendMsgToServer',function(data){
        var playerName = ("" + socket.id).slice(2,7);
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat',playerName + ': ' + data);
        }
    });
   
    socket.on('evalServer',function(data){
        if(!DEBUG)
            return;
        var res = eval(data);
        socket.emit('evalAnswer',res);     
    });
   
   
   
});