class QuestTwo extends GameState {
  constructor() {
    super();

	
  }

  draw() {
    super.draw();
		canvasContext.drawImage(questTwoBackgroundPic,0, 0);
  }
 
  onMouseClick( mouseXPosition, mouseYPosition ) {
    this.mouseXClickPosition = mouseXPosition;
    this.mouseYClickPosition = mouseYPosition;
    this.handleStateSelection();
  }
  
  onMouseMove(mouseX, mouseY) {

  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }
  

}

