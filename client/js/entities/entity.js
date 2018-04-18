// Every entity is a prototype of this one. This contains all the essential stuff that makes an entites.
// It also contains protoype methods that all entities share.
function Entity(x,y,id,layer,type,tags) {
    this.x=x;
    this.y=y;
    this.id=id;
    this.layer=layer;
    this.type=type;
    this.tags=tags;
}
// A static function that gets the distance from entityA and entityB. Used for enemy aggro
function getDistance(entityA, entityB){
    var a = entityA.x - entityB.x;
    var b = entityA.y - entityB.y;
    return Math.sqrt( a*a + b*b );
}
// A basic play a sound function I use to play a sound. Seen alot throught the other entities.
function playASound(soundFile){
    var audio = new Audio(soundFile);
    audio.play();
}
