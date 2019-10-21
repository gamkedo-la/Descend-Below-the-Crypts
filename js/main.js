var canvas;
var canvasContext;

//characters (Player, NPC's, Enemies)
var playerOne = new warriorClass();
var goblinList = [];
var orcList = [];
var ogreList = [];
var ratList = [];

function resetEnemyLists(){
	goblinList = [];
	orcList = [];
	ogreList = [];
	ratList = [];
}

//game states
var liveGame = false;
var characterSelectionScreen = true; 
var pauseScreen = false;
var inventoryScreen = false;
var mainMenu = false;


window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
				
	loadImages();
	
	initInput();	
	
	canvas.addEventListener('mousemove', function(evt) {
	
	var mousePos = calculateMousePos(evt);
	
	MousePosX = mousePos.x;
	MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	playerOne.warriorReset();
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

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		checkAllPlayerAndEnemyCollisions();
		drawEverything();
	}, 1000/framesPerSecond);
	loadLevel(levelOne)
	playerOne.init(warriorPic, "The Warrior");
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
	}
	for(var i = 0; i < goblinList.length; i++){
		goblinList[i].init(goblinPic, goblinNames[i], TILE_GOBLIN);
	}
	for(var i = 0; i < orcList.length; i++){
		orcList[i].init(orcPic, orcNames[i], TILE_ORC);
	}		
	for(var i = 0; i < ogreList.length; i++){
		ogreList[i].init(ogrePic, ogreNames[i], TILE_OGRE);
	}
	for(var i = 0; i < ratList.length; i++){
		ratList[i].init(ratPic, ratNames[i], TILE_RAT);
	}
}

//Adds an enemy 
function addGoblin(){
	var tempEnemy = new enemyClass();
	goblinList.push(tempEnemy);
}

function addOrc(){
	var tempEnemy = new enemyClass();
	orcList.push(tempEnemy);
}

function addOgre(){
	var tempEnemy = new enemyClass();
	ogreList.push(tempEnemy);
}

function addRat(){
	var tempEnemy = new ratClass();
	ratList.push(tempEnemy);
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
	playerOne.warriorReset();
	
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
	for(var i = 0; i < goblinList.length; i++){
		goblinList[i].init(goblinPic, goblinNames[i], TILE_GOBLIN);
	}
	for(var i = 0; i < orcList.length; i++){
		orcList[i].init(orcPic, orcNames[i], TILE_ORC);
	}		
	for(var i = 0; i < ogreList.length; i++){
		ogreList[i].init(ogrePic, ogreNames[i], TILE_OGRE);
	}
	for(var i = 0; i < ratList.length; i++){
		ratList[i].init(ratPic, ogreNames[i], TILE_OGRE);
	}
	console.log("Finish Load Level");
}

			
//All movement occurs here.  This is called every frame.
function moveEverything() {
	if(liveGame){
		playerOne.movement();
		for(var i = 0; i < goblinList.length; i++){
			goblinList[i].movement();
		}
		for(var i = 0; i < orcList.length; i++){
			orcList[i].movement();
		}
		for(var i = 0; i < ogreList.length; i++){
			ogreList[i].movement();
		}
		for(var i = 0; i < ratList.length; i++){
			ratList[i].movement();
		}
		updatedCameraPosition();
	}
}

//This checks player and enemy collisions.  This is called every frame.
//This requires refactoring.  Too many individual lines checking monsters to players
function checkAllPlayerAndEnemyCollisions(){
	//check goblins
	for(var i = 0; i < goblinList.length; i++){
		playerOne.checkCollisionsAgainst(goblinList[i]);
		for(var ii = i+1; ii < goblinList.length; ii++){
			goblinList[i].checkCollisionsAgainst(goblinList[ii]);
			goblinList[i].checkCollisionsAgainst(playerOne);
		}
	}
	//check orcs
	for(var i = 0; i < orcList.length; i++){
		playerOne.checkCollisionsAgainst(orcList[i]);
		for(var ii = i+1; ii < orcList.length; ii++){
		orcList[i].checkCollisionsAgainst(orcList[ii]);
		orcList[i].checkCollisionsAgainst(playerOne);
		}
	}
	//check ogres
	for(var i = 0; i < ogreList.length; i++){
		playerOne.checkCollisionsAgainst(ogreList[i]);
		for(var ii = i+1; ii < orcList.length; ii++){
		ogreList[i].checkCollisionsAgainst(ogreList[ii]);
		ogreList[i].checkCollisionsAgainst(playerOne);
		}
	}
	//check rats
	for(var i = 0; i < ratList.length; i++){
		playerOne.checkCollisionsAgainst(ratList[i]);
		for(var ii = i+1; ii < ratList.length; ii++){
		ratList[i].checkCollisionsAgainst(ratList[ii]);
		ratList[i].checkCollisionsAgainst(playerOne);
		}
	} 
}


//All movement occurs here.  This is called every frame.
function drawEverything() {
	colorRect(0,0,canvas.width,canvas.height, 'black');
	if(characterSelectionScreen){
		drawCharacterSelectionPage();
	} else if(liveGame){
		shiftForCameraPan();
		drawTracks();
		playerOne.draw();
		for(var i = 0; i < goblinList.length; i++){
			goblinList[i].draw();
		}
		for(var i = 0; i < orcList.length; i++){
			orcList[i].draw();
		}
		for(var i = 0; i < ogreList.length; i++){
			ogreList[i].draw();
		}
		for(var i = 0; i < ratList.length; i++){
			ratList[i].draw();
		}
		finishedCameraPan();
		canvasContext.drawImage(feedbackGUIPic,0, canvas.height-50);
		colorText("Keys: " + playerOne.keysHeld, 20, 582, "black", "14px Arial Black");
	}
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
}
