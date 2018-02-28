//Handles the logic for changing game menus
//Done with HTML

var divList= ['menu1' ,'menu2','menu3','menu4'];

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
