function Entity(x,y) {
    this.x=x;
    this.y=y;
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
/*
var gamestate = { activeList: [] };

Entity.prototype.remove = function(){
    var i = gamestate.activeList.indexOf(this);
    gamestate.activeList.splice(i,1);
}
*/