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
    var layer=2
    var type="motion"
    Entity.call(this,x,y,id,src,layer,type);
    this.width = 32;
    this.height = 32;
    
    this.cooldown=0;
    this.update = function(){
        if(pressingDown) this.y = this.y+15;
        if(pressingUp) this.y = this.y-15;
        if(pressingLeft) this.x = this.x-15;
        if(pressingRight) this.x = this.x+15;
        this.y=this.y+2
        if(this.cooldown==0){
            if(pressingPower1==true){
                console.log("Shblam");
                this.create(new magicMissle(this.x,this.y));
                this.cooldown=this.cooldown+30
            }
            else if(pressingPower2==true){
                console.log("Shblaaaaaaammo");
                this.cooldown=this.cooldown+60
            }
        }else{
            this.cooldown=this.cooldown-1
        }
    }
    this.draw = function(){
        ctx.fillStyle="#FF0000";
        ctx.fillRect(250,250,32,32);
    }
    this.collision = function(entityC){
        entitySide=checkSide(this,entityC);
        if(entityC.id="block"){
            sideColided=checkSide(this , entityC)
            console.log(this.id + " " + sideColided);
            if(sideColided=="bottom"){
                this.y=entityC.y-32;
            }
            if(sideColided=="top"){
                this.y=entityC.y+32;
            }
            if(sideColided=="left"){
                this.x=entityC.x+32;
            }
            if(sideColided=="right"){
                this.x=entityC.x-32;
            }
        }
    }
} 
playerChar.prototype=Object.create(Entity.prototype);
playerChar.prototype.constructor = playerChar;
playerChar.prototype.update=function(){
    this.remove();
}

//-------------------

//
//  ENVIROMENT TILES
//
function grassTile(x,y,layer){
    var id = 'grass';
    var src = 'images/enviroment/tempGrass.png';
    var layer=1
    var type="static"
    Entity.call(this,x,y,id,src,layer,type);
}
grassTile.prototype=Object.create(Entity.prototype);
grassTile.prototype.constructor =  grassTile;
grassTile.prototype.update=function(){
    this.remove();
}
//-------------
function dirtTile(x,y,layer){
    var id = 'dirt';
    var src = 'images/enviroment/tempDirt.png';
    var layer=1
    var type="static"
    Entity.call(this,x,y,id,src,layer,type);
}
dirtTile.prototype=Object.create(Entity.prototype);
dirtTile.prototype.constructor =  dirtTile;
dirtTile.prototype.update=function(){
    this.remove();
}
//
//  END ENVIROMENT TILES
//

//
//  TEST ENTITY
//
block.prototype=Object.create(Entity.prototype);
block.prototype.constructor = playerChar;
function block(x,y){
    this.width = 32;
    this.height = 32;
    id="block";
    type="static";
    layer=1
    src="block url"
    Entity.call(this,x,y,id,src,layer,type);
    this.update = function(){
    }
    this.draw = function(){
        ctx.fillStyle="#000000";
        ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),32,32);   
    }
    this.collision = function(entityC){
        //this.remove();
    }
}
magicMissle.prototype=Object.create(Entity.prototype);
magicMissle.prototype.constructor = magicMissle;
function magicMissle(x,y){
    this.width = 8;
    this.height = 8;
    id="bullet";
    type="motion";
    layer=1
    src="bullet url"
    Entity.call(this,x,y,id,src,layer,type);
    this.update = function(){
        this.x=this.x+3;
    }
    this.draw = function(){
        ctx.fillStyle="#1218E2";
        ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),8,8);   
    }
    this.collision = function(entityC){
        this.remove();
    }
}
