//Allows the player to create a level

var blankMap = {
  cols: 12,
  rows: 12,
  tsize: 64,
  layers: [[],[],[]],
  playerPos:[],
  createLayer: function(){
    var numLayers = this.layers.length;
    for(var l = 0; l < numLayers;l++){
      for(var r = 0; r<this.rows; r++){
        this.addRow(l,r);
      }
    }
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
  }
};

//GLOBALS
//Image keys
var grass = 'grass';
var dirt = 'dirt';
var player = 'player';

//client mouse position
var xClient = 0;
var yClient = 0;

var selectedTile; //The selected tile
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

//---Asset loader---
var Loader = {
  images: {}
};

Loader.loadImage = function (key, src) {
  var img = new Image();

  var d = new Promise(function (resolve, reject) {
      img.onload = function () {
          this.images[key] = img;
          resolve(img);
      }.bind(this);

      img.onerror = function () {
          reject('Could not load image: ' + src);
      };
  }.bind(this));

  img.src = src;
  return d;
};

Loader.getImage = function () {
  //return (key in this.images) ? this.images[key] : null;
  return this.images;
};
//---END Asset loader---


//
//-----END UTILITY FUNCTIONS-----
//

//
//-----Start Keyboard handler-----
//
var Keyboard = {};

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;
Keyboard.REMOVE = 82; //Key code for the 'r' key. Removes a tile

Keyboard._keys = {};

Keyboard.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));
}

Keyboard._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
};

Keyboard._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.isDown = function (keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};
//
//-----End Keyboard handler-----
//

LevelEditor = {}
LevelEditor.init = function () {

  //Listen for keyboard events
  Keyboard.listenForEvents(
      [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN, Keyboard.REMOVE]);
  this.tileAtlas = {};
  this.tileAtlas = Loader.getImage();
  this.camera = new Camera(blankMap, 512, 512);
  blankMap.createLayer();
  cameraCache = this.camera;

  //Listen for Mouse events
  var canvas = document.getElementById('ctx');
  canvas.addEventListener('click', function(evt) {

    var mousePos = getMousePos(canvas);
    console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);

    //Gets position relative to the entire level
    var levelPos_x = mousePos.x + cameraCache.x;
    var levelPos_y = mousePos.y + cameraCache.y;
    console.log('Level position: ' + levelPos_x + ',' + levelPos_y);

    //Gets the position of nearest multiple of 64
    var x64 = Math.ceil(levelPos_x / 64.0) * 64.0;
    var y64 = Math.ceil(levelPos_y / 64.0) * 64.0;
    console.log('Nearest Multiple (64): ' + x64 + ',' + y64);

    //Get the center of the grid where mouse was click
    var center_x = x64 - 32; //Subtract half tile size
    var center_y = y64 - 32;
    console.log('Center of Selected tile: ' + center_x + ',' + center_y);

    //Find block on grid
    var pix_on_row = blankMap.tsize * blankMap.rows;
    var xGrid = Math.ceil(x64 / blankMap.tsize) - 1;
    var yGrid = Math.ceil(y64 / blankMap.tsize) - 1;
    var gridIdx = (yGrid * blankMap.rows) + xGrid;
    console.log('Grid: ' + xGrid + ',' + yGrid + " : Grid IDX: " + gridIdx);

    //Get name of selected tile
    var tile = selectedTile;

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
    //blankMap.layers[tileLayer][gridIdx] = tile;
    blankMap.layers[tileLayer][xGrid][yGrid] = tile;
  }, false);
};

LevelEditor.run = function (context) {
  this.ctx = context;
  this._previousElapsed = 0;

  var p = this.load();
  Promise.all(p).then(function (loaded) {
      this.init();
      window.requestAnimationFrame(this.tick);
  }.bind(this));
};

LevelEditor.tick = function (elapsed) {
  window.requestAnimationFrame(this.tick);

  // clear previous frame
  this.ctx.clearRect(0, 0, 512, 512);

  // compute delta time in seconds -- also cap it
  var delta = (elapsed - this._previousElapsed) / 1000.0;
  delta = Math.min(delta, 0.25); // maximum delta of 250 ms
  this._previousElapsed = elapsed;

  this.update(delta);
  this.render();
}.bind(LevelEditor);

LevelEditor.update = function (delta) {
  // handle camera movement with arrow keys
  var dirx = 0;
  var diry = 0;
  if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
  if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
  if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
  if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }
  // handle removal of tile with r key
  if(Keyboard.isDown(Keyboard.REMOVE)) {this.removeTile();}

  this.camera.move(delta, dirx, diry);
  cameraCache = this.camera; //Update cameraCache used for mouse events
};

LevelEditor.render = function () {
  // draw map background layer
  this._drawLayer(0);
  this._drawLayer(1);
  this._drawLayer(2);
  this._drawGrid();
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

var testTile; 
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
        testTile = tile;
        if(!(tile == null) && tile !==0){ //Is tile not empty
          var imgKey = tile.id;
          var img = this.tileAtlas[imgKey];
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

//Removes the tile at the mouse position
LevelEditor.removeTile = function(){
  var canvas = document.getElementById('ctx');
  var mousePos = getMousePos(canvas);
  //Gets position relative to the entire level
  var levelPos_x = mousePos.x + cameraCache.x;
  var levelPos_y = mousePos.y + cameraCache.y;
 // console.log('Level position: ' + levelPos_x + ',' + levelPos_y);

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

function Camera(blankMap, width, height) {
  this.x = 0;
  this.y = 320;
  this.width = width;
  this.height = height;
  this.maxX = blankMap.cols * blankMap.tsize - width;
  this.maxY = blankMap.rows * blankMap.tsize - height;
}

Camera.SPEED = 256; // pixels per second

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
    }

    this.updateMaxXY();
 
    console.log("Camera x: " + this.x + " y: " + this.y);

    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
};

LevelEditor.load = function () {
  return [
      Loader.loadImage(grass, 'images/enviroment/tempGrass.png'),
      Loader.loadImage(dirt, 'images/enviroment/tempDirt.png'),
      Loader.loadImage(player,'images/player/player.png'),
  ];
};

//
// start up function
//
openLevelEditor = function(){
  //show level editor div, closes other divs
  
  var context = document.getElementById('ctx').getContext('2d');
  LevelEditor.run(context);
}

//Change the selected Tile
selectTile = function(tileName){
  
  if(tileName == grass){
    var tile = new grassTile(0,0);
  }
  else if(tileName == dirt){
    var tile = new dirtTile(0,0);
  }
  else if(tileName == player){
    var tile = new playerChar(0,0);
  }
  else{
    console.log("Error: Tile Not Properly Selected.");
  }
  selectedTile = tile;
}