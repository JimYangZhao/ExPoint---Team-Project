staticEntityList=[];
motionEntityList=[];
backgroundList=[];
motionEntityList.push(new playerChar(128,1216));
for(i=0;i<70;i++){
    for(j=0;j<31;j++){
        backgroundList.push(new backgroundTile(i*64,j*64-640,sky1Key))
    }
}

//grass floor
for(i=0;i<70;i++){
    if(i >= 21 && i <= 24){
        backgroundList.push(new backgroundTile(i*64,1280,dirt1Key));
    }
    if(i>=12 && i <= 16){
        staticEntityList.push(new enviromentTile(i*64,1280,grass2Key));
    }
    else if(i >=31){
        staticEntityList.push(new enviromentTile(i*64,1280,grass2Key));
    }
    else{
        staticEntityList.push(new enviromentTile(i*64,1280,grass1Key));
    }
}
//dirt under floor
for(i=0;i<70;i++){
    for(j=0;j<6;j++){
        staticEntityList.push(new enviromentTile(i*64,1344  +j*64,grass2Key));
    }
}
//left wall
for(i=0;i<6;i++){
    for(j=0;j<25;j++){
        staticEntityList.push(new enviromentTile(i*64-(384),1536+j*-64,grass2Key));
    }
}
//right wall
for(i=0;i<6;i++){
    for(j=0;j<25;j++){
        staticEntityList.push(new enviromentTile(i*64+(4480),1536+j*-64,grass2Key));
    }
}
//area between left and right wall

//player starts on i=3,j=19
for(i=0;i<70;i++){
    for(j=0;j<20;j++){
        if(i >=12 && i <= 16){
            if(j > 16){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
            }
            if(j==16){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
        }
        if(i==11){
            if(j>=16){
                staticEntityList.push(new ladderBlock(i*64,j*64));
            }
        }
        if(i==25){
            if(j==15){
                staticEntityList.push(new medKit(i*64,j*64));
            }
        }
        if(i >= 21 && i <= 24){
            if(j==7){
                if(i==22 || i==23){
                    staticEntityList.push(new bombPickup(i*64,j*64));
                }
            }
            if(j==8){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
            if(j>= 9){
                backgroundList.push(new enviromentTile(i*64,j*64,dirt1Key));
            }
        }
        if(i==19 || i==22 || i==25 || i==28){
            if(j==16){
                staticEntityList.push(new enviromentTile(i*64,j*64,rock1Key));
            }
        }
        if(i==21){
            if(j==19){
                motionEntityList.push(new enemy(i*64,j*64));
            }
        }
        if(i==23){
            if(j==19){
                motionEntityList.push(new dumbEnemy(i*64,j*64));
            }
        }
        if(i >=31 && i <= 35){
            if(j==1){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
            if(j > 16){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
            }
            if(j==16){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
            if(j>=2){
                backgroundList.push(new backgroundTile(i*64,j*64,dirt1Key));
            }
        }
        if(i == 30){
            if(j>=16){
                staticEntityList.push(new ladderBlock(i*64,j*64));
            }
        }
        if(i >= 36 && i<= 40){
            if(j>=2 && j<= 16){
                staticEntityList.push(new waterBlock(i*64,j*64));
            }
            if(j>=17){
                staticEntityList.push(new waterBlock2(i*64,j*64));
            }
        }
        if(i==41){
            if(j==1){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key))
            }
            if(j>=2 && j<= 16){
                if(j%4==0){
                    motionEntityList.push(new turret(i*64,j*64));
                }
                else{
                    staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
                }
            }
            if(j>=14){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
            }
            if(j<=16){
                backgroundList.push(new backgroundTile(i*64,j*64,dirt1Key));
            }
        }
        if(i>=42 && i<=46){
            if(j>=2){
                backgroundList.push(new backgroundTile(i*64,j*64,dirt1Key));
            }
            if(j==11 ||j==12||j==13){
                if(j==13 && i!=46){
                    staticEntityList.push(new bombPickup(i*64,j*64));
                }
            }
            else if(j==1){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
            else if(j>=2){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
            }
        }
        if(i==43){
            if(j==0){
                staticEntityList.push(new checkPoint(i*64,j*64));
            }
        }
        if(i==45){
            if(j==0){
                staticEntityList.push(new fireBallPickup(i*64,j*64));
            }
        }
        if(i==46 || i==47){
            if(j==1){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
            if(j>=2){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
            }
        }
        if(i>=48 && i<=52){
            if(i==48){
                if(j<19){
                    staticEntityList.push(new ladderBlock(i*64,j*64));
                }
            }
            if(j==19){
                staticEntityList.push(new spikeBlock(i*64,j*64));
                backgroundList.push(new backgroundTile(i*64,j*64,dirt1Key);
            }
        }
        if(i>=53 && i<=57){
            if(j==14){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
            if(j>=15){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
            }
        }
        if(i>=58 && i<=67){
            if(j==9){
                if(i==61 || i==64){
                    motionEntityList.push(new turret(i*64,j*64));
                }
            }
            if(j==14){
                if(i==61 || i==64){
                    staticEntityList.push(new enviromentTile(i*64,j*64,rock1Key));
                }
            }
            if(j>=15){
                staticEntityList.push(new lavaBlock(i*64,j*64));
            }
        }
        if(i>=68){
            if(j==14){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass1Key));
            }
            if(j>=15){
                staticEntityList.push(new enviromentTile(i*64,j*64,grass2Key));
            }
            if(i==69){
                if(j==13){
                    staticEntityList.push(new endOfLevel(i*64,j*64));
                }
            }
        }
        if(i==41){
            if(j==0 || j==1||j==2 || j==3){
                backgroundList.push(new backgroundTile(i*64,j*64,sky1Key));
            }
        }
    }
}
level1 = new levelData(motionEntityList,staticEntityList,backgroundList);