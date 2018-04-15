//Handle's the creation of objects(entities) from raw data 

fillLayers = function(layerDat,rows,cols){

    var layer = initLayer(rows,cols);
    for(var l in layerDat){
        for(var y in layerDat[l]){
            for(var x in layerDat[l][y]){

                var entityDat = layerDat[l][y][x];

                if(entityDat != null && entityDat != 0){
                    layer[l][y][x] = createEntity(entityDat);
                }
            }
        }
    }
    return layer;
}

initLayer = function(rows,cols){
    var layer = [[],[],[]];
    var numLayers = layer.length;
    for(var l = 0; l < numLayers;l++){
        for(var r = 0; r<rows; r++){
            var row = [];
            for(c = 0; c < cols; c++){
                row.push(0);
            }
            layer[l].push(row);
        }
    }
    return layer;
}

createEntity = function(dat){
    var id = dat['id'];
    var x = dat['x'];
    var y = dat['y'];
    var tile = null;

    if(id == null)
        console.log("ERROR: Entity data doesn't have an ID.");

    if(id == grass1Key){
        tile = new enviromentTile(x,y,id);
    }
    else if(id == dirt1Key){
        tile = new backgroundTile(x,y,id);
    }
    else if(id == grass2Key){
        tile = new enviromentTile(x,y,id);
    }
    else if(id == playerKey){
        tile = new playerChar(x,y);
    }
    else if(id == water1Key){
        tile = new waterBlock(x,y);
    }
    else if(id == lava1Key){
        tile = new lavaBlock(x,y);
    }
    else if(id == sky1Key){
        tile = new backgroundTile(x,y,id);
    }
    else if(id == cloud1Key){
        tile = new backgroundTile(x,y,id);
    }
    else if(id == ladder1Key){
        tile = new ladderBlock(x,y);
    }
    else if(id == rock1Key){
        tile = new enviromentTile(x,y,id);
    }
    else if(id == enemy1Key){
        tile = new enemy(x,y);
    }
    else if(id == enemy2Key){
        tile = new dumbEnemy(x,y);
    }
    else if(id == turretKey){
        tile = new turret(x,y);
    }
    else if(id == bombKey){
        tile = new bombPickup(x,y);
    }
    else if(id == medkitKey){
        tile = new medKit(x,y);
    }
    else if(id == spikeKey){
        tile = new spikeBlock(x,y);
    }
    else if(id == endOfLevelKey){
        tile = new endOfLevel(x,y);
    }
    else if(id == slimeBossKey){
        tile = new slimeBoss(x,y);
    }
    else if(id == checkpointKey){
        tile = new checkPoint(x,y);
    }
    else{
        console.log("Error: Entity ID Not found.");
    }
    return tile;
}