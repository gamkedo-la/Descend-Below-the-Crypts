const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"
const KEY_1 = 49; // "1"
const KEY_2 = 50; // "2"
const KEY_3 = 51; // "3"
const KEY_4 = 52; // "4"
const KEY_5 = 53; // "5"
const KEY_6 = 54; // "6"

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_P = 80;

const NORMAL_KEY_MAP = {
	[KEY_W]: null,
	[KEY_S]: null,
	[KEY_A]: null,
	[KEY_D]: null,
	[KEY_P]: changePauseState,
	[KEY_1]: changeDebugState
};

const DEBUG_KEY_MAP = {
	[KEY_2]: changeDisplayTileX_Y,
	[KEY_3]: toggleInvulnerablity,
	[KEY_4]: toggleFastMoving,
	[KEY_5]: toggleHasUnlimitedKeys,
	[KEY_6]: toggleNoClip
};

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

	var gameUsedKey = false;
	for (var key in NORMAL_KEY_MAP) {
		if (key == evt.keyCode) {
			gameUsedKey = true;
			if (typeof NORMAL_KEY_MAP[key] === 'function') {
				NORMAL_KEY_MAP[key]();
			}
		}
	}

	if (debugState) {
		for (var key in DEBUG_KEY_MAP) {
			if (key == evt.keyCode) {
				gameUsedKey = true;
				if (typeof DEBUG_KEY_MAP[key] === 'function') {
					DEBUG_KEY_MAP[key]();
				}
			}
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

function toggleNoClip() {
	noClipEnabled = !noClipEnabled;
		console.log("No Clip is now "+noClipEnabled)
}
