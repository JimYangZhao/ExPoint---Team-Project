//The level data structure that the GAME uses to run a Level. It consists of three lists: a static list(stationary but have collision functions), 
// motion list(moving objects that likely have collision functions), and background(objects that do not move or have collision properties)
function levelData(motionList, staticList, backgroundList) {
    this.staticEntityList = staticList;
    this.motionEntityList = motionList;
    this.backgroundList = backgroundList;
    this.playerRef = findPlayer(this);
};

var findPlayer = function(level){
    //Finds the player in the motionLayer and creates a reference.
    for(i=0;i<level.motionEntityList.length;i++){
        if(level.motionEntityList[i].id=="player"){
            return level.motionEntityList[i];
        }
    }
};
//how Levels are structured in the level editor
function editorLevel(i,c,r,ts,l,pPos,u) {
    this.id = i;
    this.cols = c;
    this.rows = r;
    this.tsize = ts;
    this.layers = l;
    this.playerPos = pPos;
    this.user = u;
};

//Load level from dbWrapper.js
var loadLevel = function(lvlId){
    sendToDB("loadLevel",lvlId);
}

//Called when level is returned from DB
var levelIsLoaded = function(levelDat){
    displayLvlInEditor(levelDat);
}