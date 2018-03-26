function Entity(x,y,id,src,layer,type) {
    this.x=x;
    this.y=y;
    this.id=id;
    this.src=src;
    this.layer=layer;
    this.type=type;
}



//------------------

function playerChar(x,y,layer){
    var id="player";
    var src="images/player/player.png";
    var layer=2;
    var type="motion";
    Entity.call(this,x,y,id,src,layer,type);
    this.width = 60;
    this.height = 60;
    this.yVel=0;
    this.hp=10;
    this.iframes=0;
    this.cooldown=0;
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
                //console.log("Shblam");
                if(pressingLeft){
                    this.addToList(new magicMissle(this.x,this.y,"left"));
                    this.cooldown=this.cooldown+50;
                }
                else if(pressingRight){
                    this.addToList(new magicMissle(this.x+60,this.y,"right"));
                    this.cooldown=this.cooldown+50;
                }
                else if(pressingDown){
                    this.addToList(new magicMissle(this.x,this.y-60,"down"));
                    this.cooldown=this.cooldown+50;
                }
                else if(pressingUp){
                    this.addToList(new magicMissle(this.x,this.y,"up"));
                    this.cooldown=this.cooldown+50;
                }
                else{
                    this.addToList(new magicMissle(this.x+60,this.y,"right"));
                    this.cooldown=this.cooldown+50;    
                }
            }
            else if(pressingPower2==true){
                //console.log("Shblaaaaaaammo");
                this.cooldown=this.cooldown+60
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
            250,  // target x
            250, // target y
            61, // target width
            61 // target height
        );
    }
    this.collision = function(entityC){
        entitySide=checkSide(this,entityC);
        if(entityC.tag=="block"){
            sideColided=checkSide(this , entityC)
            //console.log(this.id + " " + sideColided);
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
        if(entityC.id=="enemy"){
            if(this.iframes==0){
                this.hp=this.hp-1;
                console.log(this.hp);
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
    var src = 'images/enviroment/tempGrass.png';
    var layer=1;
    var type="static";
    this.tag="block";
    this.width = 64;
    this.height = 64;
    Entity.call(this,x,y,id,src,layer,type);
    this.update = function(){
    }
    this.draw = function(){
        // ctx.fillStyle="#000000";
        // ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),64,64);
        var img = LevelEditor.tileAtlas[this.id];
        ctx.drawImage(
            img, // image
            250+(this.x-player.x),  // target x
            250+(this.y-player.y), // target y
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
    this.tag="block";
    this.width = 64;
    this.height = 64;
    Entity.call(this,x,y,id,src,layer,type);
    this.update = function(){
    }
    this.draw = function(){
        // ctx.fillStyle="#000000";
        // ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),64,64);
        var img = LevelEditor.tileAtlas[this.id];
        ctx.drawImage(
            img, // image
            250+(this.x-player.x),  // target x
            250+(this.y-player.y), // target y
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
//
//  END ENVIROMENT TILES
//

//
//  TEST ENTITY
//
block.prototype=Object.create(Entity.prototype);
block.prototype.constructor = playerChar;
function block(x,y){
    this.width = 64;
    this.height = 64;
    id="block";
    type="static";
    layer=1
    src="block url";
    var tag="block";
    Entity.call(this,x,y,id,src,layer,type);
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

//magic missle data

magicMissle.prototype=Object.create(Entity.prototype);
magicMissle.prototype.constructor = magicMissle;
function magicMissle(x,y,direction){
    this.width = 8;
    this.height = 8;
    this.direction=direction;
    id="bullet";
    type="motion";
    layer=1
    src="bullet url"
    Entity.call(this,x,y,id,src,layer,type);
    this.update = function(){
        if(this.direction=="down") this.y = this.y+15;
        else if(this.direction=="up") this.y = this.y-15;
        else if(this.direction=="left") this.x = this.x-15;
        else if(this.direction=="right") this.x = this.x+15;
    }
    this.draw = function(){
        ctx.fillStyle="#1218E2";
        ctx.fillRect(256+(this.x-player.x),256+(this.y-player.y),8,8);   
    }
    this.collision = function(entityC){
        this.remove();
    }
}

enemy.prototype=Object.create(Entity.prototype);
enemy.prototype.constructor = enemy;
function enemy(x,y){
    this.width = 64;
    this.height = 64;
    id="enemy";
    type="motion";
    layer=1
    src="enemy url"
    Entity.call(this,x,y,id,src,layer,type);
    this.yVel=0;
    this.hp=6;
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
        if(entityC.id=="bullet"){
            this.hp=this.hp-1;
        }
        if(entityC.id=="block"){
            sideColided=checkSide(this , entityC)
            //console.log(this.id + " " + sideColided);
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
    }
}
