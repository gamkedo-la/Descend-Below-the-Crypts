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
	colorText("Choose your Hero", 150, 200, 'red', "48px Arial Black");
	colorText("The Warrior", warriorBoxX+45, 287, 'white', "12px Arial Black");
	colorText("The Wizard", wizardBoxX+45, 287, 'white', "12px Arial Black");
	colorText("The Cleric", clericBoxX+50, 287, 'white', "12px Arial Black");
	/////////////////////////   Art to be replaced /////////////////////////////////
	colorText("To be replaced with", warriorBoxX+15, warriorBoxY+90, 'white', "12px Arial Black");
	colorText("Warrior Profile Pic", warriorBoxX+20, warriorBoxY+110, 'white', "12px Arial Black");
	colorText("To be replaced with", wizardBoxX+15, wizardBoxY+90, 'white', "12px Arial Black");
	colorText("Wizard Profile Pic", wizardBoxX+20, wizardBoxY+110, 'white', "12px Arial Black");
	colorText("To be replaced with", clericBoxX+15, clericBoxY+90, 'white', "12px Arial Black");
	colorText("Cleric Profile Pic", clericBoxX+20, clericBoxY+110, 'white', "12px Arial Black");
	
	
	
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
			