# CS4770
This is a Use case for the menu.

When the user in the game editor platform. 

1.Users attempt to create stuff for the environment
    1.a. Users press A1, then C1(Sub-menu) will be opened, which shows all the environmental things that the user can create in the game.
    1.b. Users hover on the A1 button, nothing happen, unless users press the A1 button.
    1.c. Users press A1 and move the mouse to A2/A3/A4 button, C1 will not be changed, unless user press the A2/A3/A4 button.

2.Users attempt to create stuff for the Enemy Units
    2.a. Users press A2, then C1(Sub-menu) will be opened, which shows all the enemy units that the user can create in the game.
    2.b. Users hover on the A2 button, nothing happen, unless users press the A2 button.
    2.c. Users press A2 and move the mouse to A1/A3/A4 button, C1 will not be changed, unless user press the A1/A3/A4 button.

3.Users attempt to create stuff for the Boss Units
    3.a. Users press A3, then C1(Sub-menu) will be opened, which shows all the boss units that the user can create in the game.
    3.b. Users hover on the A3 button, nothing happen, unless users press the A3 button.
    3.c. Users press A3 and move the mouse to A1/A2/A4 button, C1 will not be changed, unless user press the A1/A2/A4 button.
    
4.Users attempt to create stuff for the Objectives
    4.a. Users press A4, then C1(Sub-menu) will be opened, which shows all the Objectives that the user can create in the game.
    4.b. Users hover on the A4 button, nothing happen, unless users press the A4 button.
    4.c. Users press A4 and move the mouse to A1/A2/A3 button, C1 will not be changed, unless user press the A1/A2/A3 button.

5.Users attempt to Play their platform
    5.a. Users press the button B1, they can play just like in the formal game to play the game which they just created by the level editor.
    5.b. When B1 has been pressed by the user, B1 will be changed to stop button, and every button in the editor screen will be removed temporary, if the user press the stop button, the screen will be returned to the editor screen again.

6.Users attempt to return to the main menu, 
    6.a. Users can press B2 button to return the main menu. 
    6.b. When the user press B2, C2 area will have a message pop up to ask the user “Are you sure to leave. Y/N”, if press “Y”, the screen will reach the main menu, else if the user press “N”, the screen will stay in the editor platform.

7.Users attempt to save the process of the editor situation, 
    7.a. Users can press B3 to save the editor situation. 
    7.b. After the user press B3, C2 area will have a message pop up to tell the user “save successful!”.
    7.c. Next time when the user login, they can find the game they just created from the game database of user’s own storage.

8.Users attempt to publish the game, 
    8.a. After save the game, if users want to share the game they just created, users can press the B4 to publish the game in to the whole game community. 
    8.b. After the user press B4, C2 area will have a message pop up to tell the user “Publish already!”. 




This is Use Case X Level Editor, which Scott wrote. I fixed some format.

1.User attempts to places on the grid 
    1.a User has object selected - Places the selected object on the grid, 'ready to publish' is set to false 
    1.b User has not yet selected an object - Places the default object, 'ready to publish' is set to false 
    1.c User tried to place an object on an occupied grid - Object does not get placed, nothing Happens
2.User selects option from category toolbar 
    2.a User selects a category different from the current category: Object menu updated to appropriate category 
    2.b User selects the same category as the current category: Object menu does not update, nothing happens
3.User attempts to save level 
    3.a User connects to database successfully - Level is saved under player's Profile 
    3.b User unsuccessfully connects to database - Inform user of problem through prompt. User must take action from list of actions 
     3.b.1 User selects retry - attempt to connect to database again. Repeats case 3. 
     3.b.2 User selects save to file - Saves file under text file. Exits Prompt 
     3.b.3 User selects cancel - Exits prompt without any action
4.User attempts to publish level 4.a Level has 'ready to publish' set to true - Attempts to connect to database 
     4.a.1 User connects to database successfully - Adds current form of the level to the list of published levels. 
     4.a.2 User is unable to connect to the database - Inform user of problem through prompt. User must take action from list of actions 
      4.a.2.1 User selects retry from list of actions- Repeats case 
      4.a 4.a.2.2 User selects cancel from list of actions - Closes prompt without action 
      4.b Level has 'ready to publish' set to false - Inform user of problem through prompt.
5.User presses play mode - Puts user into play mode. If level is beat during this play mode, 'ready to publish' is set to true.
6.User presses return to main menu - Prompts user to save level before quitting 
      6.a User selects not to save - Returns to main menu 
      6.b User selects to save - start case 3 
      6.c User selects cancel - Close prompt without action
