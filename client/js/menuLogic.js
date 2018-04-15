//Handles the logic for changing game menus
//Done with HTML
var currentMenu='MainMenu'
var divList= ['MainMenu' ,'Login','Create Account','Offline','Play','Start Campaign','Level Editor','LevelE','ExistingLvl','Leaderboard','Options','Logout'];

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

function gameButton(levelData) {
    levelDataCopy = DeepCopy(levelData);
    game = new gameObject(levelDataCopy);
    gameInterval = setInterval(updateState,1000/60);
    //displays canvas
    document.getElementById("ctx").style.display="block";
    document.getElementById("Start Campaign").style.display="none";
}

function editorBackBtn() {
    menuButton("LevelE");
    LevelEditor.shutDown();   
}

function openEditorBtn(levelId = null) {
    //DEBUG
    //levelId = null;

    menuButton('Level Editor');
    openLevelEditor(levelId); //levelEditor.js
}

function openExistingLvlBtn(){
    menuButton('ExistingLvl');
    sendToDB("getLevelNames",currentUser);
}

//Called from dbWrapper.js when names are retrieved from DB
function populateExistingLvlPage(lvlNames){
    var eLvlDiv = document.getElementById("ExistingLvl");
    clearBtnsInDiv(eLvlDiv);
    for(var i in lvlNames){
        var name = lvlNames[i];
        var btn = document.createElement("BUTTON");
        btn.addEventListener('click', function(){
            //openEditorBtn(name);
            openEditorBtn(this.textContent); 
        }); 
              
        var t = document.createTextNode(name);       
        btn.appendChild(t);
        //console.log(btn.textContent);                                
        eLvlDiv.appendChild(btn);  
    }

    //Add the back button after removing all nodes
    var btn = document.createElement("BUTTON");       
    var t = document.createTextNode("Back");  
    btn.addEventListener('click', function(){
        menuButton('LevelE'); 
    });    
    btn.appendChild(t);                                
    eLvlDiv.appendChild(btn); 
}

function clearBtnsInDiv(div){
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
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


function OptionsBttn(){
    menuButton('Play');
}

//Lvl Editor Tabs
var Tabs= ['Environment','Items','Enemy'];

function openTab(event,divID) {
    for (i=0;i<Tabs.length;i++){
        if(divID == Tabs[i]){
            document.getElementById(Tabs[i]).style.display="block";
        }
        else{
            if(document.getElementById(Tabs[i]) != null)
                document.getElementById(Tabs[i]).style.display="none";
        }
    }
}