
var mongojs = require("mongojs");
var db = mongojs("localhost:27017/ExPoint", ['account','levels']);

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

console.log("Listening...");


Player.list = {};
Player.onConnect = function(socket){
    delete Player.list[socket.id];
}
Player.update = function(){
    var pack = [];
    for(var i in Player.list){
        var player = Player.list[i];
        player.update();
        pack.push({
            x:player.x,
            y:player.y,
            number:player.number
        });    
    }
    return pack;
}


var DEBUG = true;

var isValidPassword = function(data,cb){
    db.account.find({username:data.username,password:data.password},function(err,res){
        if(res.length > 0)
            cb(true);
        else
            cb(false);
    });
}
var isUsernameTaken = function(data,cb){
    db.account.find({username:data.username},function(err,res){
        if(res.length > 0)
            cb(true);
        else
            cb(false);
    });
}
var addUser = function(data,cb){
    db.account.insert({username:data.username,password:data.password},function(err){
        cb();
    });
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

    socket.on('saveLevel',function(data){
        console.log("Search Database For (Saving Level):");
        console.log(data.id);
        db.levels.find({name:data.id}, function(err, doc){
            console.log("Saved Level:");
            console.log(doc);
            console.log(doc.length);
            if(doc.length > 0)
                db.levels.update({name:data.id,},{level:data,name:data.id,userName:data.user});
            else
                db.levels.insert({name:data.id,level:data,userName:data.user});
        });
    });

    socket.on('loadLevel',function(data){
        db.levels.find({name:data}, function(err, doc){
            console.log("Loaded Level:");
            console.log(doc);
            if(doc.length > 0)
                socket.emit('loadLevelResponse',doc);
            else
                console.log("Level not found.");
        });
    });

    socket.on('getLevelNames',function(data){
        var currentUser = data;
        db.levels.find({userName:currentUser},{_id:0, name:1}, function(err, doc){
            socket.emit('getLevelNamesResponse',doc);
        });
    });
});

Database = {};
Database.isValidPassword = function(data,cb){
    if(!USE_DB)
        return cb(true);
	db.account.findOne({username:data.username,password:data.password},function(err,res){
		if(res)
			cb(true);
		else
			cb(false);
	});
}
Database.isUsernameTaken = function(data,cb){
    if(!USE_DB)
        return cb(false);
	db.account.findOne({username:data.username},function(err,res){
		if(res)
			cb(true);
		else
			cb(false);
	});
}
Database.addUser = function(data,cb){
    if(!USE_DB)
        return cb();
	db.account.insert({username:data.username,password:data.password,progress:data.progress},function(err){
        Database.savePlayerProgress({username:data.username,items:[]},function(){
            cb();
        })
	});
}
Database.getPlayerProgress = function(username,cb){
    if(!USE_DB)
        return cb({items:[]});
	db.progress.findOne({username:username},function(err,res){
		cb({items:res.items});
	});
}
Database.savePlayerProgress = function(data,cb){
    cb = cb || function(){}
    if(!USE_DB)
        return cb();
    db.progress.update({username:data.username},data,{upsert:true},cb);
};