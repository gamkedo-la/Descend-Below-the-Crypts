var canvas;
var canvasContext;

var skipToGame = false;

//characters (Player, NPC's, Enemies)
//var playerOne = new warriorClass();
var playerOne = new Warrior();
var enemyList = [];

function resetEnemyLists(){
	enemyList = [];
}

//game states
var liveGame = false;
var characterSelectionScreen = false;
var pauseScreen = false;
var inventoryScreen = false;
var mainMenu = true;
var debugState = false;

function skipStraightToGame(){
	liveGame = false;
	characterSelectionScreen = true;
	pauseScreen = false;
	inventoryScreen = false;
	mainMenu = false;
	debugState = false;
	buttonList[0].func(); //can change index with whatever character desired.
	console.log("AVOIDING TITLE SCREEN AND CHARACTER SELECT.  GOING STRAIGHT TO GAME");
	console.log("EXPECT ERROR FOR MUSIC DUE TO NOT CLICKING FIRST");
}



//debug options
var displayTileX_Y = false;
var moveFast = false;
var isInvulnerable = false;
var hasUnlimitedKeys = false;
var noClipEnabled = false;

var soundDelay = 0;

window.onload = function(){

	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	loadImages();

	initInput();

	canvas.addEventListener('mousemove', function(evt) {

	var mousePos = calculateMousePos(evt);

	mousePosX = mousePos.x;
	mousePosY = mousePos.y;
	});

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	playerOne.reset();
}

function calculateMousePos(evt) {

	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}


function updateMinimap(){

	var miniMapPosX = 10;
	var miniMapPosY = 30;

	const rowSpacing= 4;
	const colSpacing = 4;
	
	// Get player tile index:
	var playerTile = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);
	

	for(var rowIndex=0; rowIndex< ROOM_ROWS; rowIndex++){

		for(var colIndex= 0; colIndex< ROOM_COLS; colIndex++){
			
			var tileIndex = colIndex + ROOM_COLS*rowIndex;
			
			// Player
			if( tileIndex == playerTile){
				colorRect(miniMapPosX+ colSpacing*colIndex ,miniMapPosY+ rowSpacing*rowIndex,rowSpacing,colSpacing, "green");
			}
			
			// Enemies
				for(var i = 0; i < enemyList.length; i++){
					var enemyTile = getTileIndexAtPixelCoord(enemyList[i].x, enemyList[i].y);
					if( tileIndex == enemyTile){
						colorRect(miniMapPosX+ colSpacing*colIndex ,miniMapPosY+ rowSpacing*rowIndex,rowSpacing,colSpacing, "purple");
					}
				}
			

			// Walls:
			if(levelOne[tileIndex] == TILE_WALL ||
			levelOne[tileIndex] == TILE_WALL_WITH_TORCH ||
			levelOne[tileIndex] == TILE_CRYPT_WALL ||
			levelOne[tileIndex] == TILE_WALL_ART ||
			levelOne[tileIndex] == TILE_WALL_SHIELD){
				colorRect(miniMapPosX+ colSpacing*colIndex ,miniMapPosY+ rowSpacing*rowIndex,rowSpacing,colSpacing, "rgba(100, 100, 100, 0.5)");
			}

			// Yellow doors:
			else if(levelOne[tileIndex]== TILE_YELLOW_DOOR){
				colorRect(miniMapPosX+ colSpacing*colIndex ,miniMapPosY+ rowSpacing*rowIndex,rowSpacing,colSpacing, "yellow");
			}

			// Red doors:
			else if(levelOne[tileIndex]== TILE_RED_DOOR){
				colorRect(miniMapPosX+ colSpacing*colIndex ,miniMapPosY+ rowSpacing*rowIndex,rowSpacing,colSpacing, "red");
			}

			// Blue doors:
			else if(levelOne[tileIndex]== TILE_BLUE_DOOR){
				colorRect(miniMapPosX+ colSpacing*colIndex ,miniMapPosY+ rowSpacing*rowIndex,rowSpacing,colSpacing, "blue");
			}

			// Background:
			else{
				colorRect(miniMapPosX+ colSpacing*colIndex ,miniMapPosY+ rowSpacing*rowIndex,rowSpacing,colSpacing, "rgba(255, 255, 255, 0.5)");
			}
		}
	}

}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		checkAllPlayerAndEnemyCollisions();
		drawEverything();
		checkForSounds();
	}, 1000/framesPerSecond);
	loadLevel(levelOne)
	playerOne.init();
	for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_GOBLIN){
			console.log("Tile Goblin matched");
			addGoblin();

		}
		if(roomGrid[i] == TILE_ORC){
			addOrc();
		}
		if(roomGrid[i] == TILE_OGRE){
			addOgre();
		}
		if(roomGrid[i] == TILE_RAT){
			addRat();
		}
	}
	if(skipToGame){
		skipStraightToGame()
	}
}
function randFromList(fromList){
	var randIdx = Math.floor(Math.random()*fromList.length);
	return fromList[randIdx];

}
//Adds an enemy
function addGoblin(){
	var tempEnemy = new Goblin();
	tempEnemy.init();
	enemyList.push(tempEnemy);
}

function addOrc(){
	//var tempEnemy = new enemyClass();
	//tempEnemy.init(orcPic, randFromList(orcNames), TILE_ORC);
	//enemyList.push(tempEnemy);

	var tempEnemy = new Goblin();
	tempEnemy.init();
	enemyList.push(tempEnemy);
}

function addOgre(){
	//var tempEnemy = new enemyClass();
	//tempEnemy.init(ogrePic, randFromList(ogreNames), TILE_OGRE);
	//enemyList.push(tempEnemy);

	var tempEnemy = new Ogre();
	tempEnemy.init();
	enemyList.push(tempEnemy);
}

function addRat(){
	//var tempEnemy = new ratClass();
	//tempEnemy.init(ratPic, randFromList(ratNames), TILE_RAT);
	//enemyList.push(tempEnemy);

	var tempEnemy = new Rat();
	tempEnemy.init();
	enemyList.push(tempEnemy);
}

function nextLevel() {
	levelNow++;
	if(levelNow > levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {
	resetEnemyLists();
	roomGrid = whichLevel.slice();
	playerOne.reset();

	for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_GOBLIN){
			addGoblin();
		}
		if(roomGrid[i] == TILE_ORC){
			addOrc();
		}
		if(roomGrid[i] == TILE_OGRE){
			addOgre();
		}
		if(roomGrid[i] == TILE_RAT){
			addRat();
		}
	}

	/*for(var i = 0; i < enemyList.length; i++){
		enemyList[i].init(goblinPic, goblinNames[i], TILE_GOBLIN);
	}*/

	/*for(var i = 0; i < orcList.length; i++){
		orcList[i].init(orcPic, orcNames[i], TILE_ORC);
	}
	for(var i = 0; i < ogreList.length; i++){
		ogreList[i].init(ogrePic, ogreNames[i], TILE_OGRE);
	}
	for(var i = 0; i < ratList.length; i++){
		ratList[i].init(ratPic, ogreNames[i], TILE_OGRE);
	} */
}

function checkForSounds(){
	if(playerOne.playWarriorsThoughtsForSecondLevel){
		soundDelay++;
		console.log(soundDelay);
		if(soundDelay == 290){
			warriorEnteringSecondLevel.play();
			soundDelay = 0;
			playerOne.playWarriorsThoughtsForSecondLevel = false;
		}
	}
}



//All movement occurs here.  This is called every frame.
function moveEverything() {
	if(liveGame){
		playerOne.movement();
		for(var i = 0; i < enemyList.length; i++){
			enemyList[i].movement();
		}

		updatedCameraPosition();
	}
}

//This checks player and enemy collisions.  This is called every frame.
//This requires refactoring.  Too many individual lines checking monsters to players
function checkAllPlayerAndEnemyCollisions(){
	//check goblins
	for(var i = 0; i < enemyList.length; i++){
		playerOne.checkCollisionsAgainst(enemyList[i]);
		for(var ii = i+1; ii < enemyList.length; ii++){
			enemyList[i].checkCollisionsAgainst(enemyList[ii]);
			enemyList[i].checkCollisionsAgainst(playerOne);
		}
	}
}


//All movement occurs here.  This is called every frame.
function drawEverything() {
	colorRect(0,0,canvas.width,canvas.height, 'black');
	if (mainMenu){
		drawMainMenuPage();
	} else if(characterSelectionScreen){
		drawCharacterSelectionPage();
	} else if(liveGame){
		shiftForCameraPan();
		drawWorld();
		//playerOne.draw();
		drawMouseIndicators();
		for(var i = 0; i < enemyList.length; i++){
			enemyList[i].draw();
		}
		finishedCameraPan();
		canvasContext.drawImage(feedbackGUIPic,0, canvas.height-50);
		colorText("Keys: " + playerOne.keysHeld, 20, 582, "black", "14px Arial Black");
		colorText("Gold: " + playerOne.goldCoins, 100, 582, "black", "14px Arial Black");
		if(playerOne.sword){
			colorText("Can use Sword", 160, 572, "black", "8px Arial Black");
		} else {
			colorText("CAN'T use Sword", 160, 572, "red", "8px Arial Black");
		}
		if(playerOne.mace){
			colorText("Can use Mace", 160, 582, "black", "8px Arial Black");
		} else {
			colorText("CAN'T use Mace", 160, 582, "red", "8px Arial Black");
		}
		if(playerOne.flameSpell){
			colorText("Can use Flame Spell", 160, 592, "black", "8px Arial Black");
		} else {
			colorText("CAN'T use Flame Spell", 160, 592, "red", "8px Arial Black");
		}

		// Turn off cheats when no in debug mode:
		playerOne.movementSpeed= playerOne.originalMovementSpeed;
		playerOne.noClipMode = false;

		if(debugState){
			var debugLineY = 50;
			var debugLineSkipY = 20;
			var debugFont = "16px Arial Black";
			var debugColor = "white";
			var startX = 500;

			var rectColour = "rgba(255, 255, 255, 0.3)";
			var debugLineCount = 7;
			var statsLineCount = 2;

			var playerTile = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);

			// Debug Menu
			colorRect(startX, debugLineY - 20, 250, debugLineSkipY*debugLineCount+1 + 10, rectColour)

			colorText("DEBUG MENU", startX + 10, debugLineY, debugColor, debugFont);
			debugLineY += debugLineSkipY;
			colorText("1. Show/Hide debug menu", startX + 10, debugLineY, debugColor, debugFont);
			debugLineY += debugLineSkipY;
			colorText("2. Tile Coords: " + (displayTileX_Y ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
			debugLineY += debugLineSkipY;
			colorText("3. Godmode: "+ (isInvulnerable ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
			debugLineY += debugLineSkipY;
			colorText("4. Fast move: "+ (moveFast ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
			debugLineY += debugLineSkipY;
			colorText("5. Unlimited Keys: "+ (hasUnlimitedKeys ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
			debugLineY += debugLineSkipY;
			colorText("6. No Clip: "+ (noClipEnabled ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
			debugLineY += debugLineSkipY*2;

			// Stats Menu
			colorRect(startX, debugLineY - 20, 250, debugLineSkipY*statsLineCount+1 + 10, rectColour)

			colorText("STATS", startX + 10, debugLineY, debugColor, debugFont);
			debugLineY += debugLineSkipY;
			colorText("Player tile: " + playerTile, startX + 10, debugLineY, debugColor, debugFont);

			if(moveFast===true){
				playerOne.movementSpeed += 5;
			}
			if(isInvulnerable===true){
				playerOne.health = playerOne.maxHealth;
			}
			if(hasUnlimitedKeys===true){
				playerOne.keysHeld = 999;
			}

			playerOne.noClipMode = noClipEnabled
		}

		updateMinimap();
	}
}

function drawMouseIndicators(){
	colorRect(mouseClickX, mouseClickY, 10, 10, "red");
	colorText("X: " + mouseClickX + " Y: " + mouseClickY, mouseClickX, mouseClickY, "Black",  "8px Arial Black")
}

//All Game States get reset to false here.
/*
To Do:  Update formula to include state to change to true
*/
function updateGameState(){
	liveGame = false;
	characterSelectionScreen = false;
	pauseScreen = false;
	inventoryScreen = false;
	mainMenu = false;
	debugState = false;
	//displayTileX_Y = false;
}
