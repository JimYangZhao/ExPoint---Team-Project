//Allows the player to create a level

var blankMap = {
  cols: 20,
  rows: 20,
  tsize: 64,
  layers: [[],[],[]],
  playerPos:[],
  createLayer: function(){
    /* var numLayers = this.layers.length;
    for(var l = 0; l < numLayers;l++){
      for(var r = 0; r<this.rows; r++){
        this.addRow(l,r);
      }
    } */
    this.layers = initLayer(this.rows,this.cols);
  },
  getTile: function (layer, col, row) {
    try{
      return this.layers[layer][col][row];
    }
    catch(err){
      console.log("Tile Not Found.");
      return null;
    }
  },
  addRow: function(layer,currRow){
    var l = layer;
    var row = [];
    for(c = 0; c < this.cols; c++){
      row.push(0);
    }
    this.layers[l].push(row);
  },
  updatePreviousRows: function(){
    for(c = 0; c < this.cols - 1; c++){
      this.layers[0][c].push(0);
      this.layers[1][c].push(0);
      this.layers[2][c].push(0);
    }
  }
};

//GLOBALS

//client mouse position
var xClient = 0;
var yClient = 0;

var currLvlName = null;

var selectedTile = ""; //The selected tile
var cameraCache; //Used for mouse events. Updates every time the camera moves.

//
//----UTILITY FUNCTIONS-----
//

//Keeps track of the mouse position relative to the browser
document.addEventListener("mousemove", function(evt){
  xClient = evt.clientX;
  yClient = evt.clientY;
},false);

//Get Mouse Position on canvas
function getMousePos(canvas) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: xClient - rect.left,
    y: yClient - rect.top
  };
}

//Takes the 2d layers from blankmap and turns it into a 1d arrays for game engine
packageEditorData = function(){
  lvlData = [[],[],[]];
  cols = blankMap.cols;
  rows = blankMap.rows;
  for(var r = 0; r < rows; r++){
    for(c = 0; c < cols; c++){
      backgroundTile = blankMap.layers[0][c][r];
      motionTile = blankMap.layers[2][c][r];
      staticTile = blankMap.layers[1][c][r];
      if(motionTile != 0 && motionTile != null){
        //Create a new player object, so the game engine doesn't update the level editor player
        if(motionTile.id == "player"){
          motionTile = new playerChar(motionTile.x,motionTile.y);
        }
        lvlData[1].push(motionTile);
      }
      if(staticTile != 0 && motionTile != null){
        lvlData[2].push(staticTile);
      }
      if(backgroundTile != 0 && backgroundTile != null){
        lvlData[0].push(backgroundTile);
      }
    }
  }
  return lvlData;
}

canPlaceTile = function(xGrid,yGrid){
  var canPlace = true;
  var tileAtPos = blankMap.layers[1][xGrid][yGrid];
  if(selectedTile.type == 'motion' && tileAtPos != 0 || tileAtPos != null){
    canPlace = false;
  }

  return canPlace;
}

clearOrLoadLevel = function(lvlId){
  if(lvlId == null)
    blankMap.createLayer();
  else {
    //Load the level from the level.js file
    currLvlName = lvlId;
    loadLevel(lvlId);   
  }
}

displayLvlInEditor = function(lvlDat){
  updateBlankMap(lvlDat);
  //currLvlName = lvlDat.id;
}

updateBlankMap = function(lvlDat){
  blankMap.cols = lvlDat.cols;
  blankMap.rows = lvlDat.rows;
  blankMap.tsize = lvlDat.tsize;
  blankMap.playerPos = lvlDat.playerPos;
  var filledLvlLayers = fillLayers(lvlDat.layers,blankMap.rows,blankMap.cols) //objectFactory.js
  blankMap.layers = filledLvlLayers;
}
//
//-----END UTILITY FUNCTIONS-----
//

LevelEditor = {}
LevelEditor.init = function () {

  this.camera = new Camera(blankMap, 1200, 600);
  this.isRunning = true;
  blankMap.createLayer();
  cameraCache = this.camera;

  //Listen for Mouse events
  var canvas = document.getElementById('ctx');
  canvas.addEventListener('click', function(evt) {
    if(selectedTile != 'remove'){
      var mousePos = getMousePos(canvas);
      //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);

      //Gets position relative to the entire level
      var levelPos_x = mousePos.x + cameraCache.x;
      var levelPos_y = mousePos.y + cameraCache.y;
      //console.log('Level position: ' + levelPos_x + ',' + levelPos_y);

      //Gets the position of nearest multiple of 64
      var x64 = Math.ceil(levelPos_x / 64.0) * 64.0;
      var y64 = Math.ceil(levelPos_y / 64.0) * 64.0;
      //console.log('Nearest Multiple (64): ' + x64 + ',' + y64);

      //Get the center of the grid where mouse was click
      var center_x = x64 - 32; //Subtract half tile size
      var center_y = y64 - 32;
      //console.log('Center of Selected tile: ' + center_x + ',' + center_y);

      //Find block on grid
      var pix_on_row = blankMap.tsize * blankMap.rows;
      var xGrid = Math.ceil(x64 / blankMap.tsize) - 1;
      var yGrid = Math.ceil(y64 / blankMap.tsize) - 1;
      var gridIdx = (yGrid * blankMap.rows) + xGrid;
      //console.log('Grid: ' + xGrid + ',' + yGrid + " : Grid IDX: " + gridIdx);

      //Creates a new tile object based on the name of the selected tile.
      selectTile(selectedTile.id);
      var tile = selectedTile;

      //Checks if the selected tile can be placed at the current position
      tile.x = center_x;
      tile.y = center_y;

      var tileLayer = -1;
      //Check if selected tile is in motion layer or static layer
      tileLayer = tile.layer;

      if(tile.id == "player"){ //Remove the previously placed player
        if(blankMap.playerPos.length > 0){
          blankMap.layers[tileLayer][blankMap.playerPos[0]][blankMap.playerPos[1]] = 0;
        }
        blankMap.playerPos = [];
        blankMap.playerPos.push(xGrid);
        blankMap.playerPos.push(yGrid);
      }

      //Add Image at mouse position on canvas
      blankMap.layers[tileLayer][xGrid][yGrid] = tile;
    }
    else
      LevelEditor.removeTile();

  }, false);
};

LevelEditor.run = function (context) {
  this.ctx = context;
  
  this._previousElapsed = 0;

  //var p = this.load();
 // Promise.all(p).then(function (loaded) {
      this.init();
      window.requestAnimationFrame(this.tick);
  //}.bind(this));
};
LevelEditor.resume = function(context){
  this.isRunning = true;
  window.requestAnimationFrame(this.tick);
}

LevelEditor.shutDown = function(){
  clearInterval(gameInterval);
  this.isRunning = false;
  currLvlName = null;
  blankMap.createLayer();
  ctx.clearRect(0,0,1200,600);
}

//Removes the tile at the mouse position
LevelEditor.removeTile = function(){
  var canvas = document.getElementById('ctx');
  var mousePos = getMousePos(canvas);
  //Gets position relative to the entire level
  var levelPos_x = mousePos.x + cameraCache.x;
  var levelPos_y = mousePos.y + cameraCache.y;
  //console.log('Level position: ' + levelPos_x + ',' + levelPos_y);

  //Gets the position of nearest multiple of 64
  var x64 = Math.ceil(levelPos_x / 64.0) * 64.0;
  var y64 = Math.ceil(levelPos_y / 64.0) * 64.0;
  //console.log('Nearest Multiple (64): ' + x64 + ',' + y64);

  //Get the center of the grid where mouse was click
  var center_x = x64 - 32; //Subtract half tile size
  var center_y = y64 - 32;
  //console.log('Center of Selected tile: ' + center_x + ',' + center_y);

  //Find block on grid
  var pix_on_row = blankMap.tsize * blankMap.rows;
  var xGrid = Math.ceil(x64 / blankMap.tsize) - 1;
  var yGrid = Math.ceil(y64 / blankMap.tsize) - 1;
  var gridIdx = (yGrid * blankMap.rows) + xGrid;
  blankMap.layers[0][xGrid][yGrid] = 0;
  blankMap.layers[1][xGrid][yGrid] = 0;
  blankMap.layers[2][xGrid][yGrid] = 0;
}.bind(LevelEditor);

LevelEditor.tick = function (elapsed) {
  if(this.isRunning){
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    ctx.clearRect(0,0,1200,600);
    this.ctx.fillStyle="#FFFFFF";
    this.ctx.fillRect(0,0,1200,600);
    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.updateEditor(delta);
    this.render();
  }
}.bind(LevelEditor);

LevelEditor.updateEditor = function (delta) {
  if(this.isRunning){
    // handle camera movement with arrow keys
    var dirx = 0;
    var diry = 0;
    if (pressingLeft) { dirx = -1; }
    if (pressingRight) { dirx = 1; }
    if (pressingUp) { diry = -1; }
    if (pressingDown) { diry = 1; }

    this.camera.move(delta, dirx, diry);
    cameraCache = this.camera; //Update cameraCache used for mouse events
  }
};

LevelEditor.render = function () {
  if(this.isRunning){
    // draw map background layer
    this._drawLayer(0);
    this._drawLayer(1);
    this._drawLayer(2);
    this._drawGrid();
  }
};

LevelEditor._drawGrid = function () {
  var width = blankMap.cols * blankMap.tsize;
  var height = blankMap.rows * blankMap.tsize;
  var x, y;
  for (var r = 0; r < blankMap.rows; r++) {
    x = - this.camera.x;
    y = r * blankMap.tsize - this.camera.y;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(width, y);
    this.ctx.stroke();
  }
  for (var c = 0; c < blankMap.cols; c++) {
    x = c * blankMap.tsize - this.camera.x;
    y = - this.camera.y;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, height);
    this.ctx.stroke();
  }
};

LevelEditor._drawLayer = function (layer) {
  var startCol = Math.floor(this.camera.x / blankMap.tsize);
  var endCol = startCol + (this.camera.width / blankMap.tsize);
  var startRow = Math.floor(this.camera.y / blankMap.tsize);
  var endRow = startRow + (this.camera.height / blankMap.tsize);
  var offsetX = -this.camera.x + startCol * blankMap.tsize;
  var offsetY = -this.camera.y + startRow * blankMap.tsize;

  for (var c = startCol; c <= endCol; c++) {
      for (var r = startRow; r <= endRow; r++) {
        
        var tile = blankMap.getTile(layer, c, r);
        if(!(tile == null) && tile !==0){ //Is tile not empty
          var imgKey = tile.id;
          var img = ImageAtlas[imgKey];
          var x = (c - startCol) * blankMap.tsize + offsetX;
          var y = (r - startRow) * blankMap.tsize + offsetY;
          if (tile !== 0) { // 0 => empty tile
              this.ctx.drawImage(
                  img, // image
                  Math.round(x),  // target x
                  Math.round(y), // target y
                  blankMap.tsize, // target width
                  blankMap.tsize // target height
              );
          }
        }
      }
  }
};

function Camera(blankMap, width, height) {
  this.x = 0;
  this.y = 320;
  this.width = width;
  this.height = height;
  this.maxX = blankMap.cols * blankMap.tsize - width;
  this.maxY = blankMap.rows * blankMap.tsize - height;
}

Camera.SPEED = 256*2; // pixels per second

Camera.prototype.updateMaxXY = function(){
  this.maxX = blankMap.cols * blankMap.tsize - this.width;
  this.maxY = blankMap.rows * blankMap.tsize - this.height;
}
Camera.prototype.move = function (delta, dirx, diry) {
    // move camera
    this.x += dirx * Camera.SPEED * delta;
    this.y += diry * Camera.SPEED * delta;

    if(this.x == this.maxX || this.y == this.maxY){
      blankMap.cols += 1;
      blankMap.rows += 1;
      blankMap.addRow(0,blankMap.rows);
      blankMap.addRow(1,blankMap.rows);
      blankMap.addRow(2,blankMap.rows);
      blankMap.updatePreviousRows();
    }

    this.updateMaxXY();
 
    //console.log("Camera x: " + this.x + " y: " + this.y);

    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
};

//
// start up function
// 
openLevelEditor = function(lvlId){
  //show level editor div, closes other divs
  var context = document.getElementById('ctx').getContext('2d');
  clearOrLoadLevel(lvlId);
  LevelEditor.run(context);
}
var gameInterval; //Cache gameInterval
runLevel = function(){
  LevelEditor.isRunning = false;
  entityLists = packageEditorData(); //Motion list and static list of entities
  level = new levelData(entityLists[1],entityLists[2],entityLists[0]);
  game = new gameObject(level);
  gameInterval = setInterval(updateState,1000/60);
}
stopLevel = function(){
  clearInterval(gameInterval);
  music.pause();
  music.currentTime=0;
  var context = document.getElementById('ctx').getContext('2d');
  LevelEditor.resume(context);
}

saveLevel = function(){

  level = blankMap;

  if(currLvlName == null)
    currLvlName = prompt("Please enter your level name.\nWARNING: If there is an existing level with the same name on your account, it will be overwritten.");
  
  levelToSave = new editorLevel(currLvlName,level.cols,level.rows,level.tsize,level.layers,level.playerPos, currentUser);
  sendToDB("saveLevel", levelToSave, false);
}

//Change the selected Tile on mouse click
selectTile = function(tileName){
  var tile;
  if(tileName != "remove"){
    tile = createEntity({id:tileName,x:0,y:0});
    if(tile == null)
      console.log("Error: Tile Not Properly Selected.");
  }
  else
    tile = tileName;
  selectedTile = tile;
}