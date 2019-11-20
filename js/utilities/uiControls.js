const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"
const KEY_1 = 49; // "1"
const KEY_2 = 50; // "2"
const KEY_3 = 51; // "3"
const KEY_4 = 52; // "4"
const KEY_5 = 53; // "5"

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
			characterSelectionPageMouseScrollOver(mousePosX, mousePosY)
			characterSelectionPageMouseClick(mousePosX, mousePosY);
		} else if(mainMenu){
			mainMenuPageMouseClick(mousePosX, mousePosY);
		} else {  // in game
			gameCoordToIsoCoord(mousePosX, mousePosY);
			console.log(Math.floor(mousePosX), Math.floor(mousePosY));
			mouseClickX = mousePosX + camPanX;
			mouseClickY = mousePosY + camPanY;
		}
	} );
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	playerOne.setupControls(KEY_W, KEY_D, KEY_S, KEY_A);
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, playerOne, true);
	
	var gameUsedKey = true;
	switch(evt.keyCode) {
		case KEY_1: // debugMode
			changeDebugState();
			break;

		case KEY_P:
			changePauseState();
			break;
		default: // warning: just because a key isn't used above doesn't mean debugState isn't using it
			gameUsedKey = false;
			break;
	}

	if(debugState && gameUsedKey == false){ // NOTE: some keys are used for debug!
		gameUsedKey = true; // assume true until we hit default case
		switch(evt.keyCode) {
			 case KEY_2:
				changeDisplayTileX_Y();
				break;
			 case KEY_3:
				toggleFastMoving();
				break;
			case KEY_4:
				toggleInvulnerablity();
				break;
			case KEY_5:
				toggleHasUnlimitedKeys();
				break;
			default:
				gameUsedKey = false;
				break;
		}
	}

	if(gameUsedKey) {
		evt.preventDefault();
	} else {
		console.log("unused key pressed / unrecognized, " + evt.keyCode + "(does debugState need to be on? press Key 1)");
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
	pauseScreen = !pauseScreen;
	console.log("pause toggle, is now "+pauseScreen);
}

function changeDebugState(){
	debugState = !debugState;
	console.log("debug toggle, is now "+debugState);
}

function changeDisplayTileX_Y(){
	displayTileX_Y = !displayTileX_Y;
	console.log("display tile change, is now "+displayTileX_Y);
}

function toggleFastMoving(){
	moveFast = !moveFast;
		console.log("fast moving is now "+moveFast);
}

function toggleInvulnerablity(){
	isInvulnerable = !isInvulnerable;
		console.log("invulnerable mode is now "+isInvulnerable);
}

function toggleHasUnlimitedKeys(){
	hasUnlimitedKeys = !hasUnlimitedKeys;
		console.log("Character now has unlimited keys: "+hasUnlimitedKeys)
}

