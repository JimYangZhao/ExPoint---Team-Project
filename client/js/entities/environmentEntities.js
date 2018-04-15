//Defines all the environment Entities

//Collides with the player
function enviromentTile(x,y,id){
    var id = id;
    var layer=1;
    var type="static";
    var tags=["block"];
    this.width = 64;
    this.height = 64;
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
    }
}
enviromentTile.prototype=Object.create(Entity.prototype);
enviromentTile.prototype.constructor =  enviromentTile;

//-------------

//Does not collide with the player
function backgroundTile(x,y,id){
    var id = id;
    var layer=0;
    var type="static";
    var tags=["block"];
    this.width = 64;
    this.height = 64;
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
    }
}
backgroundTile.prototype=Object.create(Entity.prototype);
backgroundTile.prototype.constructor =  backgroundTile;

function spikeBlock(x,y){
    this.width = 64;
    this.height = 64;
    var tags=["block","damaging"];
    id="spike";
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

    }
}
spikeBlock.prototype=Object.create(Entity.prototype);
spikeBlock.prototype.constructor = spikeBlock;

function lavaBlock(x,y){
    this.width = 64;
    this.height = 64;
    var tags=["damaging"];
    id="lava1";
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
            if(entityC.tags.includes("player") || entityC.tags.includes("enemy")){
                entityC.yVel=0;
                entityC.y=entityC.y+1;
            }
        }
    }
}
lavaBlock.prototype=Object.create(Entity.prototype);
lavaBlock.prototype.constructor = lavaBlock;

function waterBlock(x,y){
    this.width = 64;
    this.height = 64;
    var tags=["water"];
    id="water1";
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
            if(entityC.tags.includes("player") || entityC.tags.includes("enemy")){
                entityC.yVel=0;
                entityC.y=entityC.y+1;
            }
        }
    }
}
waterBlock.prototype=Object.create(Entity.prototype);
waterBlock.prototype.constructor = waterBlock;

function waterBlock2(x,y){
    this.width = 64;
    this.height = 64;
    var tags=["water"];
    id="water2";
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
            if(entityC.tags.includes("player") || entityC.tags.includes("enemy")){
                entityC.yVel=0;
                entityC.y=entityC.y+1;
            }
        }
    }
}
waterBlock2.prototype=Object.create(Entity.prototype);
waterBlock2.prototype.constructor = waterBlock2;

function ladderBlock(x,y){
    this.width = 64;
    this.height = 64;
    var tags=["ladder"];
    id="ladder";
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
            if(entityC.tags.includes("player") || entityC.tags.includes("enemy")){
                entityC.yVel=0;
                entityC.y=entityC.y-1;
            }
        }
    }
}
ladderBlock.prototype=Object.create(Entity.prototype);
ladderBlock.prototype.constructor = ladderBlock;