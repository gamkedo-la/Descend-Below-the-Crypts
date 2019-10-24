///// This page needs developed

function drawMainMenuPage(){
	colorRect(0,0,canvas.width,canvas.height, 'black');
	colorText("Descend Below the Crypts", 75, 225, 'white', "48px Arial Black");
	colorText("Click Anywhere to start the game", 175, 325, 'white', "24px Arial Black");
	colorText("This page is looking for someone to develop :-)", 105, 425, 'white', "24px Arial Black");
	
}

function mainMenuPageMouseClick(mousePosX, mousePosY) {
	
	if(		mousePosX > 0 && mousePosX < 800 && 
			mousePosY > 0 && mousePosY < 600){ 
					updateGameState();
					characterSelectionScreen = true;
	} else {
		colorRect(0,0,canvas.width,canvas.height, 'red');
	}
}
			