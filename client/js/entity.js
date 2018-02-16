//Base Entity that all Entities inherient from

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
    if(id==-1){
        self.id = generateID();
    } 
    else{
        self.id = id;
    }
}