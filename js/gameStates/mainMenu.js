

function drawMainMenuPage(){
	canvasContext.drawImage(mainMenuPic, 0, 0);
	canvasContext.drawImage(menuScreenPic, 250, 200);
	colorText("Descend Below the Crypts", 50, 125, 'black', "48px Arial Black");
	colorText("Start", 360, 255, 'white', "24px Arial Black");
	colorText("Instructions", 320, 305, 'white', "24px Arial Black");
	colorText("Credits", 350, 355, 'white', "24px Arial Black");
	torch5.draw();
	torch6.draw();
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
			