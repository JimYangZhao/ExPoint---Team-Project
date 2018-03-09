//Base Entity that all Entities inherient from


//Creates a unique ID for each entity created
//function generateID(){
//    function s4() {
//        return Math.floor((1 + Math.random()) * 0x10000)
//          .toString(16)
//          .substring(1);
//      }
//      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//       s4() + '-' + s4() + s4() + s4();
//}

Entity = function(x,y,id){
    var self = {}

    //x,y positions
    self.x = x;
    self.y = y;
    self.id=id;

    //If no id is given, generate a new one
    //if(id==-1){
    //    self.id = generateID();
    //} 
    //else{
    //    self.id = id;
    //}

    //Updates the position of the entity 
    //function newPos(nX,nY){
    //    self.x = nX;
    //    self.y = nY;
    //}
}

motionEntity = function(x,y,id,velX,velY){

    self = entity(x,y,id);

    self.velX = velX;
    self.velY = velY;

    function update(){
        
    }
};