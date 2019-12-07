class InstructionMenu extends GameState {
  constructor() {
    super();
  }
  /**
   *  Draws all content
   */
  draw() {
    super.draw();
    this.drawImages();
    this.drawText();
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
   *  Draw all text
   */
  drawText() {
      colorText( "Instructions", 50, 80, 'black', '48px Arial Black' );
      colorText( "To move: WASD", 50, 130, 'white', '28px Arial Black' );
      colorText( "To Attack: Click Weapon in Lower HUD", 50, 170, 'white', '28px Arial Black' );
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
