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
var ctx;
window.onload= function(){
    ctx = document.getElementById("ctx").getContext("2d");
}

//reference to canvas

//the game object that is created when a level is loaded.
function gameObject(initialState){
    //the stored variables in game objects
    this.currentLevelData=initialState
    this.checkPointLevelData=initialState
    //game objects functions

    //this function is the game loop It updates everything in the current game state. 
    this.updateGame=function(){
        ctx.clearRect(0,0,500,500);
        for(i=0; i < this.currentLevelData.motionEntityList.length ; i++){
            this.currentLevelData.motionEntityList[i].update();
            //console.log(this.currentLevelData.motionEntityList);
        }
        for(i=0; i < this.currentLevelData.motionEntityList.length ; i++){
            for(j=i+1; j < this.currentLevelData.motionEntityList.length ; j++){
                if(checkCollision(this.currentLevelData.motionEntityList[i],this.currentLevelData.motionEntityList[j])){
                    
                    
                    //entity1Side=checkSide(this.currentLevelData.entityList[i],this.currentLevelData.entityList[j]);
                    this.currentLevelData.motionEntityList[i].collision(this.currentLevelData.motionEntityList[j]);
                    //console.log(entity1Side + "" + this.currentLevelData.entityList[i].id);
                    //entity2Side=checkSide(this.currentLevelData.entityList[j],this.currentLevelData.entityList[i]);
                    if(this.currentLevelData.motionEntityList[j] == !(null)){
                        this.currentLevelData.motionEntityList[j].collision(this.currentLevelData.motionEntityList[i]);
                        //console.log(entity2Side + "" + this.currentLevelData.entityList[j].id);
                    }

                }
            }
            for(j=0;j < this.currentLevelData.staticEntityList.length; j++){
                if(checkCollision(this.currentLevelData.motionEntityList[i],this.currentLevelData.staticEntityList[j])){
                    //console.log('collision');
                    
                    //entity1Side=checkSide(this.currentLevelData.entityList[i],this.currentLevelData.entityList[j]);
                    this.currentLevelData.motionEntityList[i].collision(this.currentLevelData.staticEntityList[j]);
                    //console.log(entity1Side + "" + this.currentLevelData.entityList[i].id);
                    //entity2Side=checkSide(this.currentLevelData.entityList[j],this.currentLevelData.entityList[i]);
                    if(this.currentLevelData.staticEntityList[j] == !(null)){
                        //console.log('collision');
                        this.currentLevelData.staticEntityList[j].collision(this.currentLevelData.motionEntityList[i]);
                        //console.log(entity2Side + "" + this.currentLevelData.entityList[j].id);
                    }

                }
                
            }
        }
        for(i=0; i < this.currentLevelData.motionEntityList.length ; i++){
            this.currentLevelData.motionEntityList[i].draw();
        }
        for(i=0; i < this.currentLevelData.staticEntityList.length ; i++){
            this.currentLevelData.staticEntityList[i].draw();
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

motionEntityList=[];
staticEntityList=[];
//entityList.push(new Enemy1(0,0));
//entityList.push(new Enemy2(200,200));
player = new playerChar(32,0);

//motionEntityList.push(player);
staticEntityList.push(new block(0,128));
staticEntityList.push(new block(32,128));
staticEntityList.push(new block(64,128));
staticEntityList.push(new block(96,128));
staticEntityList.push(new block(128,64));
staticEntityList.push(new block(128,96));
staticEntityList.push(new block(128,128));
staticEntityList.push(new block(160,128));
staticEntityList.push(new block(192,128));
staticEntityList.push(new block(224,128));
staticEntityList.push(new block(224,96));
staticEntityList.push(new block(256,128));
staticEntityList.push(new block(288,128));
staticEntityList.push(new block(320,128));
motionEntityList.push(player);
//entityList.push(player);
//console.log(motionEntityList[0].type);
//console.log(staticEntityList[0].type);

loadedLevel = new levelData(motionEntityList,staticEntityList);
//game = new gameObject(loadedLevel);

Entity.prototype.remove = function(){
    //console.log("collision");
    if(this.type=="motion"){
        var i = game.currentLevelData.motionEntityList.indexOf(this);
        game.currentLevelData.motionEntityList.splice(i,1);
    }
    else if (this.type=="static"){
        var i = game.currentLevelData.staticEntityList.indexOf(this);
        game.currentLevelData.staticEntityList.splice(i,1);
    }
}

//works by pushing the entity in the parameter to the motion/static entity list.

Entity.prototype.create = function(entity){
    if(entity.type=="motion"){
        game.currentLevelData.motionEntityList.push(entity);
    }
    else if(this.type=="static"){
        game.currentLevelData.staticEntityList.push(entity);
    }
}

//setInterval(update,1000/60);
function update(){
    game.updateGame();
}