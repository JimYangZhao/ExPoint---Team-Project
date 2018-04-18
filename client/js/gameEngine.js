//Main Game Loop
//Handles collisions and game logic

//using width,height and position, checks if there is a collision. The return function returns true if 
// a collision incurred.
function checkCollision(entity1,entity2){
    if(entity1==(null) || entity2==(null)){
        return false;
    }
    return entity1.x < entity2.x+entity2.width
        && entity2.x < entity1.x+entity1.width 
        && entity1.y < entity2.y+entity2.height 
        && entity2.y < entity1.y+entity1.height ;
}

// Uses Minkowski sum to calculate the side the two objects collided. 
//  Only works properly if the two objects have collided, which is only called if they did.

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

// This is identical to the one above, but has values to adjust to the players movement speeds and other movements. 
// Using the above, the player is able to "climb walls", whch is the reason we adjust these values for the player.
function playercheckSide(entity1,entity2){
    w = 0.4486*(entity1.width + entity2.width);
    h = 0.5514*(entity1.height+entity2.height);
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
// A globabl variable that references the player. Used in some parts in the project
var player;

//Uses the jQuery Library to deepclone. The commented code is how one can make a clone without it, but it 
//  does not work do to not keeping the prototype methods.

function DeepCopy(initialState){
    motionEntityList=[]
    for(i=0;i<initialState.motionEntityList.length;i++){
        //motionEntityList.push(Object.assign({Entity},initialState.motionEntityList[i]));
        motionEntityList.push($.extend(true,{},initialState.motionEntityList[i]));
    }
    staticEntityList=[]
    for(i=0;i<initialState.staticEntityList.length;i++){
        //staticEntityList.push(Object.assign({Entity},initialState.staticEntityList[i]));
        staticEntityList.push($.extend(true,{},initialState.staticEntityList[i]));
    }
    backgroundList=[]
    for(i=0;i<initialState.backgroundList.length;i++){
        //backgroundList.push(Object.assign({Entity},initialState.backgroundList[i]));
        backgroundList.push($.extend(true,{},initialState.backgroundList[i]));
    }
    return new levelData(motionEntityList,staticEntityList,backgroundList);
}
//The Object that runs the game. It does so by looping through the list of entites in currentLevelData(the level object)
//  and calling their update function. It then checks if their is any collisions that come from updating the objects. If so, it resolves
//  their collision. After collisions is resolved, it then draws the object.
//If paused, will instead only draw the level, while updating and drawing the game menu.

function gameObject(initialState){
    //the stored variables in game objects
    this.finish=false;
    this.currentLevelData=initialState;
    this.checkPointLevelData= DeepCopy(initialState);
    this.paused=false;
    this.gameMenu=new playerMenu(this.currentLevelData.playerRef)
    this.timeLastPause=30;
    music=new Audio("soundEffects/backGroundMusic.mp3");
    music.play();
    player = initialState.playerRef;
// The update function
    this.updateGame=function(){
// A counter that keeps track of the last time the pause button was pressed.Used later.
        this.timeLastPause=this.timeLastPause+1;
        ctx.clearRect(0,0,1200,600);
        ctx.fillStyle="#FFFFFF";
        ctx.fillRect(0,0,1200,600);
        // if the player is dead, loads from the checkpoint state(the inital state if no checkpoint has been reached)
        if(player.hp<=0){
            playASound("soundEffects/playerDeath.mp3")
            this.loadCheckpoint();
        }
        // the bit that checks if the time passed between the last pause is sufficient. If so, preforms the pause toggle. 
        //  This is to fix the issue of the pause menu rapidly flickering when pressed
        if(pressingPause){
            if(this.timeLastPause>30){
                this.togglePause();
                this.timeLastPause=0;
            }
        }
        //if not paused, updates the game. Note we only loop through motion entities for updates and collisions, as we know that two static objects 
        //  will never colide with eachother. This saves performance, as levels are made up of many entities.
        if(this.paused==false){
            for(i=0; i < this.currentLevelData.motionEntityList.length ; i++){
                this.currentLevelData.motionEntityList[i].update();
            }
            for(i=0; i < this.currentLevelData.motionEntityList.length ; i++){
                for(j=i+1; j < this.currentLevelData.motionEntityList.length ; j++){
                    if(checkCollision(this.currentLevelData.motionEntityList[i],this.currentLevelData.motionEntityList[j])){
                        this.currentLevelData.motionEntityList[i].collision(this.currentLevelData.motionEntityList[j]);
                        if(!(this.currentLevelData.motionEntityList[j] === "undefined")){
                            this.currentLevelData.motionEntityList[j].collision(this.currentLevelData.motionEntityList[i]);
                        }
                    }
                }
                for(j=0;j < this.currentLevelData.staticEntityList.length; j++){
                    if(checkCollision(this.currentLevelData.motionEntityList[i],this.currentLevelData.staticEntityList[j])){
                        this.currentLevelData.motionEntityList[i].collision(this.currentLevelData.staticEntityList[j]);
                        if(!(typeof this.currentLevelData.staticEntityList[j] === "undefined")){
                            this.currentLevelData.staticEntityList[j].collision(this.currentLevelData.motionEntityList[i]);
                        }
                    }
                }
            }
        }
    //We loop through the draw functions here.
        for(i=0;i<this.currentLevelData.backgroundList.length;i++){
            this.currentLevelData.backgroundList[i].draw();
        }
        for(layer=0;layer < 3 ; layer++){
            for(i=0; i < this.currentLevelData.motionEntityList.length ; i++){
                if(layer==this.currentLevelData.motionEntityList[i].layer)
                    this.currentLevelData.motionEntityList[i].draw();
            }
            for(i=0; i < this.currentLevelData.staticEntityList.length ; i++){
                if(layer==this.currentLevelData.staticEntityList[i].layer)
                    this.currentLevelData.staticEntityList[i].draw();
            }
        }
        //draws the HP bar
        ctx.fillStyle="#000000";
        ctx.fillRect(4,4,102,20);
        ctx.fillStyle="#FF0000";
        ctx.fillRect(5,5, (10* player.hp) ,18);
        // If we are are paused, draws and updates the playerGameMenu in the gameObject
        if(this.paused){
            this.gameMenu.update();
            this.gameMenu.draw();
        }
        // If the level has been completed, we clear the canvas.
        if(this.finish){
            ctx.clearRect(0,0,1200,660);
        }
    }
// On death, calls this function to load a previous state.
    this.loadCheckpoint = function() {
        this.currentLevelData=DeepCopy(this.checkPointLevelData);
        player = this.currentLevelData.playerRef;
        this.gameMenu.setPlayer(player);
    }
// When called, sets the checkpoint state to the current level state
    this.saveCheckpoint = function() {
        this.checkPointLevelData=DeepCopy(this.currentLevelData);
    }
// function that simply toggles the pause boolean, which will pause/ unpause the game
    this.togglePause=function(){
        if(this.paused==false) this.paused=true;
        else this.paused=false;
    }
}

// A protoype function of the entity object. Entites that get killed or removed on collision(bullets) all this function
//    in their object to remove themselves from the gameList, thus removing the body.
Entity.prototype.remove = function(){
    if(this.type=="motion"){
        var i = game.currentLevelData.motionEntityList.indexOf(this);
        game.currentLevelData.motionEntityList.splice(i,1);
    }
    else if (this.type=="static"){
        var i = game.currentLevelData.staticEntityList.indexOf(this);
        game.currentLevelData.staticEntityList.splice(i,1);
    }
}
// When an object creates an entity(such as a player or enemy firing a projectile), that said entity calls this function to 
//   create it in the game. This function adds the function in the parameter to the "game loop".
Entity.prototype.addToList = function(entity){
    if(entity.type=="motion"){
        game.currentLevelData.motionEntityList.push(entity);
    }
    else if(this.type=="static"){
        game.currentLevelData.staticEntityList.push(entity);
    }
}
// Used by the checkpoint object. It allows the checkpoint object to call the games save Checkpoint, even though game has not been decared on the objects creation.
checkPoint.prototype.setCheckPointState = function(){
    game.saveCheckpoint();
}
endOfLevel.prototype.toggleFinish= function(){
    game.finish=true;
}
// Used for storing the game interval. We set and clear this later in index.js
gameInterval;
// a function that simply updates the game. Used with the interval functions in index.js
function updateState(){
    game.updateGame();
}
