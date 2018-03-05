//Base Entity that all Entities inherient from


//Creates a unique ID for each entity created
function generateID(){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

Entity = function(x,y,id=-1){
    var self = {}

    //x,y positions on canvas
    self.x = x;
    self.y = y;

    //If no id is given, generate a new one
    if(id==-1){
        self.id = generateID();
    } 
    else{
        self.id = id;
    }

    //Updates the position of the entity 
    function newPos(nX,nY){
        self.x = nX;
        self.y = nY;
    }
}