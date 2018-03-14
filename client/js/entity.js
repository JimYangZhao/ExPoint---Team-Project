function Entity(x,y,id,src) {
    this.x=x;
    this.y=y;
    this.id=id;
    this.src=src;
}

//------------------
function Enemy1(x,y){
    Entity.call(this,x,y);
}
Enemy1.prototype=Object.create(Entity.prototype);
Enemy1.prototype.constructor = Enemy1;

Enemy1.prototype.update=function(){
    //console.log("SKELETON MAN");
    //console.log(this.x + " " + this.y);
    this.remove();
}
//-----------------
function Enemy2(x,y){
    Entity.call(this,x,y);
}
Enemy2.prototype=Object.create(Entity.prototype);
Enemy2.prototype.constructor = Enemy2;

Enemy2.prototype.update=function(){
    //console.log("WIZARDO");
    this.remove();
}

//
//  ENVIROMENT TILES
//
function grassTile(x,y){
    var id = 'grass';
    var src = 'images/enviroment/tempGrass.png';
    Entity.call(this,x,y,id,src);
}
grassTile.prototype=Object.create(Entity.prototype);
grassTile.prototype.constructor =  grassTile;
grassTile.prototype.update=function(){
    this.remove();
}
//-------------
function dirtTile(x,y){
    var id = 'dirt';
    var src = 'images/enviroment/tempDirt.png';
    Entity.call(this,x,y,id,src);
}
dirtTile.prototype=Object.create(Entity.prototype);
dirtTile.prototype.constructor =  dirtTile;
dirtTile.prototype.update=function(){
    this.remove();
}
//
//  END ENVIROMENT TILES
//




/*
var gamestate = { activeList: [] };

Entity.prototype.remove = function(){
    var i = gamestate.activeList.indexOf(this);
    gamestate.activeList.splice(i,1);
}
*/