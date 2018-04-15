//Handles all interfacing with the server/db

//Sends message to DB. Technically sent to server, which then interacts w/ DB, but all server messages are related to the DB.
//Optional Parameters: 1.Data to send 2.If a response is required.
sendToDB = function(event, data = null, needsResponse = true){

    var socket = io();
    if(needsResponse)
        waitForResponse(event, socket);
    if(data == null)
        socket.emit(event);
    else
        socket.emit(event,data);  
}

//Waits for a response from server
waitForResponse = function(event,socket){
    responseEvent = event+"Response";

    if(event == "signIn"){
        socket.on(responseEvent,function(data){
            signIn_wait(data);
        });
    }
    else if(event == "signUp"){
        socket.on(responseEvent,function(data){
            signUp_wait(data);
        });
    }
    else if(event == "getLevelNames"){
        socket.on(responseEvent,function(data){
            getLevelNames_wait(data);
        });
    }
    else if(event == "loadLevel"){
        socket.on(responseEvent,function(data){
            loadLevel_wait(data);
        });
    }
}

signIn_wait = function(data){
    if(data.success){
        menuButton('Play');
        setCurrentUser();
      } else
        alert("Sign in unsuccessful.");
}

signUp_wait = function(data){
    if(data.success){
        alert("Sign up successful.");
      } 
    else
        alert("Sign up unsuccessful, try to use another username.");
}

getLevelNames_wait = function(data){
    names = [];

    for(var entry in data){
        var nameDict = data[entry];
        var name = nameDict.name;
        names.push(name);
    }
    populateExistingLvlPage(names);
}

loadLevel_wait = function(data){
    var lvl = data[0]['level'];
    levelIsLoaded(lvl); //level.js
}