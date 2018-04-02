function Entity(x,y,id,src,layer,type,tags) {
    this.x=x;
    this.y=y;
    this.id=id;
    this.src=src;
    this.layer=layer;
    this.type=type;
    this.tags=tags
}

//------------------

function playerChar(x,y,layer){
    var id="player";
    var src="images/player/player.png";
    var layer=2;
    var type="motion";
    var tags=["player"];
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.width = 61;
    this.height = 61;
    this.yVel=0;
    this.hp=10;
    this.iframes=0;
    this.cooldown=0;
    this.selected1="magic missle";
    this.selected2="staff hit";
    this.inventory=["med kit", 2 ,"bomb", 2];
    this.powers=["staff hit", "magic missle","dummy one","dummy two"];
    this.update = function(){
        if(!pressingHalt){
            if(pressingDown) this.y = this.y+15;
            if(pressingUp) this.y = this.y-20;
            if(pressingLeft) this.x = this.x-15;
            if(pressingRight) this.x = this.x+15;
        }
        this.yVel=this.yVel+1
        if(this.yVel>30){
            (this.yVel=30);
        }
        this.y=this.y+this.yVel;
        if(this.iframes>0){
            this.iframes=this.iframes-1;
        }
        if(this.cooldown==0){
            if(pressingPower1==true){
                if(pressingLeft){
                    this.addToList(new playerProjectile(this.x,this.y,"left",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);
                }
                else if(pressingRight){
                    this.addToList(new playerProjectile(this.x+60,this.y,"right",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);
                }
                else if(pressingDown){
                    this.addToList(new playerProjectile(this.x,this.y-60,"down",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);
                }
                else if(pressingUp){
                    this.addToList(new playerProjectile(this.x,this.y,"up",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);
                }
                else{
                    this.addToList(new playerProjectile(this.x+60,this.y,"right",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);    
                }
            }
            else if(pressingPower2==true){
                if(pressingLeft){
                    this.addToList(new playerProjectile(this.x,this.y,"left",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);
                }
                else if(pressingRight){
                    this.addToList(new playerProjectile(this.x+60,this.y,"right",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);
                }
                else if(pressingDown){
                    this.addToList(new playerProjectile(this.x,this.y-60,"down",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);
                }
                else if(pressingUp){
                    this.addToList(new playerProjectile(this.x,this.y,"up",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);
                }
                else{
                    this.addToList(new playerProjectile(this.x+60,this.y,"right",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);  
                }
            }
        }else{
            this.cooldown=this.cooldown-1
        }
    }
    this.draw = function(){
        //ctx.fillStyle="#FF0000";
        //ctx.fillRect(250,250,61,61);
        var img = LevelEditor.tileAtlas[this.id];
        ctx.drawImage(
            img, // image
            256,  // target x
            256, // target y
            61, // target width
            61 // target height
        );
    }
    this.collision = function(entityC){
        entitySide=checkSide(this,entityC);
        if(entityC.tags.includes("block")){
            sideColided=checkSide(this , entityC)
            if(sideColided=="bottom"){
                this.y=entityC.y-60;
                this.yVel=0;
            }
            if(sideColided=="top"){
                this.y=entityC.y+60;
            }
            if(sideColided=="left"){
                this.x=entityC.x+60;
            }
            if(sideColided=="right"){
                this.x=entityC.x-60;
            }
        }
        if(entityC.tags.includes("damaging")){
            if(this.iframes==0){
                this.hp=this.hp-1;
                this.iframes=120;
            }
        }
    }
} 
playerChar.prototype=Object.create(Entity.prototype);
playerChar.prototype.constructor = playerChar;

//-------------------

//
//  ENVIROMENT TILES
//
function grassTile(x,y,layer){
    var id = 'grass';
    var src = 'images/enviroment/grass1.png';
    var layer=1;
    var type="static";
    var tags=["block"];
    this.width = 64;
    this.height = 64;
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){
    }
    this.draw = function(){
        // ctx.fillStyle="#000000";
        // ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),64,64);
        var img = LevelEditor.tileAtlas[this.id];
        ctx.drawImage(
            img, // image
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        );   
    }
    this.collision = function(entityC){
        //this.remove();
    }
}
grassTile.prototype=Object.create(Entity.prototype);
grassTile.prototype.constructor =  grassTile;
//-------------
function dirtTile(x,y,layer){
    var id = 'dirt';
    var src = 'images/enviroment/tempDirt.png';
    var layer=1;
    var type="static";
    var tags=["block"];
    this.width = 64;
    this.height = 64;
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){
    }
    this.draw = function(){
        // ctx.fillStyle="#000000";
        // ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),64,64);
        var img = LevelEditor.tileAtlas[this.id];
        ctx.drawImage(
            img, // image
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        );    
    }
    this.collision = function(entityC){
        //this.remove();
    }
}
dirtTile.prototype=Object.create(Entity.prototype);
dirtTile.prototype.constructor =  dirtTile;
//-------------
function skyTile(x,y,layer){
    var id = 'sky';
    var src = 'images/enviroment/sky.png';
    var layer=0;
    var type="background";
    var tags=["block"];
    this.width = 64;
    this.height = 64;
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){
    }
    this.draw = function(){
        // ctx.fillStyle="#000000";
        // ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),64,64);
        var img = LevelEditor.tileAtlas[this.id];
        ctx.drawImage(
            img, // image
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        );    
    }
    this.collision = function(entityC){
        //this.remove();
    }
}
skyTile.prototype=Object.create(Entity.prototype);
skyTile.prototype.constructor =  skyTile;
//-------------
function cloud1Tile(x,y,layer){
    var id = 'cloud1';
    var src = 'images/enviroment/cloud1.png';
    var layer=0;
    var type="background";
    var tags=["block"];
    this.width = 64;
    this.height = 64;
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){
    }
    this.draw = function(){
        // ctx.fillStyle="#000000";
        // ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),64,64);
        var img = LevelEditor.tileAtlas[this.id];
        ctx.drawImage(
            img, // image
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        );    
    }
    this.collision = function(entityC){
        //this.remove();
    }
}
cloud1Tile.prototype=Object.create(Entity.prototype);
cloud1Tile.prototype.constructor =  cloud1Tile;
//
//  END ENVIROMENT TILES
//

//
//  TEST ENTITY
//

function block(x,y){
    this.width = 64;
    this.height = 64;
    var tags=["block"];
    id="block";
    type="static";
    layer=1;
    src="block url";
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){
    }
    this.draw = function(){
        ctx.fillStyle="#000000";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
    }
    this.collision = function(entityC){
        //this.remove();
    }
}
block.prototype=Object.create(Entity.prototype);
block.prototype.constructor = playerChar;
//--------
function enemy(x,y){
    this.width = 64;
    this.height = 64;
    id="enemy";
    type="motion";
    layer=1
    src="enemy url"
    var tags=["damaging","enemy"];
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.yVel=0;
    this.hp=100;
    this.update = function(){
        if(this.hp<=0){
            this.remove();
        }
        this.yVel=this.yVel+1
        if(this.yVel>30){
            (this.yVel=30);
        }
        this.y=this.y+this.yVel;
        player=game.currentLevelData.playerRef;
        if(player.x-this.x <= 0){
            this.x=this.x-3;
        }
        else{
            this.x=this.x+3;
        }
    }
    this.draw = function(){
        ctx.fillStyle="#000000";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
    }
    this.collision = function(entityC){
        entitySide=checkSide(this,entityC);
        if(entityC.id=="magic missle"){
            this.hp=this.hp-30;
        }
        if(entityC.id=="staff hit"){
            this.hp=this.hp-2;
        }
        if(entityC.tags.includes("block")){
            sideColided=checkSide(this , entityC)
            if(sideColided=="bottom"){
                this.y=entityC.y-64;
                this.yVel=0;
            }
            if(sideColided=="top"){
                this.y=entityC.y+64;
            }
            if(sideColided=="left"){
                this.x=entityC.x+64;
                this.y=this.y-15;
            }
            if(sideColided=="right"){
                this.x=entityC.x-64;
                this.y=this.y-15;
            }
        }
        if(entityC.id=="ladder block"){
            this.y=this.y+1;
        }
    }
}
enemy.prototype=Object.create(Entity.prototype);
enemy.prototype.constructor = enemy;

//also includes player powers that are not projectiles.

function playerProjectile(x,y,direction,projectile){
    id=projectile;
    type="motion";
    layer=1
    src="list of url"
    this.yVel=0;
    var tags=[];
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.width = getProjectileWidth(projectile);
    this.height = getProjectileHeight(projectile);
    this.direction=direction;
    this.framesUp=0;
    this.directionAdjustment=function(){
        if(this.id=="staff hit"){
            if(this.direction=="up" || this.direction=="down"){
            temp=this.width;
            this.width=this.height;
            this.height=temp;
            }
        }
        else{

        }
    }
    this.directionAdjustment();
    this.update = function(){
        if(this.id=="magic missle"){
            if(this.direction=="down") this.y = this.y+15;
            else if(this.direction=="up") this.y = this.y-15;
            else if(this.direction=="left") this.x = this.x-15;
            else if(this.direction=="right") this.x = this.x+15;
        }
        if(this.id=="staff hit"){
            if(this.direction=="down"){
                this.y=game.currentLevelData.playerRef.y + game.currentLevelData.playerRef.height+2;
                this.x=game.currentLevelData.playerRef.x + game.currentLevelData.playerRef.width/2;
            }
            else if(this.direction=="up"){
                this.y=game.currentLevelData.playerRef.y-2 - this.height;
                this.x=game.currentLevelData.playerRef.x + game.currentLevelData.playerRef.width/2;
            }
            else if(this.direction=="left") {
                this.y=game.currentLevelData.playerRef.y+ game.currentLevelData.playerRef.height/2;
                this.x=game.currentLevelData.playerRef.x-2 -this.width;
            }
            else if(this.direction=="right"){
                this.y=game.currentLevelData.playerRef.y+ game.currentLevelData.playerRef.height/2;
                this.x=game.currentLevelData.playerRef.x + game.currentLevelData.playerRef.width+2;

            }
            this.framesUp=this.framesUp+1;
            if(this.framesUp==30){
                this.remove();
            }
        }
        if(this.id=="med kit"){
            if(game.currentLevelData.playerRef.inventory[1]>0){
                game.currentLevelData.playerRef.inventory[1]=game.currentLevelData.playerRef.inventory[1]-1
                game.currentLevelData.playerRef.hp=10;
                this.remove()
            }
            else{
                this.remove();
            }
        }
        if(this.id=="bomb"){
            if(game.currentLevelData.playerRef.inventory[3]>0){
                game.currentLevelData.playerRef.inventory[3]=game.currentLevelData.playerRef.inventory[3]-1;
                console.log(game.currentLevelData.playerRef.inventory[3]);
                this.id="bomb2";
            }
            else{
                this.remove();
            }
        }
        if(this.id=="bomb2"){
            if(this.framesUp==120){
                this.id="explosion";
                this.tags.push("damaging");
                this.height=256;
                this.width=256;
                this.y=this.y-128;
                this.x=this.x-128;
            }
            else{
                this.yVel=this.yVel+1;
                this.y=this.y+this.yVel;
                this.framesUp=this.framesUp+1;
            }
        }
        if(this.id=="explosion"){
            if(this.framesUp==125){
                this.remove();
            }
            this.framesUp=this.framesUp+1;
        }
    }
    this.draw = function(){
        if(this.id=="magic missle"){
            ctx.fillStyle="#1218E2";
            ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),this.width,this.height); 
        }
        else if(this.id=="staff hit"){
            ctx.fillStyle="#1218E2";
            ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),this.width,this.height);
        }
        else if("bomb2"){
            ctx.fillStyle="#00008B";
            ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),this.width,this.height);
        }
        else if("explosion"){
            ctx.fillStyle="#FF4500";
            ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),this.width,this.height);
        }  
    }
    this.collision = function(entityC){
        if(this.id=="magic missle"){
            this.remove();
        }
        if(this.id=="staffHit"){
            if(entityC.tags.includes("block")){
                this.remove();
            }
        }
        if(this.id=="bomb2"){
            if(entityC.tags.includes("block")){
                    this.y=entityC.y-20;
                    this.yVel=0;
            }
        }
        if(this.id=="explosion"){
            if(entityC.tags.includes("enemy")){
                enemy.hp=enemy.hp-25;
            }
        }
    }
}

function getProjectileHeight(projectile){
    if(projectile=="magic missle"){
       return 8;
    }
    else if(projectile=="staff hit"){
        return 8;
    }
    else if(projectile=="bomb"){
        return 20;
    }
    else{
        return 0;
    }
}
function getProjectileWidth(projectile){
    if(projectile=="magic missle"){
        return 8;
    }
    else if(projectile=="staff hit"){
        return 20;
    }
    else if(projectile=="bomb"){
        return 20;
    }
    else{
        return 0;
    }
}

function getProjectileCooldown(projectile){
    if(projectile=="magic missle"){
        return 60;
    }
    else if(projectile=="staff hit"){
        return 30;
    }
    else if(projectile=="med kit"){
        return 10;
    }
    else if(projectile=="bomb"){
        return 60;
    }
}

playerProjectile.prototype=Object.create(Entity.prototype);
playerProjectile.prototype.constructor = playerProjectile;

function harmfulBlock(x,y){
    this.width = 64;
    this.height = 64;
    var tags=["block","damaging"];
    id="harmful block";
    type="static";
    layer=1;
    src="harmful block url";
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){
    }
    this.draw = function(){
        ctx.fillStyle="#FFA500";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
    }
    this.collision = function(entityC){

    }
}
harmfulBlock.prototype=Object.create(Entity.prototype);
harmfulBlock.prototype.constructor = harmfulBlock;


function turret(x,y){
    this.width = 64;
    this.height = 64;
    id="turret";
    type="motion";
    layer=1
    src="enemy url"
    var tags=["damaging","block"];
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.cooldown=0;
    this.hp=100;
    this.update = function(){
        this.cooldown=this.cooldown-1;
        if(this.hp<=0){
           this.remove();
        }
        else{
            if(getDistance(this,game.currentLevelData.playerRef)<=300){
                if(this.cooldown<=0){
                    //angle=function that calculates angle
                    //addToList(new turretProjectile(x,y,angle));
                    this.cooldown=100;
                }
            }
        }
    }
    this.draw = function(){
        ctx.fillStyle="#000000";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
    }
    this.collision = function(entityC){
        entitySide=checkSide(this,entityC);
        if(entityC.id=="magic missle"){
            this.hp=this.hp-30;
        }
        if(entityC.id=="staff hit"){
            this.hp=this.hp-2;
        }
    }
}
turret.prototype=Object.create(Entity.prototype);
turret.prototype.constructor = turret;

function turretProjectile(x,y,angle){
    this.width = 8;
    this.height = 8;
    id="turret projectile";
    type="motion";
    layer=1
    src="enemy url"
    var tags=["damaging"];
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.xvel=angleCos*2;
    this.yvel=angleSin*2;
    this.update = function(){
        this.x=this.x+xvel;
        this.y=this.y+yvel;
    }
    this.draw = function(){
        ctx.fillStyle="#000000";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
    }
    this.collision = function(entityC){
        if(entityC.tags.includes("block") || entityC.tags.includes("player")){
            this.remove()
        }
    }
}
turretProjectile.prototype=Object.create(Entity.prototype);
turretProjectile.prototype.constructor = turretProjectile;

function getDistance(entityA, entityB){
    var a = entityA.x - entityB.x;
    var b = entityA.y - entityB.y;
    return Math.sqrt( a*a + b*b );
}

function getAngle(entityA, entityB){
    //code for angle goes here
}

function ladderBlock(x,y){
    this.width = 64;
    this.height = 64;
    var tags=[];
    id="ladder block";
    type="static";
    layer=1;
    src="ladder block url";
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){

    }
    this.draw = function(){
        ctx.fillStyle="#835C3B";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
    }
    this.collision = function(entityC){
        if(entityC.tags.includes("player") || entityC.tags.includes("enemy")){
            entityC.yVel=0;
            entityC.y=entityC.y-1;
        }
    }
}
ladderBlock.prototype=Object.create(Entity.prototype);
ladderBlock.prototype.constructor = ladderBlock;

function waterBlock(x,y){
    this.width = 64;
    this.height = 64;
    var tags=[];
    id="water";
    type="static";
    layer=1;
    src="images/enviroment/water1.png";
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){

    }
    this.draw = function(){
        //ctx.fillStyle="#00FFFF";
        //ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
        var img = LevelEditor.tileAtlas[this.id];
        ctx.drawImage(
            img, // image
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        ); 
    }
    this.collision = function(entityC){
        if(entityC.tags.includes("player") || entityC.tags.includes("enemy")){
            entityC.yVel=0;
            entityC.y=entityC.y+1;
        }
    }
}
waterBlock.prototype=Object.create(Entity.prototype);
waterBlock.prototype.constructor = waterBlock;

function medKit(x,y){
    this.width = 64;
    this.height = 64;
    var tags=[];
    id="med kit";
    type="static";
    layer=1;
    src="med kit url";
    Entity.call(this,x,y,id,src,layer,type,tags);
    this.update = function(){

    }
    this.draw = function(){
        ctx.fillStyle="#FF00FF";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
    }
    this.collision = function(entityC){
        if(entityC.tags.includes("player")){
            entityC.inventory[1]=entityC.inventory[1]+1;
            this.remove();
        }
    }
}
medKit.prototype=Object.create(Entity.prototype);
medKit.prototype.constructor = medKit;

////////menu GUI/////////

function playerMenu(player){
    this.player=player;
    this.powers= player.powers;
    this.inventory=player.inventory;
    this.selectorPower=0;
    this.selectorItems=0;
    this.menuCooldown=0;
    this.toggle=false;
    this.update = function(){
        if(this.menuCooldown>0){
            this.menuCooldown=this.menuCooldown-1;
        }
        else{
            if(pressingDown){
                if(this.inventory.length != 0 && this.toggle==false){
                    this.toggle=true;
                    this.menuCooldown=this.menuCooldown+10;
                }
            } 
            if(pressingUp){
                if(this.powers.length != 0 && this.toggle==true){
                    this.toggle=false;
                    this.menuCooldown=this.menuCooldown+10;
                }
            }
            if(pressingLeft){
                if(this.toggle==false && this.selectorPower-1 >= 0){
                    this.selectorPower=this.selectorPower-1;
                    this.menuCooldown=this.menuCooldown+10;
                }
                if(this.toggle==true && this.selectorItems-1 >= 0){
                    this.selectorItems=this.selectorItems-1;
                    this.menuCooldown=this.menuCooldown+10;
                }
            }
            if(pressingRight){
                if((this.toggle==false) && (this.selectorPower+1 < this.powers.length)){
                    this.selectorPower=this.selectorPower+1;
                    this.menuCooldown=this.menuCooldown+10;
                }
                if(this.toggle==true && this.selectorItems+1 < this.inventory.length/2){
                    this.selectorItems=this.selectorItems+1;
                    this.menuCooldown=this.menuCooldown+10;
                }
            }
            if(pressingPower1){
                if(this.toggle==false){
                    this.player.selected1=this.powers[this.selectorPower];
                    this.menuCooldown=this.menuCooldown+10;
                }
                else{
                    this.player.selected1=this.inventory[this.selectorItems*2];
                    this.menuCooldown=this.menuCooldown+10;
                }
            }
            if(pressingPower2){
                if(this.toggle==false){
                    this.player.selected2=this.powers[this.selectorPower];
                    this.menuCooldown=this.menuCooldown+10;
                }
                else{
                    this.player.selected2=this.inventory[this.selectorItems*2];
                    this.menuCooldown=this.menuCooldown+10;
                }
            }
        }
        console.log(this.selectorItems);
    }
    this.draw = function(){
        ctx.fillStyle="#000000";
        ctx.fillRect(64,64,384,384);
        if(this.toggle==false){
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(64+(64*this.selectorPower)+20,64+20,64,64);
            ctx.fillStyle="#505050";
            ctx.fillRect(64+(64*this.selectorItems)+20,128+40,64,64);
        }
        else{
            ctx.fillStyle="#505050";
            ctx.fillRect(64+(64*this.selectorPower)+20,64+20,64,64);
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(64+(64*this.selectorItems)+20,128+40,64,64);
        }
        for(i=0;i<this.powers.length;i++){
            if(this.powers[i]=="magic missle"){
                
            }
            if(this.powers[i]=="staff hit"){

            }
        }
        for(i=0;i<this.inventory.length;i=i+2){
            if(this.inventory[i]=="med kit"){

            }
            if(this.inventory[i]=="bomb"){

            }
        }

    }
}

