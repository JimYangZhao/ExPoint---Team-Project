# Game Design Document

## 1. Game Overview

### 1.1. Game Concept / Genre
### 1.2. Game Flow Summary – At a high level, how does the game progress?
### 1.3. Look and Feel – What is the basic look and feel of the game? What is the visual style?
## 2. Gameplay and Mechanics
### 2.1. Gameplay
#### 2.1.1. Game Start / Login (How does the user start playing the game)
#### 2.1.2. Game Progression
#### 2.1.3. Mission/challenge Structure
#### 2.1.4. Puzzle Structure
#### 2.1.5. Objectives – What are the objectives of the game?
#### 2.1.6. Play Flow – How does the game flow for the game player
#### 2.1.7. Save Progress – Save Points? Quick Save? Checkpoints? Explain why
### 2.2. Mechanics – What are the rules to the game? This is the model of the universe that the game works under.
Think of it as a simulation of a world, how do all the pieces interact?
#### 2.2.1. Physics – How does the physical universe work? (ex: gravity, collisions)
#### 2.2.2. Movement in the game (limits/types of movement, controls)
#### 2.2.3. Objects – How to pick them up and move them (ex: walk over, press button, etc.)
#### 2.2.4. Actions – Switches / buttons / object interaction
#### 2.2.5. Combat – How does the player do combat with enemies?
#### 2.2.6. Economy – What is the economy of the game? How does it work?
#### 2.2.7. Screen Flow -- A graphical description of how each screen is related to every other and a description of the
purpose of each screen. (example: mega man, sometimes screen flows smoothly to the right, sometimes it
transitions a full screen at a time)
### 2.3. Game Options – What are the options and how do they affect game play and mechanics?
### 2.4. Cheats and Easter Eggs – (Including cheat codes? What are the input method and their effects?)
## 3. Story, Setting and Character
### 3.1. Story and Narrative – Our game is not heavily story driven, but include some sort of back story / motivation for
why the player should care to complete the game.
### 3.2. Game World
#### 3.2.1.General look and feel of world (overworld vs. individual levels)
#### 3.2.2.Areas, including the general description and physical characteristics as well as how it relates to the rest of
the world (what levels use it, how it connects to other areas)
### 3.3. Characters. The game should have a few characters (including the main player character, bosses, small story)
## 4. Levels
### 4.1. Overall structure of levels. How are they accessed, how are they completed?
### 4.2. Level Design - Description of level design. This document does not need to include a description of all levels that
will be in the game (we are making a maker after all), however, describe characteristics of a level so that a
reader can get an idea of how one looks / plays.
## 5. Interface
### 5.1. Visual System. If you have a HUD, what is on it? What menus are you displaying? What is the camera model?
### 5.2. Control System – How does the game player control the game? What are the specific commands?
### 5.3. Audio, music, sound effects – When is music playing? When do sound effects play?
## 6. Artificial Intelligence
### 6.1. Common Enemy AI
   Enemies move from left to right. When they hit an edge, or move to far, they reverse direction.
### 6.2. Boss Enemy AI
   Bosses target the player. They move in the direction of the player, and when the player is within attack range, the boss attacks.
## 7. Game Art
*Style: Pixel Art
*Source: https://finalbossblues.itch.io/pixel-platformer-pack
*Key Assets:
   1.Player
   2.Stone Block
   3.Totem Enemy
   4.Skeleton Enemy
## 8. Level Editor
### 8.1. Overview of level editor
   The editor includes all tiles, enemies, and items from the core game. A user can use this editor to create their own levels. These levels can then be saved and loaded for later play.
### 8.2. Interface
   Insert Link To Drawing
### 8.3. Menu System – What will the menu system look like?
   Insert Link To Drawing
### 8.4. Transition 
   During the creation of a level, the user can click the play button at anytime to start and test the level after setting the initial player spawn point.
## 9. Player Account
### 9.1. Player Login / Profile – Stores / displays save games, levels, scores, achievements, etc.
### 9.2. Save Game – Quick Save vs. Save Points vs. Checkpoints
### 9.3. High Scores – Saving high scores / fastest times?
### 9.4. Achievements – What type of achievements to store? 
