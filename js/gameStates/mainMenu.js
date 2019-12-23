class MainMenu extends GameState {
  constructor() {
    super();

    this.mouseXClickPosition = 0;
    this.mouseYClickPosition = 0;
    
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

    colorText("Descend Below the Crypts", 130, 80, 'black', "60px Brush Script MT");
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
   * Checks if mouse click is within instruction text boundary
   * 
   * @returns {boolean} 
   */
  isMouseClickInInstructionBoundary() {
    const INSTRUCTION_LEFT_EDGE = 318;
    const INSTRUCTION_RIGHT_EDGE = 460;
    const INSTRUCTION_TOP_EDGE = 285;
    const INSTRUCTION_BOTTOM_EDGE = 315;

    return this.mouseXClickPosition < INSTRUCTION_RIGHT_EDGE && this.mouseXClickPosition > INSTRUCTION_LEFT_EDGE &&
    this.mouseYClickPosition < INSTRUCTION_BOTTOM_EDGE && this.mouseYClickPosition > INSTRUCTION_TOP_EDGE;
  }

  /**
   * Checks if mouse click is within credits text boundary
   *  
   * @returns {boolean}
   */
  isMouseClickInCreditsBoundary() {
    const CREDITS_LEFT_EDGE = 318;
    const CREDITS_RIGHT_EDGE = 460;
    const CREDITS_TOP_EDGE = 340;
    const CREDITS_BOTTOM_EDGE = 360;

    return this.mouseXClickPosition < CREDITS_RIGHT_EDGE && this.mouseXClickPosition > CREDITS_LEFT_EDGE &&
    this.mouseYClickPosition < CREDITS_BOTTOM_EDGE && this.mouseYClickPosition > CREDITS_TOP_EDGE;
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
