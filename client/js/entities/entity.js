function Entity(x,y,id,layer,type,tags) {
    this.x=x;
    this.y=y;
    this.id=id;
    this.layer=layer;
    this.type=type;
    this.tags=tags;
}

function getDistance(entityA, entityB){
    var a = entityA.x - entityB.x;
    var b = entityA.y - entityB.y;
    return Math.sqrt( a*a + b*b );
}

function playASound(soundFile){
    var audio = new Audio(soundFile);
    audio.play();
}
