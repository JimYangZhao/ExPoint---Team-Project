staticEntityList=[];
motionEntityList=[];
backgroundList=[];
motionEntityList.push(new playerChar(128,1216));
//grass floor
for(i=0;i<70;i++){
    if(i>=12 && i <= 16){
        staticEntityList.push(new enviromentTile(i*64,1280,"grass2"));
    }
    else{
        staticEntityList.push(new enviromentTile(i*64,1280,"grass"));
    }
}
//dirt under floor
for(i=0;i<70;i++){
    for(j=0;j<6;j++){
        staticEntityList.push(new enviromentTile(i*64,1344  +j*64,"grass2"));
    }
}
//left wall
for(i=0;i<6;i++){
    for(j=0;j<25;j++){
        staticEntityList.push(new enviromentTile(i*64-(384),1536+j*-64,"grass2"));
    }
}
//right wall
for(i=0;i<6;i++){
    for(j=0;j<25;j++){
        staticEntityList.push(new enviromentTile(i*64+(4480),1536+j*-64,"grass2"));
    }
}
//area between left and right wall

//player starts on i=3,j=19
for(i=0;i<70;i++){
    for(j=0;j<20;j++){
        if(i >=12 && i <= 16){
            if(j > 16){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
            if(j==16){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
            }
        }
        if(i==11){
            if(j>=16){
                staticEntityList.push(new ladderBlock(i*64,j*64));
            }
        }
        if(i==19,22,25,27){
            if(j==16){
                staticEntityList.push(new enviromentTile(i*64,j*64,rock1Key));
            }
        }
    }
}
level1 = new levelData(motionEntityList,staticEntityList,backgroundList);