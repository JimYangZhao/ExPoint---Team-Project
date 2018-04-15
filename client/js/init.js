//Handles all the initial configurations for the client and stores the globals used by the whole project

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
var slimeBossKey = 'slimeBoss';

//Image exclusive Keys
var enemy1RKey = 'slime1R';
var enemy2RKey = 'slime2R';
var playerAnimKey = 'playerAnim';
var parachuteKey = 'parachute';

var ctx;

window.onload= function(){
    ctx = document.getElementById("ctx").getContext("2d");
    var LoginSignIn = document.getElementById('Create Account-signIn');
    var LoginSignUp = document.getElementById('Create Account-signUp');
    LoginSignIn.onclick = function(){
        accountLogin();
    }
    LoginSignUp.onclick = function() {
        createAccount();
    }

    //Keyboard Events
    document.onkeydown= function(event){
        keyDownCheck(event);
    }
     document.onkeyup=function(event){
        keyUpCheck(event);
    }
}