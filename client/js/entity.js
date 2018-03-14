function Entity(x,y) {
    this.x=x;
    this.y=y;
}
//------------------
function player(x,y){
    Entity.call(this,x,y);
    this.width = 32;
    this.height = 32;
    this.id="player";
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
player.prototype=Object.create(Entity.prototype);
player.prototype.constructor = player;
//-------------------
function block(x,y){
    Entity.call(this,x,y);
    this.width = 32;
    this.height = 32;
    this.id="block";
    this.update = function(){
    }
    this.draw = function(){
        ctx.fillStyle="#000000";
        ctx.fillRect(250+(this.x-player.x),250+(this.y-player.y),32,32);   
    }
    this.collision = function(entityC){
        this.remove()
    }
}
//block.prototype.collision=function(entityC){
//    this.remove();
//}

block.prototype=Object.create(Entity.prototype);
block.prototype.constructor = block;
//------------------
function enemy1(x,y){
    Entity.call(this,x,y);
}
enemy1.prototype=Object.create(Entity.prototype);
enemy1.prototype.constructor = enemy1;

enemy1.prototype.update=function(){
    //console.log("SKELETON MAN");
    //console.log(this.x + " " + this.y);
    this.remove();
}
//-----------------
function enemy2(x,y){
    Entity.call(this,x,y);
}
enemy2.prototype=Object.create(Entity.prototype);
enemy2.prototype.constructor = enemy2;

enemy2.prototype.update=function(){
    //console.log("WIZARDO");
    this.remove();
}