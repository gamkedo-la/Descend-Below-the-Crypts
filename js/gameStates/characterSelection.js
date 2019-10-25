var warriorBoxX = 106;
var warriorBoxY = 313;
var wizardBoxX = 338;
var wizardBoxY = 313;
var clericBoxX = 565;
var clericBoxY = 310;
var characterBoxHeight = 205;
var characterBoxWidth = 155;

function drawCharacterSelectionPage(){
	canvasContext.drawImage(characterSelectionBackgroundPic,0, 0);
	colorText("Choose your Hero", 175, 225, 'black', "48px Arial Black");
	colorText("The Warrior", warriorBoxX+45, 287, 'white', "12px Arial Black");
	colorText("The Wizard", wizardBoxX+45, 287, 'white', "12px Arial Black");
	colorText("The Cleric", clericBoxX+50, 287, 'white', "12px Arial Black");
	/////////////////////////   Art to be replaced /////////////////////////////////
	canvasContext.drawImage(warriorProfilePic,warriorBoxX, warriorBoxY);
	canvasContext.drawImage(wizardProfilePic,wizardBoxX, wizardBoxY);
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
			