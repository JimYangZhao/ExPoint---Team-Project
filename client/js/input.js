//Defines/Handles user input

//booleans for checking button preses
pressingRight = false;
pressingLeft = false;
pressingUp = false;
pressingDown = false;
pressingPower1 = false;
pressingPower2 = false;
pressingHalt= false;
pressingPause=false;
//Default Keyboard Controls
 
Right=68;
Left=65;
Up=87;
Down=83;
Power1=69;
Power2=82;
Halt=90;
Pause=80;

//changes Keybind
function ChangeKey(id,key){
    if(id=="Right"){
        Right=key;
    } 
    else if(id=="Left"){
        Left=key;
    }
    
     else if(id=='Up'){
        Up=key;
    }
    else if(id=='Down'){
        Down=key;
    }
    else if(id=='Power1'){
        Power1=key;
    }
    else if(id=='Power2'){
        Power2=key; 
     }
     else if(id=='Halt'){
        Halt=key;
     }
     else if(id=='Pause'){
        Pause = key;
     }    
 }
//Checks if the key is being pressed or held Down.
keyDownCheck = function(event){
    if(event.keyCode == Right)
         pressingRight=true;
    else if(event.keyCode == Down)
         pressingDown=true;
    else if(event.keyCode == Left)
         pressingLeft=true;
    else if(event.keyCode == Up)
         pressingUp=true;
    else if(event.keyCode == Power1)
         pressingPower1=true;
    else if(event.keyCode == Power2)
         pressingPower2=true;
    else if(event.keyCode == Halt)
         pressingHalt=true;
    else if(event.keyCode == Pause)
        pressingPause=true;
}
// Checks if the key was released(no longer being held down).
keyUpCheck = function(event){
    if(event.keyCode == Right)
         pressingRight=false;
    else if(event.keyCode == Down)
         pressingDown=false;
    else if(event.keyCode == Left)
         pressingLeft=false;
    else if(event.keyCode == Up)
         pressingUp=false;
    else if(event.keyCode == Power1)
         pressingPower1=false;
    else if(event.keyCode == Power2)
         pressingPower2=false;
    else if(event.keyCode == Halt)
         pressingHalt=false;
    else if(event.keyCode==Pause)
         pressingPause=false;
}