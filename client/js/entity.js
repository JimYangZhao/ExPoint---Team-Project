function playASound(soundFile){
    var audio = new Audio(soundFile);
    audio.play();
}

function Entity(x,y,id,layer,type,tags) {
    this.x=x;
    this.y=y;
    this.id=id;
    this.layer=layer;
    this.type=type;
    this.tags=tags
}

//------------------

function playerChar(x,y,layer){
    var id="player";
    var layer=2;
    var type="motion";
    var tags=["player"];
    Entity.call(this,x,y,id,layer,type,tags);
    this.facing="right"
    this.width = 61;
    this.height = 61;
    this.yVel=0;
    this.hp=10;
    this.iframes=0;
    this.cooldown=0;
    this.selected1="magic missle";
    this.selected2="staff hit";
    this.inventory=["med kit", 2 ,"bomb", 2];
    this.powers=["staff hit", "magic missle"];
    this.update = function(){
        if(pressingLeft) {this.facing="left"}
        if(pressingRight) {this.facing="right"}
        if(!pressingHalt){
            if(pressingDown) this.y = this.y+12;
            if(pressingUp) this.y = this.y-20;
            if(pressingLeft) this.x = this.x-12;
            if(pressingRight) this.x = this.x+12;
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
                    this.addToList(new playerProjectile(this.x,this.y+this.height/2,"left",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);
                    playProjectileSound(this.selected1);
                }
                else if(pressingRight){
                    this.addToList(new playerProjectile(this.x+61,this.y+this.height/2,"right",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);
                    playProjectileSound(this.selected1);
                }
                else if(pressingDown){
                    this.addToList(new playerProjectile(this.x+this.width/2,this.y+61,"down",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);
                    playProjectileSound(this.selected1);
                }
                else if(pressingUp){
                    this.addToList(new playerProjectile(this.x+this.width/2,this.y,"up",this.selected1));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);
                    playProjectileSound(this.selected1);
                }
                else{
                    if(this.facing=="right"){
                        this.addToList(new playerProjectile(this.x+61,this.y+this.height/2,"right",this.selected1));
                        this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);  
                        playProjectileSound(this.selected1);
                    }
                    else{
                        this.addToList(new playerProjectile(this.x,this.y+this.height/2,"left",this.selected1));
                        this.cooldown=this.cooldown+getProjectileCooldown(this.selected1);  
                        playProjectileSound(this.selected1);
                    }
                }
            }
            else if(pressingPower2==true){
                if(pressingLeft){
                    this.addToList(new playerProjectile(this.x,this.y+this.height/2,"left",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);
                    playProjectileSound(this.selected2);
                }
                else if(pressingRight){
                    this.addToList(new playerProjectile(this.x+61,this.y+this.height/2,"right",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);
                    playProjectileSound(this.selected2);
                }
                else if(pressingDown){
                    this.addToList(new playerProjectile(this.x+this.width/2,this.y+61,"down",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);
                    playProjectileSound(this.selected2);
                }
                else if(pressingUp){
                    this.addToList(new playerProjectile(this.x+this.width/2,this.y,"up",this.selected2));
                    this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);
                    playProjectileSound(this.selected2);
                }
                else{
                    if(this.facing=="right"){
                        this.addToList(new playerProjectile(this.x+61,this.y+this.height/2,"right",this.selected2));
                        this.cooldown=this.cooldown+getProjectileCooldown(this.selected1); 
                        playProjectileSound(this.selected2); 
                    }
                    else{
                        this.addToList(new playerProjectile(this.x,this.y+this.height/2,"left",this.selected2));
                        this.cooldown=this.cooldown+getProjectileCooldown(this.selected2);  
                        playProjectileSound(this.selected2);
                    }
                }
            }
        }else{
            this.cooldown=this.cooldown-1
        }
    }
    this.draw = function(){
        if(this.iframes%2==0){
            if(this.facing == "right"){
                var img = ImageAtlas[player_right];
                ctx.drawImage(
                    img, // image
                    256,  // target x
                    256, // target y
                    61, // target width
                    61 // target height
                );
            }
            else if(this.facing == "left"){
                var img = ImageAtlas[player_left];
                ctx.drawImage(
                    img, // image
                    256,  // target x
                    256, // target y
                    61, // target width
                    61 // target height
                );
            }
        }
    }
    this.collision = function(entityC){
        if(entityC.tags.includes("block")){
            sideColided=playercheckSide(this , entityC)
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
                console.log(this.hp);
                this.iframes=80;
                playASound("soundEffects/damageTaken.mp3");
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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        );   
    }
    this.collision = function(entityC){
    }
}
backgroundTile.prototype=Object.create(Entity.prototype);
backgroundTile.prototype.constructor =  backgroundTile;
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
    layer=0;
    Entity.call(this,x,y,id,layer,type,tags);
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
    id="enemy1";
    type="motion";
    layer=2;
    var tags=["damaging","enemy"];
    Entity.call(this,x,y,id,layer,type,tags);
    this.wentUp=false;
    this.yVel=0;
    this.hp=100;
    this.update = function(){
        distance=getDistance(this, game.currentLevelData.playerRef);
        if(distance<=500){
            this.wentUp=false;
            if(this.hp<=0){
                playASound("soundEffects/slimeEnemyDeath.mp3")
                this.remove();
            }
            this.yVel=this.yVel+1
            if(this.yVel>30){
                (this.yVel=30);
            }
            this.y=this.y+this.yVel;
            if(player.x-this.x <= 0){
                this.x=this.x-3;
            }
            else{
                this.x=this.x+3;
            }
        }
    }
    this.draw = function(){
        var img = ImageAtlas[this.id];
        ctx.drawImage(
            img, // image
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        ); 
    }
    this.collision = function(entityC){
        entitySide=checkSide(this,entityC);
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
                if(this.wentUp==false && game.currentLevelData.playerRef.y<=this.y+5){
                    this.y=this.y-15;
                    this.wentUp=true;
                }
                this.x=entityC.x+64;
            }
            if(sideColided=="right"){
                if(this.wentUp==false && game.currentLevelData.playerRef.y<=this.y+5){
                    this.y=this.y-15;
                    this.wentUp=true;
                }
                this.x=entityC.x-64;
            }
        }
        if(entityC.tags.includes("ladder")){
            if(game.currentLevelData.playerRef.y<=this.y){
                if(this.wentUp==false){
                    this.y=this.y-15;
                    this.wentUp=true;
                }
            }
            if(game.currentLevelData.playerRef.y>=this.y){
                this.y=this.y+5;
            }
            this.y=this.y+1;
        }
        if(entityC.id.includes("water")){
            if(game.currentLevelData.playerRef.y<=this.y){
                if(this.wentUp==false){
                    this.y=this.y-15;
                    this.wentUp=true;
                }
            }
        }
    }
}
enemy.prototype=Object.create(Entity.prototype);
enemy.prototype.constructor = enemy;

function dumbEnemy(x,y){
    this.width = 64;
    this.height = 64;
    id="enemy2";
    type="motion";
    layer=2;
    var tags=["damaging","enemy"];
    Entity.call(this,x,y,id,layer,type,tags);
    this.yVel=0;
    this.hp=100;
    this.update = function(){
        distance=getDistance(this, game.currentLevelData.playerRef);
        if(distance<=500){
            if(this.hp<=0){
                playASound("soundEffects/slimeEnemyDeath.mp3")
                this.remove();
            }
            this.yVel=this.yVel+1
            if(this.yVel>30){
                (this.yVel=30);
            }
            this.y=this.y+this.yVel;
            if(player.x-this.x <= 0){
                this.x=this.x-3;
            }
            else{
                this.x=this.x+3;
            }
        }
    }
    this.draw = function(){
        var img = ImageAtlas[this.id];
        ctx.drawImage(
            img, // image
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        ); 
    }
    this.collision = function(entityC){
        entitySide=checkSide(this,entityC);
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
            }
            if(sideColided=="right"){
                this.x=entityC.x-64;
            }
        }
        if(entityC.id=="ladder block"){
            this.y=this.y+1;
        }
    }
}
dumbEnemy.prototype=Object.create(Entity.prototype);
dumbEnemy.prototype.constructor = dumbEnemy;

//also includes player powers that are not projectiles.


function playerProjectile(x,y,direction,projectile){
    id=projectile;
    type="motion";
    layer=2;
    this.yVel=0;
    var tags=[];
    Entity.call(this,x,y,id,layer,type,tags);
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
        if(this.id=="fire ball"){
            if(this.direction=="down") this.y = this.y+12;
            else if(this.direction=="up") this.y = this.y-12;
            else if(this.direction=="left") this.x = this.x-12;
            else if(this.direction=="right") this.x = this.x+12;
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
                this.remove();
                playASound("soundEffects/medkitUse.mp3");
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
                playASound("soundEffects/explosion.mp3");
            }
            else{
                if(this.yVel<6){
                    this.yVel=this.yVel+1;
                }
                this.y=this.y+this.yVel;
                this.framesUp=this.framesUp+1;
            }
        }
        if(this.id=="explosion"){
            if(this.framesUp==126){
                this.remove();
            }
            this.framesUp=this.framesUp+1;
        }
        if(this.id=="fire ball2"){
            if(this.framesUp==5){
                this.remove()
            }
            else{
                this.framesUp=this.framesUp+1;
            }
        }
    }
    this.draw = function(){
        if(this.id=="magic missle"){
            var img = ImageAtlas[this.id];
            ctx.drawImage(
                img, // image
                256+(this.x-player.x) + deltaX,  // target x
                256+(this.y-player.y) + deltaY, // target y
                16, // target width
                16 // target height
            );
        }
        else if(this.id=="staff hit"){
            var img = ImageAtlas[slashKey];
            var deltaX = 0;
            var deltaY = -20;
            if(this.direction == "left"){
                deltaX = 20;
            }
            else if (this.direction == "right"){
                deltaX = -20;
            }
            ctx.drawImage(
                img, // image
                256+(this.x-player.x),  // target x
                256+(this.y-player.y), // target y
                8, // target width
                32 // target height
            );
        }
        else if(this.id=="bomb2"){
            ctx.fillStyle="#00008B";
            ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),this.width,this.height);
        }
        else if(this.id=="explosion"){
            ctx.fillStyle="#FF4500";
            ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),this.width,this.height);
        }
        else if(this.id=="fire ball"){
            ctx.fillStyle="#FF7F50"
            ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),this.width,this.height);
        }
        else if(this.id=="fire ball2"){
            ctx.fillStyle="#FF7F50"
            ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),this.width,this.height);
        }
    }
    this.collision = function(entityC){
        if(this.id=="magic missle"){
            if(entityC.tags.includes("enemy") || entityC.tags.includes("block")){
                playASound("soundEffects/magicMissleImpact.mp3")
                entityC.hp=entityC.hp-30;
                this.remove();
            }
        }
        if(this.id=="staff hit"){
            if(entityC.tags.includes("enemy")){
                entityC.hp=entityC.hp-2;
            }
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
                entityC.hp=entityC.hp-25;
            }
        }
        if(this.id=="fire ball"){
            if(entityC.tags.includes("enemy")){
                entityC.hp=entityC.hp-10;
                this.id="fire ball2";
                this.height=64;
                this.width=64;
                this.x=this.x-33
                this.y=this.y-28
                playASound("soundEffects/fireBallImpact.mp3");
            }
            else if(entityC.tags.includes("block")){
                this.id="fire ball2";
                this.height=64;
                this.width=64;
                this.y=this.y-33
                this.x=this.x-28
                playASound("soundEffects/fireBallImpact.mp3");
            }
        }
        if(this.id=="fire ball2"){
            if(entityC.tags.includes("enemy")){
                entityC.hp=entityC.hp-10;
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
    else if(projectile=="fire ball"){
        return 12;
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
    else if(projectile=="fire ball"){
        return 12;
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
    else if(projectile=="fire ball"){
        return 120;
    }
}

function playProjectileSound(projectile){
    if(projectile=="magic missle"){
        playASound("soundEffects/magicMissle.mp3");
    }
    if(projectile=="staff hit"){
        playASound("soundEffects/staffHit.mp3");
    }
    if(projectile=="fire ball"){
        playASound("soundEffects/fireBallCast.mp3")
    }
    else{

    }
}

playerProjectile.prototype=Object.create(Entity.prototype);
playerProjectile.prototype.constructor = playerProjectile;

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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
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

function turret(x,y){
    this.width = 64;
    this.height = 64;
    id="turret";
    type="motion";
    layer=2;
    var tags=["damaging","enemy"];
    Entity.call(this,x,y,id,layer,type,tags);
    this.cooldown=0;
    this.hp=100;
    this.update = function(){
        this.cooldown=this.cooldown-1;
        if(this.hp<=0){
            playASound("soundEffects/turretDeath.mp3");
            this.remove();
        }
        else{
            distance=getDistance(this,game.currentLevelData.playerRef);
            if(distance<=300){
                if(this.cooldown<=0){
                    playASound("soundEffects/turretFire.mp3");
                    a = game.currentLevelData.playerRef.x - this.x;
                    b = game.currentLevelData.playerRef.y - this.y;
                    this.addToList(new turretProjectile(this.x+32,this.y+32,a/distance,b/distance));
                    this.cooldown=100;
                }
            }
        }
    }
    this.draw = function(){
        var img = ImageAtlas[this.id];
        ctx.drawImage(
            img, // image
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
            64, // target width
            64 // target height
        );  
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

function turretProjectile(x,y,xDir,yDir){
    this.width = 8;
    this.height = 8;
    id="turret projectile";
    type="motion";
    layer=2;
    var tags=["damaging"];
    Entity.call(this,x,y,id,layer,type,tags);
    this.xVel=xDir*3;
    this.yVel=yDir*3;
    this.update = function(){
        this.x=this.x+this.xVel;
        this.y=this.y+this.yVel;
    }
    this.draw = function(){
        ctx.fillStyle="#ff0000";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),8,8);   
    }
    this.collision = function(entityC){
        if(entityC.tags.includes("block") || entityC.tags.includes("player")){
            this.remove();
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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
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

function endOfLevel(x,y){
    this.width = 64;
    this.height = 64;
    var tags=[];
    id="end";
    type="static";
    layer=0;
    Entity.call(this,x,y,id,layer,type,tags);
    this.update = function(){

    }
    this.draw = function(){
        ctx.fillStyle="#FFFF00";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
    }
    this.collision = function(entityC){
        if(!(typeof entityC === "undefined")){
            if(entityC.tags.includes("player")){
                playASound("soundEffects/levelCompletion.mp3");
                clearInterval(gameInterval);
                menuButton("Start Campaign");
                music.pause();
                music.currentTime=0;
                this.toggleFinish();
            }
        }
    }
}
endOfLevel.prototype=Object.create(Entity.prototype);
endOfLevel.prototype.constructor = endOfLevel;

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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
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
            256+(this.x-player.x),  // target x
            256+(this.y-player.y), // target y
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
    id="fireball pickup";
    type="static";
    layer=0;
    Entity.call(this,x,y,id,layer,type,tags);
    this.update = function(){
    
    }
    this.draw = function(){
        ctx.fillStyle="#FF7F50";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
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
        ctx.fillStyle="#FF00FF";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),64,64);   
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


////////menu GUI/////////

function playerMenu(player){
    this.player=player;
    //this.powers= player.powers;
    //this.inventory=player.inventory;
    this.selectorPower=0;
    this.selectorItems=0;
    this.menuCooldown=0;
    this.toggle=false;
    this.setPlayer = function(player){
        this.player=player;
    }
    this.update = function(){
        if(this.menuCooldown>0){
            this.menuCooldown=this.menuCooldown-1;
        }
        else{
            if(pressingDown){
                if(this.player.inventory.length != 0 && this.toggle==false){
                    this.toggle=true;
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventoryMove.mp3");
                }
            } 
            if(pressingUp){
                if(this.player.powers.length != 0 && this.toggle==true){
                    this.toggle=false;
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventoryMove.mp3");
                }
            }
            if(pressingLeft){
                if(this.toggle==false && this.selectorPower-1 >= 0){
                    this.selectorPower=this.selectorPower-1;
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventoryMove.mp3");
                }
                if(this.toggle==true && this.selectorItems-1 >= 0){
                    this.selectorItems=this.selectorItems-1;
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventoryMove.mp3");
                }
            }
            if(pressingRight){
                if((this.toggle==false) && (this.selectorPower+1 < this.player.powers.length)){
                    this.selectorPower=this.selectorPower+1;
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventoryMove.mp3");
                }
                if(this.toggle==true && this.selectorItems+1 < this.player.inventory.length/2){
                    this.selectorItems=this.selectorItems+1;
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventoryMove.mp3");
                }
            }
            if(pressingPower1){
                if(this.toggle==false){
                    this.player.selected1=this.player.powers[this.selectorPower];
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventorySet.mp3");
                }
                else{
                    this.player.selected1=this.player.inventory[this.selectorItems*2];
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventorySet.mp3");
                }
            }
            if(pressingPower2){
                if(this.toggle==false){
                    this.player.selected2=this.player.powers[this.selectorPower];
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventorySet.mp3");
                }
                else{
                    this.player.selected2=this.player.inventory[this.selectorItems*2];
                    this.menuCooldown=this.menuCooldown+10;
                    playASound("soundEffects/inventorySet.mp3");
                }
            }
        }
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
        for(i=0;i<this.player.powers.length;i++){
            if(this.player.powers[i]=="magic missle"){
                var img = ImageAtlas[magicMissileKey];
                    ctx.drawImage(
                    img, // image
                    128+20,  // target x
                    64+20, // target y
                    64, // target width
                    64 // target height
                );
            }
            else if(this.player.powers[i]=="staff hit"){
                var img = ImageAtlas[swordKey];
                    ctx.drawImage(
                    img, // image
                    64+20,  // target x
                    64+20, // target y
                    64, // target width
                    64 // target height
                );
            }
            else if(this.player.powers[i]=="fire ball"){
                var img = ImageAtlas[fireballKey];
                    ctx.drawImage(
                    img, // image
                    256+(this.x-player.x),  // target x
                    256+(this.y-player.y), // target y
                    16, // target width
                    16 // target height
                );
            }
        }
        for(i=0;i<this.player.inventory.length;i=i+2){
            if(this.player.inventory[i]=="med kit"){
                ctx.fillStyle="#505050";
                if(this.selectorItems==0 && this.toggle==true){
                    ctx.fillStyle="#FFFFFF";
                }
                var img = ImageAtlas[medkitKey];
                ctx.drawImage(
                    img, // image
                    64+20,  // target x
                    128+40, // target y
                    64, // target width
                    64 // target height
                );
                ctx.fillText(this.player.inventory[i+1],134,228);
            }
            if(this.player.inventory[i]=="bomb"){
                ctx.fillStyle="#505050";
                if(this.selectorItems==1 && this.toggle==true){
                    ctx.fillStyle="#FFFFFF";
                }
                var img = ImageAtlas[bombKey];
                ctx.drawImage(
                    img, // image
                    128+20,  // target x
                    128+40, // target y
                    64, // target width
                    64 // target height
                );
                ctx.fillText(this.player.inventory[i+1],202,228);
            }
        }
    }
}


