staticEntityList=[];
motionEntityList=[];
backgroundList=[];
staticEntityList.push(new block(0-64*1,128));
staticEntityList.push(new fireBallPickup(0-64*1,128-64));
staticEntityList.push(new block(0-64*2,128));
staticEntityList.push(new bombPickup(0-64*2,128-64));
staticEntityList.push(new block(0-64*3,128));
staticEntityList.push(new block(0-64*4,128));
staticEntityList.push(new block(0-64*5,128));
staticEntityList.push(new block(0,128));
staticEntityList.push(new block(64,128));

staticEntityList.push(new block(128,128));
staticEntityList.push(new block(128,64));

/*
staticEntityList.push(new block(128,64-64*1));
staticEntityList.push(new block(128,64-64*2));
staticEntityList.push(new block(128,64-64*3));
staticEntityList.push(new block(128,64-64*4));
*/

staticEntityList.push(new block(128+64*1,128));
staticEntityList.push(new block(128+64*2,128));
staticEntityList.push(new block(128+64*3,128));
staticEntityList.push(new block(128+64*4,128));
staticEntityList.push(new ladderBlock(128+64*4,128-64*1));
staticEntityList.push(new ladderBlock(128+64*4,128-64*2));
staticEntityList.push(new ladderBlock(128+64*4,128-64*3));
staticEntityList.push(new waterBlock(128+64*4,128-64*4));
staticEntityList.push(new waterBlock(128+64*4,128-64*5));
staticEntityList.push(new waterBlock(128+64*4,128-64*6));
staticEntityList.push(new block(128+64*5,128));
staticEntityList.push(new block(128+64*6,128));
staticEntityList.push(new checkPoint(128+64*6,128-64));
staticEntityList.push(new block(128+64*7,128));
staticEntityList.push(new block(128+64*7,128-64));
staticEntityList.push(new block(128+64*7,128-128));
staticEntityList.push(new block(128+64*8,128));
staticEntityList.push(new block(128+64*9,128));
staticEntityList.push(new medKit(128+64*8,128-64))
<<<<<<< HEAD
staticEntityList.push(new lavaBlock(128+64*10,128));
staticEntityList.push(new lavaBlock(128+64*11,128));
staticEntityList.push(new lavaBlock(128+64*12,128));
staticEntityList.push(new lavaBlock(128+64*13,128));
staticEntityList.push(new block(128+64*14,128));
motionEntityList.push(new turret(128+64*14,128-64));
motionEntityList.push(new endOfLevel(128+64*14,128-128));
=======
staticEntityList.push(new harmfulBlock(128+64*10,128));
staticEntityList.push(new harmfulBlock(128+64*11,128));
staticEntityList.push(new harmfulBlock(128+64*12,128));
staticEntityList.push(new harmfulBlock(128+64*13,128));
staticEntityList.push(new block(128+64*14,128));
motionEntityList.push(new turret(128+64*14,128-64));
>>>>>>> 26d045135b5c7c9ff4cba150f706cae4b36623b9
motionEntityList.push(new enemy(250,0));
motionEntityList.push(new playerChar(0,0));
backgroundList.push(new block(-300,-300));
level1 = new levelData(motionEntityList,staticEntityList,backgroundList);