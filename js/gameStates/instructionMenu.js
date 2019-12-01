class InstructionMenu extends GameState {
  constructor() {
    super();
  }

  draw() {
    super.draw();

    canvasContext.drawImage(mainMenuPic, 0, 0);
    canvasContext.drawImage(menuScreenPic, 250, 0);
    canvasContext.drawImage(titleBarPic, 10, 25);

    colorText("Instructions", 50, 80, 'black', "48px Arial Black");
  }

  onMouseClick(mouseX, mouseY) {
    if (mouseX > 0 && mouseX < 800 &&
  			mouseY > 0 && mouseY < 600) {
  	   gameStateManager.setState(State.MENU);
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
