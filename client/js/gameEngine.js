//code for checking button preses
pressingRight = false;
pressingLeft = false;
pressingUp = false;
pressingDown = false;
pressingPower1 = false;
pressingPower2 = false;

document.onkeydown= function(event){
    if(event.keyCode == 68)
        pressingRight=true;
    else if(event.keyCode == 83)
        pressingDown=true;
    else if(event.keyCode == 65)
        pressingLeft=true;
    else if(event.keyCode == 87)
        pressingUp=true;
    else if(event.keyCode == 69)
        pressingPower1=true;
    else if(event.keyCode == 82)
        pressingPower2=true;
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
    else if(event.keyCode == 69)
        pressingPower1=false;
    else if(event.keyCode == 82)
        pressingPower2=false;
}


//gamestate and or level data
levelData = function(entityList){
    this.entityList=entityList;
    //objects we are always checking
    //objects that ate static
    //player inventory?
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
//outputs direction with respect to entity 1.

function checkSide(entity1,entity2){
    w = 0.5*(entity1.width + entity2.width);
    h = 0.5*(entity1.height+entity2.height);
    dx = entity1.x - entity2.x;
    dy = entity1.y - entity2.y;
    wy=w*dy;
    hx=h*dx;
    if(wy>hx){
        if(wy>-hx){
            return "top";
        }
        else{
            return "right";
        }
    }
    else{
        if(wy > -hx){
            return "left";
        }
        else{
            return "bottom";
        }
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
                    
                    
                    console.log(this.currentLevelData.entityList[i].id)
                    //entity1Side=checkSide(this.currentLevelData.entityList[i],this.currentLevelData.entityList[j]);
                    this.currentLevelData.entityList[i].collision(this.currentLevelData.entityList[j]);
                    //console.log(entity1Side + "" + this.currentLevelData.entityList[i].id);
                    //entity2Side=checkSide(this.currentLevelData.entityList[j],this.currentLevelData.entityList[i]);
                    this.currentLevelData.entityList[j].collision(this.currentLevelData.entityList[i]);
                    //console.log(entity2Side + "" + this.currentLevelData.entityList[j].id);

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

entityList=[];
//entityList.push(new Enemy1(0,0));
//entityList.push(new Enemy2(200,200));
player = new player(32,0);


entityList.push(new block(0,128));
entityList.push(new block(32,128));
entityList.push(new block(64,128));
entityList.push(new block(96,128));
entityList.push(new block(128,64));
entityList.push(new block(128,96));
entityList.push(new block(128,128));
entityList.push(new block(160,128));
entityList.push(new block(192,128));
entityList.push(new block(224,128));
entityList.push(new block(224,96));
entityList.push(new block(256,128));
entityList.push(new block(288,128));
entityList.push(new block(320,128));
entityList.push(player);
//entityList.push(player);

loadedLevel = new levelData(entityList);
game = new gameObject(loadedLevel);

Entity.prototype.remove = function(){
    var i = game.currentLevelData.entityList.indexOf(this);
    game.currentLevelData.entityList.splice(i,1);
}

setInterval(update,1000/60);
function update(){
    game.updateGame();
    //(player.x + " , " + player.y)
}