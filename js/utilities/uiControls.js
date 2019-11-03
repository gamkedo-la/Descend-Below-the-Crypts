const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"
const KEY_1 = 49; // "1"
const KEY_2 = 50; // "2"

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_P = 80;

var mouseClickX = 0;
var mouseClickY = 0;


function initInput(){
	
	canvas.addEventListener('mousemove', function(evt) {
	
		var mousePos = calculateMousePos(evt);
	
		mousePosX = mousePos.x;
		mousePosY = mousePos.y;
	});
	
	canvas.addEventListener('click',function(evt){
		
		var mousePos = calculateMousePos(evt);
		
		mousePosX = mousePos.x;
		mousePosY = mousePos.y;
		
		if(characterSelectionScreen){
			characterSelectionPageMouseClick(mousePosX, mousePosY);
		} else if(mainMenu){
			mainMenuPageMouseClick(mousePosX, mousePosY);
		} else {  // in game
			//console.log(mousePosX, mousePosY);
			//gameCoordToIsoCoord(mousePosX - camPanX, mousePosY - camPanY);
			gameCoordToIsoCoord(mousePosX - camPanX, mousePosY);
			console.log(Math.floor(isoDrawX), Math.floor(isoDrawY));
			mouseClickX = isoDrawX;
			mouseClickY = isoDrawY;
		}
	} );
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	playerOne.setupControls(KEY_W, KEY_D, KEY_S, KEY_A);
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, playerOne, true);
	evt.preventDefault();
	
	var paused = KEY_P;
	var debugMood = KEY_1
	if(paused == evt.keyCode){
		changePauseState();
	} else if(debugMood = evt.keyCode){
		changeDebugState();
	}
	if(debugState){
		if(evt == KEY_2){
			changeDisplayTileX_Y();
		}
	}
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, playerOne, false);
}


function setKeyHoldState(thisKey, thisWarrior, setTo) {
	
	if(thisKey == thisWarrior.controlKeyForNorth){
		thisWarrior.keyHeld_North = setTo;
	}
	if(thisKey == thisWarrior.controlKeyForEast){
		thisWarrior.keyHeld_East = setTo;
	}
	if(thisKey == thisWarrior.controlKeyForSouth){
		thisWarrior.keyHeld_South = setTo;
	}
	
	if(thisKey == thisWarrior.controlKeyForWest){
		thisWarrior.keyHeld_West = setTo;
	}
}

function changePauseState(){
	if(pauseScreen){
		pauseScreen = false;
	} else {
		pauseScreen = true;
	}	
}

function changeDebugState(){
	if(debugState){
		//debugState = false
	} else {
		debugState = true;
	}
}

function changeDisplayTileX_Y(){
	if(displayTileX_Y){
		displayTileX_Y = false
	} else {
		displayTileX_Y = true;
	}
}



