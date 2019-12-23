var canvas;
var canvasContext;

var skipToGame = true;

// Player
var playerOne;

// Game State Manager
var gameStateManager = new GameStateManager();

var soundDelay = 0;

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	loadImages();
	initInput();
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

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(function() {
		gameStateManager.getState().draw();
	}, 1000/framesPerSecond);

	if (skipToGame) {
		playerOne = new Warrior();
		gameStateManager.setState(State.PLAY);
		console.log("AVOIDING TITLE SCREEN AND CHARACTER SELECT.  GOING STRAIGHT TO GAME");
		console.log("EXPECT ERROR FOR MUSIC DUE TO NOT CLICKING FIRST");
	}
}

function randFromList(fromList) {
	var randIdx = Math.floor(Math.random()*fromList.length);
	return fromList[randIdx];
}

function drawMouseIndicators() {
	colorRect(mouseClickX, mouseClickY, 10, 10, "red");
	colorText("X: " + mouseClickX + " Y: " + mouseClickY, mouseClickX, mouseClickY, "Black",  "8px Arial Black")
}

//All Game States get reset to false here.
/*
To Do:  Update formula to include state to change to true
*/
/*function updateGameState(){
	liveGame = false;
	characterSelectionScreen = false;
	pauseScreen = false;
	inventoryScreen = false;
	mainMenu = false;
	debugState = false;
	//displayTileX_Y = false;
}*/
