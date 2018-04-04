//code for checking button preses
pressingRight = false;
pressingLeft = false;
pressingUp = false;
pressingDown = false;
pressingPower1 = false;
pressingPower2 = false;
pressingHalt= false;
pressingPause=false;

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
    else if(event.keyCode == 90)
        pressingHalt=true;
    else if(event.keyCode == 80)
        pressingPause=true;
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
    else if(event.keyCode == 90)
        pressingHalt=false;
    else if(event.keyCode == 80)
        pressingPause=false;
}

function checkCollision(entity1,entity2){
    if(entity1==(null) || entity2==(null)){
        return false;
    }
    return entity1.x < entity2.x+entity2.width
        && entity2.x < entity1.x+entity1.width 
        && entity1.y < entity2.y+entity2.height 
        && entity2.y < entity1.y+entity1.height ;
}

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

var player;

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

    this.updateGame=function(){
        this.timeLastPause=this.timeLastPause+1;
        ctx.clearRect(0,0,512,512);
        ctx.fillStyle="#FFFFFF";
        ctx.fillRect(0,0,512,512);
        if(player.hp<=0){
            playASound("soundEffects/playerDeath.mp3")
            this.loadCheckpoint();
        }
        if(pressingPause){
            if(this.timeLastPause>30){
                this.togglePause();
                this.timeLastPause=0;
            }
        }
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
        for(i=0;i<this.currentLevelData.backgroundList.length;i++){
            this.currentLevelData.backgroundList[i].draw();
        }
        for(layer=0;layer < 3 ; layer++){
            for(i=0; i < this.currentLevelData.motionEntityList.length ; i++){
                //this.currentLevelData.motionEntityList[i].draw();
                if(layer==this.currentLevelData.motionEntityList[i].layer)
                    this.currentLevelData.motionEntityList[i].draw();
            }
            for(i=0; i < this.currentLevelData.staticEntityList.length ; i++){
                //this.currentLevelData.staticEntityList[i].draw();
                if(layer==this.currentLevelData.staticEntityList[i].layer)
                    this.currentLevelData.staticEntityList[i].draw();
            }
        }
        ctx.fillStyle="#000000";
        ctx.fillRect(4,4,102,20);
        ctx.fillStyle="#FF0000";
        ctx.fillRect(5,5, (10* player.hp) ,18);
        if(this.paused){
            this.gameMenu.update();
            this.gameMenu.draw();
        }
        if(this.paused){
            this.gameMenu.update();
            this.gameMenu.draw();
        }
        if(this.finish){
            ctx.clearRect(0,0,512,512);
        }
    }

    this.loadCheckpoint = function() {
        this.currentLevelData=DeepCopy(this.checkPointLevelData);
        player = this.currentLevelData.playerRef;
        this.gameMenu.setPlayer(player);
    }
    this.saveCheckpoint = function() {
        this.checkPointLevelData=DeepCopy(this.currentLevelData);
    }
    this.togglePause=function(){
        if(this.paused==false) this.paused=true;
        else this.paused=false;
    }
}

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

Entity.prototype.addToList = function(entity){
    if(entity.type=="motion"){
        game.currentLevelData.motionEntityList.push(entity);
    }
    else if(this.type=="static"){
        game.currentLevelData.staticEntityList.push(entity);
    }
}

checkPoint.prototype.setCheckPointState = function(){
    game.saveCheckpoint();
}
endOfLevel.prototype.toggleFinish= function(){
    game.finish=true;
}

gameInterval;

function updateState(){
    game.updateGame();
}