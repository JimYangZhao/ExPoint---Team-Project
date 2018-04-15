function medKit(x,y){
    this.width = 64;
    this.height = 64;
    var tags=[];
    id="medkit";
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
                playASound("soundEffects/itemPickUp.mp3");
                entityC.inventory[1]=entityC.inventory[1]+1;
                this.remove();
            }
        }
    }
}
medKit.prototype=Object.create(Entity.prototype);
medKit.prototype.constructor = medKit;

function bombPickup(x,y){
    this.width = 64;
    this.height = 64;
    var tags=[];
    id="bomb1";
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
                playASound("soundEffects/itemPickUp.mp3");
                entityC.inventory[3]=entityC.inventory[3]+1;
                this.remove();
            }
        }
    }
}
bombPickup.prototype=Object.create(Entity.prototype);
bombPickup.prototype.constructor = bombPickup;

function fireBallPickup(x,y){
    this.width = 64;
    this.height = 64;
    var tags=[];
    id="fire ball";
    type="static";
    layer=0;
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
                playASound("soundEffects/powerPickup.mp3");
                entityC.powers.push("fire ball");
                this.remove();
            }
        }
    }
}
fireBallPickup.prototype=Object.create(Entity.prototype);
fireBallPickup.prototype.constructor = fireBallPickup;