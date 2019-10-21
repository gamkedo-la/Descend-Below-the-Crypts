var warriorBoxX = 100;
var warriorBoxY = 310;
var wizardBoxX = 335;
var wizardBoxY = 310;
var clericBoxX = 565;
var clericBoxY = 310;
var characterBoxHeight = 205;
var characterBoxWidth = 155;

function drawCharacterSelectionPage(){
	colorRect(0,0,canvas.width,canvas.height, 'white');
	canvasContext.drawImage(characterSelectionBackgroundPic,0, 0);
	colorText("The Warrior", warriorBoxX+45, 287, 'white', "12px Arial Black");
	colorText("The Wizard", wizardBoxX+45, 287, 'white', "12px Arial Black");
	colorText("The Cleric", clericBoxX+50, 287, 'white', "12px Arial Black");
}

function characterSelectionPageMouseClick(mousePosX, mousePosY) {
	
	if(		mousePosX > warriorBoxX && mousePosX < warriorBoxX + characterBoxWidth && 
			mousePosY > warriorBoxY && mousePosY < warriorBoxY + characterBoxHeight){ 
					updateGameState();
					liveGame = true;
					console.log("Selected Warrior");
	} else if(	mousePosX > wizardBoxX && mousePosX < wizardBoxX + characterBoxWidth && 
				mousePosY > wizardBoxY && mousePosY < wizardBoxY + characterBoxHeight){
					updateGameState();
					liveGame = true;
					console.log("Selected Wizard");					
	} else if(	mousePosX > clericBoxX && mousePosX < clericBoxX + characterBoxWidth && 
				mousePosY > clericBoxY && mousePosY < clericBoxY + characterBoxHeight){
					updateGameState();
					liveGame = true;
					console.log("Selected Cleric");							
	} else {
		colorRect(0,0,canvas.width,canvas.height, 'red');
	}
}
			