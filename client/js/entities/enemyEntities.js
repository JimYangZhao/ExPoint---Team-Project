// The js file that contains the code for enemies. Note the use of prototype functions remove() and addToList(entity), that can be found in the game engine js file.

// This is the standard "smart" enemy. It really only chooses to go left and right. It follows the the player 
//    as presented by its collision function. It chooses to jump if a block is in its way. It chooses to ascend 
//    and descend if it is on a block that allows that kind of movement. The player is tracked using the reference in the level object.
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
    this.flashFrames=0;
    this.facing="left";
    this.update = function(){
        this.wentUp=false;
        if(this.flashFrames>0){
            this.flashFrames=this.flashFrames-1;
        }
        distance=getDistance(this, game.currentLevelData.playerRef);
        if(this.hp<=0){
            playASound("soundEffects/slimeEnemyDeath.mp3")
            this.remove();
        }
        if(distance<=500){
            this.yVel=this.yVel+1
            if(this.yVel>30){
                (this.yVel=30);
            }
            this.y=this.y+this.yVel;
            if(player.x-this.x <= 0){
                this.x=this.x-3;
                this.facing="left";
            }
            else{
                this.x=this.x+3;
                this.facing="right";
            }
        }
    }
    this.draw = function(){
        if(this.flashFrames%2==0){
            if(this.facing=="left"){
                var img = ImageAtlas[this.id];
                ctx.drawImage(
                    img, // image
                    600+(this.x-player.x),  // target x
                    330+(this.y-player.y), // target y
                    64, // target width
                    64 // target height
                );
            }
            else{
                var img = ImageAtlas[enemy1RKey];
                ctx.drawImage(
                    img, // image
                    600+(this.x-player.x),  // target x
                    330+(this.y-player.y), // target y
                    64, // target width
                    64 // target height
                );
            } 
        }
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

// Same as the smart enemy, though when it collides with an object, chooses not to use it.
function dumbEnemy(x,y){
    this.width = 64;
    this.height = 64;
    id="enemy2";
    type="motion";
    layer=2;
    var tags=["damaging","enemy"];
    Entity.call(this,x,y,id,layer,type,tags);
    this.facing="left"
    this.yVel=0;
    this.hp=100;
    this.flashFrames=0;
    this.update = function(){
        if(this.flashFrames>0){
            this.flashFrames=this.flashFrames-1;
        }
        distance=getDistance(this, game.currentLevelData.playerRef);
        if(this.hp<=0){
            playASound("soundEffects/slimeEnemyDeath.mp3")
            this.remove();
        }
        if(distance<=500){
            this.yVel=this.yVel+1
            if(this.yVel>30){
                (this.yVel=30);
            }
            this.y=this.y+this.yVel;
            if(player.x-this.x <= 0){
                this.x=this.x-3;
                this.facing="left";
            }
            else{
                this.x=this.x+3;
                this.facing="right";
            }
        }
    }
    this.draw = function(){
        if(this.flashFrames%2==0){
            if(this.facing=="left"){
                var img = ImageAtlas[this.id];
                ctx.drawImage(
                    img, // image
                    600+(this.x-player.x),  // target x
                    330+(this.y-player.y), // target y
                    64, // target width
                    64 // target height
                ); 
            }
            else{
                var img = ImageAtlas[enemy2RKey];
                ctx.drawImage(
                    img, // image
                    600+(this.x-player.x),  // target x
                    330+(this.y-player.y), // target y
                    64, // target width
                    64 // target height
                );
            }
        }
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

// The turret enemy. It fires a projectile at stuff within its firing range. 
//    It is also a block, so players cant pass through it.

function turret(x,y){
    this.width = 64;
    this.height = 64;
    id="turret";
    type="motion";
    layer=2;
    var tags=["damaging","enemy","block"];
    Entity.call(this,x,y,id,layer,type,tags);
    this.cooldown=0;
    this.hp=100;
    this.flashFrames=0;
    this.update = function(){
        if(this.flashFrames>0){
            this.flashFrames=this.flashFrames-1;
        }
        this.cooldown=this.cooldown-1;
        if(this.hp<=0){
            playASound("soundEffects/turretDeath.mp3");
            this.remove();
        }
        else{
            distance=getDistance(this,game.currentLevelData.playerRef);
            if(distance<=330){
                if(this.cooldown<=0){
                    playASound("soundEffects/turretFire.mp3");
                    a = game.currentLevelData.playerRef.x - this.x;
                    b = game.currentLevelData.playerRef.y - this.y;
                    this.addToList(new turretProjectile(this.x+32,this.y+32,a/distance,b/distance,this));
                    this.cooldown=100;
                }
            }
        }
    }
    this.draw = function(){
        if(this.flashFrames%2==0){
            var img = ImageAtlas[this.id];
            ctx.drawImage(
                img, // image
                600+(this.x-player.x),  // target x
                330+(this.y-player.y), // target y
                64, // target width
                64 // target height
            );
        }
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

// A turretn Projectile. Its paramaters are used to determine its x and y velocity
function turretProjectile(x,y,xDir,yDir,turret){
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
        if(
            getDistance(this,turret)>=400){
            this.remove();
        }
        this.x=this.x+this.xVel;
        this.y=this.y+this.yVel;
    }
    this.draw = function(){
        ctx.fillStyle="#ff0000";
        ctx.fillRect(600+(this.x-player.x),330+(this.y-player.y),8,8);   
    }
    this.collision = function(entityC){
        if(entityC.tags.includes("player")){
            this.remove();
        }
    }
}
turretProjectile.prototype=Object.create(Entity.prototype);
turretProjectile.prototype.constructor = turretProjectile;

// The slime boss is an enemy that behaves like a normal dumb enemy, but it 
//  splits into greater number upon being defeated, until it is too small.

function slimeBoss(x,y){
    this.width = 128;
    this.height = 128;
    id="slimeBoss";
    type="motion";
    layer=2;
    var tags=["damaging","enemy"];
    Entity.call(this,x,y,id,layer,type,tags);
    this.yVel=0;
    this.hp=150;
    this.timesSplit=0;
    this.flashFrames=0;
    this.update = function(){
        if(this.flashFrames>0){
            this.flashFrames=this.flashFrames-1;
        }
        distance=getDistance(this, game.currentLevelData.playerRef);
        if(this.hp<=0){
            playASound("soundEffects/slimeEnemyDeath.mp3")
            if(this.timesSplit==3){
                this.remove();
            }
            else{
                newSlime1=new slimeBoss(this.x,this.y);
                newSlime1.timesSplit=this.timesSplit+1;
                newSlime1.width=this.width-20;
                newSlime1.height=this.height-20;
                newSlime2=new slimeBoss(this.x+this.width,this.y);
                newSlime2.timesSplit=this.timesSplit+1;
                newSlime2.width=this.width-20;
                newSlime2.height=this.height-20;
                this.addToList(newSlime1);
                this.addToList(newSlime2);
                this.remove();
            }
        }
        if(distance<=700){
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
        if(this.flashFrames%2==0){
            var img = ImageAtlas[this.id];
            ctx.drawImage(
                img, // image
                600+(this.x-player.x),  // target x
                330+(this.y-player.y), // target y
                this.width, // target width
                this.height // target height
            ); 
        }
    }
    this.collision = function(entityC){
        entitySide=checkSide(this,entityC);
        if(entityC.tags.includes("block")){
            sideColided=checkSide(this , entityC)
            if(sideColided=="bottom"){
                this.y=entityC.y-this.height;
                this.yVel=0;
            }
            if(sideColided=="top"){
                this.y=entityC.y+this.height;
            }
            if(sideColided=="left"){
                this.x=entityC.x+this.width;
            }
            if(sideColided=="right"){
                this.x=entityC.x-this.width;
            }
        }
        if(entityC.tags.includes("ladder")){
            this.y=this.y+2;
        }
    }
}
slimeBoss.prototype=Object.create(Entity.prototype);
slimeBoss.prototype.constructor = slimeBoss;