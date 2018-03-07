//Allows the player to create a level

var blankMap = {
  cols: 12,
  rows: 12,
  tsize: 64,
  layers: [[]],
  createLayer: function(layer){
    for(var i = 0; i < this.cols * this.rows;i++){
        this.layers[layer][i] = 0;
    }
  },
  getTile: function (layer, col, row) {
      return this.layers[layer][row * blankMap.cols + col];
  }
};

//
//   UTILITY FUNCTIONS
//

//Get Mouse Position on canvas
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

//
//   END UTILITY FUNCTIONS
//

LevelEditor = {}
var cameraCache; //Used for mouse events. Updates every time the camera moves.
LevelEditor.init = function () {

  //Listen for keyboard events
  Keyboard.listenForEvents(
      [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
  this.tileAtlas = Loader.getImage('tiles');
  this.camera = new Camera(blankMap, 512, 512);
  blankMap.createLayer(0);
  cameraCache = this.camera;

  //Listen for Mouse events
  var canvas = document.getElementById('levelEditor');
  canvas.addEventListener('click', function(evt) {

    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    console.log(message);

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
    console.log('Grid: ' + xGrid + ',' + yGrid + " : " + gridIdx);

    //Add Image at mouse position on canvas
    var tile = new grassTile(center_x,center_y);
    blankMap.layers[0][gridIdx] = tile;
    var context = document.getElementById('levelEditor').getContext('2d');
    grass_image = new Image();
    grass_image.src = 'images/enviroment/tiles.png';
    grass_image.onload = function(){
      context.drawImage(grass_image, 20, 20);
    }
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

  this.camera.move(delta, dirx, diry);
  cameraCache = this.camera; //Update cameraCache used for mouse events
};

LevelEditor.render = function () {
  // draw map background layer
  this._drawLayer(0);
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

/* LevelEditor._drawLayer = function (layer) {
  var startCol = Math.floor(this.camera.x / blankMap.tsize);
  var endCol = startCol + (this.camera.width / blankMap.tsize);
  var startRow = Math.floor(this.camera.y / blankMap.tsize);
  var endRow = startRow + (this.camera.height / blankMap.tsize);
  var offsetX = -this.camera.x + startCol * blankMap.tsize;
  var offsetY = -this.camera.y + startRow * blankMap.tsize;

  for (var c = startCol; c <= endCol; c++) {
      for (var r = startRow; r <= endRow; r++) {
          var tile = blankMap.getTile(layer, c, r);
          var x = (c - startCol) * blankMap.tsize + offsetX;
          var y = (r - startRow) * blankMap.tsize + offsetY;
          if (tile !== 0) { // 0 => empty tile
              this.ctx.drawImage(
                  this.tileAtlas, // image
                  (tile - 1) * blankMap.tsize, // source x
                  0, // source y
                  blankMap.tsize, // source width
                  blankMap.tsize, // source height
                  Math.round(x),  // target x
                  Math.round(y), // target y
                  blankMap.tsize, // target width
                  blankMap.tsize // target height
              );
          }
      }
  }
}; */

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
          if (tile != null) { // 0 => empty tile
            var tileImg = new Image();
            tileImg.src = tile.sprite;

            var x = (c - startCol) * blankMap.tsize + offsetX;
            var y = (r - startRow) * blankMap.tsize + offsetY;
            var ctxCache = this.ctx;
              ctxCache.drawImage(
                  tileImg, // image
                  blankMap.tsize, // source x
                  0, // source y
                  blankMap.tsize, // source width
                  blankMap.tsize, // source height
                  Math.round(x),  // target x
                  Math.round(y), // target y
                  blankMap.tsize, // target width
                  blankMap.tsize // target height
              );
           
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

Camera.SPEED = 256; // pixels per second

Camera.prototype.move = function (delta, dirx, diry) {
    // move camera
    this.x += dirx * Camera.SPEED * delta;
    this.y += diry * Camera.SPEED * delta;
    var message = "Camera x: " + this.x + " y: " + this.y;
    console.log(message);
    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
};

LevelEditor.load = function () {
  return [
      Loader.loadImage('tiles', 'images/enviroment/tiles.png'),
  ];
};

//
// start up function
//
openLevelEditor = function(){
  //show level editor div, closes other divs
  
  var context = document.getElementById('levelEditor').getContext('2d');
  LevelEditor.run(context);
}



 