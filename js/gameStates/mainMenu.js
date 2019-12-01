class MainMenu extends GameState {
  constructor() {
    super();

    this.doorOpeningSpeed = 3;
    this.doorLeftXPosition = 0;
    this.doorRightXPosition = 400;

    this.warriorEyes = new eyesAnimationClass(613, 360, 0, warriorEyesPic);
    this.wizardEyes = new eyesAnimationClass(22, 350, 0, wizardEyesPic);

    this.torch1 = new torchFireClass(450, 415, 3);
    this.torch2 = new torchFireClass(288, 430, 3);
  }

  draw() {
    super.draw();

    canvasContext.drawImage(mainMenuPic, 0, 0);
    canvasContext.drawImage(menuScreenPic, 250, 0);
    canvasContext.drawImage(titleBarPic, 10, 25);

    colorText("Descend Below the Crypts", 50, 80, 'black', "48px Arial Black");
  	colorText("Start", 360, 255, 'white', "24px Arial Black");
  	colorText("Instructions", 320, 305, 'white', "24px Arial Black");
  	colorText("Credits", 350, 355, 'white', "24px Arial Black");

    var toAddSmoke = getRndInteger(0, 10);
    if (toAddSmoke > 0) {
      addSmoke(315, 460, 100);
      addSmoke(475, 455, 5000);
    }

    moveSmoke();
    drawSmoke();
    this.torch1.draw();
    this.torch2.draw();
    this.warriorEyes.draw();
    this.wizardEyes.draw();

    if (this.doorLeftXPosition > -500)
      this.drawDoorsOpening();
  }

  drawDoorsOpening() {
    this.doorLeftXPosition -= this.doorOpeningSpeed;
  	this.doorRightXPosition += this.doorOpeningSpeed;
  	canvasContext.drawImage(leftDoorOpenningPic, this.doorLeftXPosition, 0);
  	canvasContext.drawImage(rightDoorOpenningPic, this.doorRightXPosition, 0);
  }

  onMouseClick(mouseX, mouseY) {
    if (mouseX < 460 && mouseY < 315 &&
      mouseX > 318 && mouseY > 285) {
        gameStateManager.setState(State.INSTRUCTIONS);
    }
    else if (mouseX > 353 && mouseX < 422 &&
  			mouseY > 235 && mouseY < 256) {
  	   gameStateManager.setState(State.CHARSELECT);
  	} else {
  	   colorRect(0,0,canvas.width,canvas.height, 'red');
    }
  
  }

  onMouseMove(mouseX, mouseY) {

  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }
}
