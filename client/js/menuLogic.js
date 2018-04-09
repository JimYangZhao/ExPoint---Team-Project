//Handles the logic for changing game menus
//Done with HTML
var currentMenu='MainMenu'
var divList= ['MainMenu' ,'Login','Create Account','Offline','Play','Start Campaign','Level Editor','Leaderboard','Options','Logout'];

function menuButton(divID) {
    for (i=0;i<divList.length;i++){
        if(divID == divList[i]){
            document.getElementById(divList[i]).style.display="block";
            currentMenu=divList[i];
        }
        else{
            if(document.getElementById(divList[i]) != null)
                document.getElementById(divList[i]).style.display="none";
        }
    }
}

//test lvl editor canvas display
function EditorButton(){
     
    document.getElementById("ctx").style.display="block";

}

function gameButton(levelData) {
    levelDataCopy = DeepCopy(levelData);
    game = new gameObject(levelDataCopy);
    gameInterval = setInterval(updateState,1000/60);
    //displays canvas
    document.getElementById("ctx").style.display="block";
    document.getElementById("Start Campaign").style.display="none";
}

function editorBackBtn() {
    menuButton("Play");
    LevelEditor.isRunning = false;
    var ctx = document.getElementById("ctx").getContext("2d");
    ctx.clearRect(0,0,1200,600);
}
function openEditorBtn() {
    menuButton('Level Editor');
    openLevelEditor(); //levelEditor.js
}



//handles logic for user login
function validLogin() {
    var sNumber=document.getElementById("ExUsername").value;
    var pWord= document.getElementById("ExPassword").value;

    if(sNumber == "abc" && pWord== "123"){
			menuButton('Play'); 
    }
    else{
        alert("Invalid Login. Please try again");
    }

}
 //handles Account Creation
function newAccountLogin() {
    var sNumber=document.getElementById("Username").value;
    var pWord= document.getElementById("Password").value;

    if(sNumber == "abc" && pWord== "123"){
			  alert("Username is already taken");
    }
    else{
         menuButton('Play');
    }

}

 

//Enable or Disable World Map Buttons
function disableBtn(varname) {
    document.getElementById(varname).disabled = true;
}

function undisableBtn(varname) {
    document.getElementById(varname).disabled = false;
}

//Keybind Change
function KB(event, id){

    var keyCode = event.which;
     if(keyCode==32){
        key="Space Bar";
    }
    else if(keyCode == 38){
        key="Up Arrow";
    }
    else if(keyCode == 39){
        key="Right Arrow";
    }
    else if(keyCode == 40){
        key="Down Arrow";
    }
    else if(keyCode == 37){
        key="Left Arrow";
    }
    else{
    var key = String.fromCharCode(keyCode);
    
    }
    document.getElementById(id).value=key;
    
    
    ChangeKey(id,keyCode);
    
    
}
 
