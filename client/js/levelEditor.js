//Allows the player to create a level

var blankMap = {
  cols: 12,
  rows: 12,
  tsize: 64,
  layers: [[
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]],
  getTile: function (layer, col, row) {
      return this.layers[layer][row * blankMap.cols + col];
  }
};

LevelEditor = {}

LevelEditor.init = function () {
  Keyboard.listenForEvents(
      [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
  this.tileAtlas = Loader.getImage('tiles');
  this.camera = new Camera(blankMap, 512, 512);
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
};

LevelEditor.load = function () {
  return [
      Loader.loadImage('tiles', 'images/enviroment/tiles.png'),
  ];
};

function Camera(blankMap, width, height) {
  this.x = 0;
  this.y = 0;
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
	
  var img = new Image();
  img.onload = function () {
      context.drawImage(img, 20, 20);
  }
  img.src = "images/enviroment/tempGrass.png";
  LevelEditor.run(context);
}

window.onload = function(){
  //Get Mouse Position on canvas
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  var canvas = document.getElementById('levelEditor');
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    console.log(message);
  }, false);
}