//Handles the logging in and creation of accounts

var currentUser = "";
var attemptedUser = "";

//Used for logging in
accountLogin = function(){
    var socket = io();
    var LoginUsername = document.getElementById('Create Account-username');
    var LoginPassword = document.getElementById('Create Account-password');
    var event = 'signIn';
    attemptedUser = LoginUsername.value;
    sendToDB(event,{username:LoginUsername.value,password:LoginPassword.value});
}
//Used for account creation
createAccount = function(){
    var LoginUsername = document.getElementById('Create Account-username');
    var LoginPassword = document.getElementById('Create Account-password');
    var event = "signUp";
    sendToDB(event, {username:LoginUsername.value,password:LoginPassword.value});
}

//After a successful login, sets the current user
setCurrentUser = function(){
    currentUser = attemptedUser;
}