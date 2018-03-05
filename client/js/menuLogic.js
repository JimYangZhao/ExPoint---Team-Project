//Handles the logic for changing game menus
//Done with HTML

var divList= ['MainMenu' ,'Login','Create Account','Offline','Play','Start Campaign','Level Editor','Leaderboard','Options','Logout'];

function menuButton(divID) {
    for (i=0;i<divList.length;i++){
        if(divID == divList[i]){
            document.getElementById(divList[i]).style.display="block";
        }
        else{
            document.getElementById(divList[i]).style.display="none";
        }
    }
}
