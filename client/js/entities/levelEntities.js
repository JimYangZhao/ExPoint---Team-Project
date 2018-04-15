function endOfLevel(x,y){
    this.width = 64;
    this.height = 64;
    var tags=[];
    id="end";
    type="static";
    layer=1;
    Entity.call(this,x,y,id,layer,type,tags);
    this.update = function(){

    }
    this.draw = function(){
        var img = ImageAtlas[this.id];
        ctx.drawImage(
            img, // image
            600+(this.x-player.x),  // target x
            330+(this.y-player.y), // target y
            64, // target width
            64 // target height
        );     
    }
    this.collision = function(entityC){
        if(!(typeof entityC === "undefined")){
            if(entityC.tags.includes("player")){
                playASound("soundEffects/levelCompletion.mp3");
                clearInterval(gameInterval);
                menuButton(currentMenu);
                music.pause();
                music.currentTime=0;
                this.toggleFinish();
                if(currentMenu=="Level Editor"){
                    stopLevel();
                }
            }
        }
    }
}
endOfLevel.prototype=Object.create(Entity.prototype);
endOfLevel.prototype.constructor = endOfLevel;

function checkPoint(x,y){
    this.width = 50;
    this.height = 50;
    var tags=[];
    id="check point";
    type="static";
    layer=0;
    Entity.call(this,x,y,id,layer,type,tags);
    this.collected=false;
    this.update = function(){

    }
    this.draw = function(){
        var img = ImageAtlas[this.id];
        ctx.drawImage(
            img, // image
            600+(this.x-player.x),  // target x
            330+(this.y-player.y), // target y
            64, // target width
            64 // target height
        );     
    }
    this.collision = function(entityC){
        if(this.collected==false){
            if(!(typeof entityC === "undefined")){
                if(entityC.tags.includes("player") && this.collected==false){
                    this.collected=true;
                    this.setCheckPointState();
                    playASound("soundEffects/checkPointActivate.mp3")
                }
            }
        }
    }
}
checkPoint.prototype=Object.create(Entity.prototype);
checkPoint.prototype.constructor = checkPoint;