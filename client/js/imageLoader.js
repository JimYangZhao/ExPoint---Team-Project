var grass1Key = 'grass1';
var grass2Key = 'grass2';
var dirt1Key = 'dirt1';
var playerKey = 'player';
var water1Key = 'water1';
var water2Key = 'water2';
var sky1Key = 'sky1';
var cloud1Key = 'cloud1';
var rock1Key = 'rock1';
var ladder1Key = 'ladder';
var medkitKey = 'medkit';
var bombKey = 'bomb1';
var swordKey = 'staff hit'
var enemy1Key = 'enemy1';
var enemy2Key = 'enemy2';
var turretKey = 'turret';
var spikeKey = 'spike';
var lava1Key = 'lava1';
var checkpointKey = "check point";
var endOfLevelKey = 'end';
var slashKey = 'slash';
var fireballKey = 'fire ball';
var magicMissileKey = 'magic missle';
var player_right = 'playerright';
var player_left = 'playerleft';

var ImageAtlas = {}

startLoadingImgs = function () {
    return [
        Loader.loadImage(grass1Key, 'images/enviroment/grass1.png'),
        Loader.loadImage(grass2Key, 'images/enviroment/grass2.png'),
        Loader.loadImage(dirt1Key, 'images/enviroment/dirt1.png'),
        Loader.loadImage(playerKey,'images/player/player_right.png'),
        Loader.loadImage(water1Key,'images/enviroment/water1.png'),
        Loader.loadImage(water2Key,'images/enviroment/water2.png'),
        Loader.loadImage(sky1Key,'images/enviroment/sky.png'),
        Loader.loadImage(cloud1Key,'images/enviroment/cloud1.png'),
        Loader.loadImage(rock1Key,'images/enviroment/rock1.png'),
        Loader.loadImage(ladder1Key,'images/enviroment/ladder.png'),
        Loader.loadImage(checkpointKey,'images/enviroment/checkpoint.png'),
        Loader.loadImage(lava1Key,'images/enviroment/lava1.jpg'),
        Loader.loadImage(endOfLevelKey,'images/enviroment/portal.png'),
        Loader.loadImage(enemy1Key,'images/enemy/slime1_left.png'),
        Loader.loadImage(enemy2Key,'images/enemy/slime2_left.png'),
        Loader.loadImage(turretKey,'images/enemy/turret.png'),
        Loader.loadImage(spikeKey,'images/enviroment/spike.png'),
        Loader.loadImage(bombKey,'images/items/bomb.png'),
        Loader.loadImage(medkitKey,'images/items/FirstAid.png'),
        Loader.loadImage(player_right,'images/player/player_right.png'),
        Loader.loadImage(player_left,'images/player/player_left.png'),
        Loader.loadImage(fireballKey,'images/effects/fireball_right.png'),
        Loader.loadImage(magicMissileKey,'images/effects/magicmissile.png'),
        Loader.loadImage(slashKey,'images/effects/slash.png'),
        Loader.loadImage(swordKey,'images/items/sword.png'),
    ];
};

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
  
Loader.getAtlas = function () {
    return this.images;
};


var p = startLoadingImgs();
ImageAtlas = Loader.getAtlas();
