class GameWon extends GameState {
	constructor() {
		super();

	}

	draw() {
		super.draw();

		canvasContext.drawImage(gameWonPic, 0, 0);

		colorText("Descend Below the Crypts", 130, 80, 'black', "60px Brush Script MT");
		colorText("The Kingdon is at Peace", 360, 255, 'red', "24px Arial Black");
	}

 
  /**
   * Handles mouse click event
   * 
   * @param {number} mouseXPosition 
   * @param {number} mouseYPosition 
   */
  onMouseClick( mouseXPosition, mouseYPosition ) {
    this.mouseXClickPosition = mouseXPosition;
    this.mouseYClickPosition = mouseYPosition;
    this.handleStateSelection();
  }
  
  /**
   * Checks if mouse click is within start text boundary
   * 
   * @returns {boolean} 
   */
  isMouseClickInStartBoundary() {
    const START_LEFT_EDGE = 353;
    const START_RIGHT_EDGE = 422;
    const START_TOP_EDGE = 235;
    const START_BOTTOM_EDGE = 256;

    return this.mouseXClickPosition > START_LEFT_EDGE && this.mouseXClickPosition < START_RIGHT_EDGE &&
    this.mouseYClickPosition > START_TOP_EDGE && this.mouseYClickPosition < START_BOTTOM_EDGE;
  }


  /**
   * Handles gamestate selection
   */
  handleStateSelection() {
    if ( this.isMouseClickInStartBoundary() ) {
      gameStateManager.setState( State.CHARSELECT ) ;
    }
    else if ( this.isMouseClickInInstructionBoundary() ) {
      gameStateManager.setState( State.INSTRUCTIONS );
    }
    else if ( this.isMouseClickInCreditsBoundary() ) {
  	    gameStateManager.setState( State.CREDITS );
    }
  }

  onMouseMove(mouseX, mouseY) {

  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }
}
