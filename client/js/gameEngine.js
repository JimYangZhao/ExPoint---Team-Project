// Javascript for the game to go here.

//code for checking button preses
pressingRight = false;
pressingLeft = false;
pressingUp = false;
pressingDown = false;

document.onkeydown= function(event){
    if(event.keyCode == 68)
        pressingRight=true;
    else if(event.keyCode == 83)
        pressingDown=true;
    else if(event.keyCode == 65)
        pressingLeft=true;
    else if(event.keyCode == 87)
        pressingUp=true;
}
document.onkeyup=function(event){
    if(event.keyCode == 68)
        pressingRight=false;
    else if(event.keyCode == 83)
        pressingDown=false;
    else if(event.keyCode == 65)
        pressingLeft=false;
    else if(event.keyCode == 87)
        pressingUp=false;
}


//gamestate and or level data
levelData = function(entityList){
    this.entityList=entityList;
}

//formula for checking if entity one and entity two colides. Returns true if so.
//works by checking for a gap between the two entities. If any exist, then there is no collision
function checkCollision(entity1,entity2){
    return entity1.x < entity2.x+entity2.width
        && entity2.x < entity1.x+entity1.width
        && entity1.y < entity2.y+entity2.height
        && entity2.y < entity1.y+entity1.height;
}
//uses the minkowski sum. checks here the center of a rectangle lies relative to the other one
//outputs direction with respect to entity 1/2?.
function checkSide(entity1,entity2){
    w = 0.5*(entity1.width + entity2.width);
    h = 0.5*(entity1.height+entity2.height);
    dx = entity1.x - entity2.x;
    dy = entity1.y - entity2.y;
    wy=w*dy;
    hx=h*dx;
    if(wy>hx){
        if(wy>-hx) console.log("bottom collision");
        else console.log("left collision");
    }
    else{
        if(wy > -hx) console.log("right collision");
        else console.log("top collision");
    }
}
//reference to canvas
var ctx = document.getElementById("ctx").getContext("2d");

//the game object that is created when a level is loaded.
function gameObject(initialState){
    //the stored variables in game objects
    this.currentLevelData=initialState
    this.checkPointLevelData=initialState
    //game objects functions

    //this function is the game loop It updates everything in the current game state. 
    this.updateGame=function(){
        ctx.clearRect(0,0,500,500);
        for(i=0; i < this.currentLevelData.entityList.length ; i++){
            this.currentLevelData.entityList[i].update();
        }
        for(i=0; i < this.currentLevelData.entityList.length ; i++){
            for(j=i+1; j < this.currentLevelData.entityList.length ; j++){
                if(checkCollision(this.currentLevelData.entityList[i],this.currentLevelData.entityList[j])){
                    checkSide(this.currentLevelData.entityList[i],this.currentLevelData.entityList[j]);
                }
            }
        }
        for(i=0; i < this.currentLevelData.entityList.length ; i++){
            this.currentLevelData.entityList[i].draw();
        }
    }

    //this function is called when the player dies. It replaces the current game state with the checkpoint's
    this.loadCheckpoint = function() {
        this.currentLevelData=this.checkPointLevelData;
    }
    //this function is called when the player collides with a checkpoint
    this.saveCheckpoint = function() {
        this.currentLevelData=this.checkPointLevelData;
    }
}

//some code for testing purposes

/*

Enemy1 = function(X,Y){
    this.x = X;
    this.y = Y;
    this.width = 10;
    this.height = 10;
    this.id="skeleton";
    this.update = function(){
        this.x=this.x+1;
        this.y=this.y+1;
    }
    this.draw = function(){
        ctx.fillRect(this.x,this.y,10,10);
    }
}
Enemy2 = function(X,Y){
    this.x = X;
    this.y = Y;
    this.width = 20;
    this.height = 20;
    this.id="wizard";
    this.update = function(){
        this.x=this.x-1;
        this.y=this.y-1;
    }
    this.draw = function(){
        ctx.fillRect(this.x,this.y,20,20);
    }
}
*/
Block = function(X,Y){
    this.x = X;
    this.y = Y;
    this.width = 32;
    this.height = 32;
    this.id="player";
    this.update = function(){
    }
    this.draw = function(){
        ctx.fillStyle="#000000";
        //ctx.fillRect(this.x,this.y,32,32);
        ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),32,32);
        
    }
}
Player = function(X,Y){
    this.x = X;
    this.y = Y;
    this.width = 32;
    this.height = 32;
    this.id="block";
    this.update = function(){
        if(pressingDown) this.y = this.y+1;
        if(pressingUp) this.y = this.y-1;
        if(pressingLeft) this.x = this.x-1;
        if(pressingRight) this.x = this.x+1;
    }
    this.draw = function(){
        ctx.fillStyle="#FF0000";
        //ctx.fillRect(this.x,this.y,32,32);
        ctx.fillRect(250,250,32,32);
    }
}

entityList=[];
//entityList.push(new Enemy1(0,0));
//entityList.push(new Enemy2(200,200));
player = new Player(0,0);
entityList.push(player);
entityList.push(new Block(64,32));
entityList.push(new Block(64,64));
entityList.push(new Block(64,96));

loadedLevel = new levelData(entityList);
game = new gameObject(loadedLevel);

setInterval(update,1000/60);
function update(){
    game.updateGame();
    console.log(player.x + " , " + player.y)
}