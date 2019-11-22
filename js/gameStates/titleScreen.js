var leftDoorOpenningSpeed = -3;
var rightDoorOpenningSpeed = 3;
var doorLeftXPosition = 0;
var doorRightXPosition = 400;

function drawMainMenuPage(){
	canvasContext.drawImage(mainMenuPic, 0, 0);
	canvasContext.drawImage(menuScreenPic, 250, 0);
	canvasContext.drawImage(titleBarPic, 10, 25);
	colorText("Descend Below the Crypts", 50, 80, 'black', "48px Arial Black");
	colorText("Start", 360, 255, 'white', "24px Arial Black");
	colorText("Instructions", 320, 305, 'white', "24px Arial Black");
	colorText("Credits", 350, 355, 'white', "24px Arial Black");
	addSmoke(315, 460); //torch 5
	addSmoke(475, 455); //torch 6
	moveSmoke()
	drawSmoke();
	torch5.draw();	
	torch6.draw();
		
	if(doorLeftXPosition > - 500){
		drawDoorsOpenning();
	}

}

function drawDoorsOpenning(){
	doorLeftXPosition += leftDoorOpenningSpeed;
	doorRightXPosition += rightDoorOpenningSpeed;
	canvasContext.drawImage(leftDoorOpenningPic, doorLeftXPosition, 0);
	canvasContext.drawImage(rightDoorOpenningPic, doorRightXPosition, 0);
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



			