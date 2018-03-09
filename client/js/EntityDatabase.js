//Defines our entites

//Base Entity
function Entity(xPos,yPos) {
    var self = {};
    self.x = xPos;
    self.y = yPos;

    self.update = function(){
        console.log("Update Entity");
    }
}

//Enviroment Entities
function grassTile(xPos,yPos) {
    var self = Entity(xPos,yPos);
    self.x = xPos;
    self.y = yPos;

    self.update = function(){
        console.log("Update Grass Tile");
    }
}

window.onload = function(){

    var newTile = new grassTile(50,50);
    newTile.update();
    console.log(newTile.x);
};




var dirtTile = function(x,y){
    this.name = "dirt";
    this.x = x;
    this.y = y;
    this.sprite = 'images/enviroment/tempDirt.png';
};