function levelData(motionList, staticList, backgroundList) {
    this.staticEntityList = staticList;
    this.motionEntityList = motionList;
    this.backgroundList = backgroundList;
    this.playerRef = findPlayer(this);
};

var findPlayer = function(level){
    //Finds the player in the motionLayer and creates a reference
    for(i=0;i<level.motionEntityList.length;i++){
        if(level.motionEntityList[i].id=="player"){
            return level.motionEntityList[i];
        }
    }
};