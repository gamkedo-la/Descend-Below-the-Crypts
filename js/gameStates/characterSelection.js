var warriorBoxX = 106;
var warriorBoxY = 313;
var wizardBoxX = 338;
var wizardBoxY = 313;
var clericBoxX = 570;
var clericBoxY = 313;
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
	canvasContext.drawImage(clericProfilePic,clericBoxX, clericBoxY);	
}

function characterSelectionPageMouseClick(mousePosX, mousePosY) {
	
	if(		mousePosX > warriorBoxX && mousePosX < warriorBoxX + characterBoxWidth && 
			mousePosY > warriorBoxY && mousePosY < warriorBoxY + characterBoxHeight){
					playerOne.init(warriorPic, "The Warrior");			
					updateGameState();
					liveGame = true;
	} else if(	mousePosX > wizardBoxX && mousePosX < wizardBoxX + characterBoxWidth && 
				mousePosY > wizardBoxY && mousePosY < wizardBoxY + characterBoxHeight){
					playerOne.init(wizardPic, "The Wizard");
					updateGameState();
					liveGame = true;				
	} else if(	mousePosX > clericBoxX && mousePosX < clericBoxX + characterBoxWidth && 
				mousePosY > clericBoxY && mousePosY < clericBoxY + characterBoxHeight){
					playerOne.init(clericPic, "The Cleric");
					updateGameState();
					liveGame = true;						
	} else {
		colorRect(0,0,canvas.width,canvas.height, 'red');
	}
}
			