class Credits extends GameState {
  constructor() {
    super();
  }
  
  /**
   *  Draw all content
   */
  draw() {
    super.draw();
    this.drawImages();
  }

  /**
   *  Mouse click event handler
   * 
   * @param {number} mouseXPosition 
   * @param {number} mouseYPosition
   */
  onMouseClick( mouseXPosition, mouseYPosition ) {
    if ( this.isMouseOnCanvas( mouseXPosition, mouseYPosition ) ) {
  	   this.returnToMainMenu();
  	}
  }

  /**
   *  Draw all Images
   */
  drawImages() {
    canvasContext.drawImage( mainMenuPic, 0, 0 );
    canvasContext.drawImage( instructionScreenPic, 10, 100 );
    canvasContext.drawImage( titleBarPic, 10, 25 );
  }

  /**
   * Check if mouse is on canvas 
   *
   * @param {number} mouseXPosition
   * @param {number} mouseYPosition
   * 
   * @returns {boolean}
   */
  isMouseOnCanvas( mouseXPosition, mouseYPosition ) {
    return mouseXPosition > 0 && mouseXPosition < canvas.width &&
           mouseYPosition > 0 && mouseYPosition < canvas.height;
  }

  /**
   *  Sets State to main menu
   */
  returnToMainMenu() {
    gameStateManager.setState(State.MENU);
  }

  onMouseMove(mouseX, mouseY) {

  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }

}