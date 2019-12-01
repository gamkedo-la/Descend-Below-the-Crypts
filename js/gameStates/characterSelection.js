class CharacterSelection extends GameState {
  constructor() {
    super();

    this.warriorBoxX = 106;
    this.warriorBoxY = 313;
    this.warriorEyes = new eyesAnimationClass(this.warriorBoxX, this.warriorBoxY, 0, warriorEyesPic);
    this.wizardBoxX = 338;
    this.wizardBoxY = 313;
    this.wizardEyes = new eyesAnimationClass(this.wizardBoxX, this.wizardBoxY, 0, wizardEyesPic);
    this.clericBoxX = 570;
    this.clericBoxY = 313;
    this.clericEyes = new eyesAnimationClass(this.clericBoxX, this.clericBoxY, 0, clericEyesPic);
    this.characterBoxWidth = 155;
    this.characterBoxHeight = 205;
    this.characterDisplayMessageOn = false;
    this.characterDescription = "";
    this.torch1 = new torchFireClass(16, 305, 0);
    this.torch2 = new torchFireClass(260, 305, 2);
    this.torch3 = new torchFireClass(495, 305, 1);
    this.torch4 = new torchFireClass(735, 305, 3);

    this.buttonList = [
    	{
    	cornerX: this.warriorBoxX,
    	cornerY: this.warriorBoxY,
    	width: this.characterBoxWidth,
    	height: this.characterBoxHeight,
    	image: warriorProfilePic,
    	debugName: "Warrior",
    	scrollOver: "A strong young boy.."
    	},
    	{
    	cornerX: this.wizardBoxX,
    	cornerY: this.wizardBoxY,
    	width: this.characterBoxWidth,
    	height: this.characterBoxHeight,
    	image: wizardProfilePic,
    	debugName: "Wizard",
    	scrollOver:  "A confident young lady.."
    	},
    	{
    	cornerX: this.clericBoxX,
    	cornerY: this.clericBoxY,
    	width: this.characterBoxWidth,
    	height: this.characterBoxHeight,
    	image: clericProfilePic,
    	debugName: "Cleric",
    	scrollOver: "A stern religious man..."
    	}
    ];
  }

  draw() {
    super.draw();

    canvasContext.drawImage(characterSelectionBackgroundPic,0, 0);
  	colorText("Choose your Hero", 175, 225, 'black', "48px Arial Black");

    for (var button of this.buttonList) {
      canvasContext.drawImage(button.image, button.cornerX, button.cornerY);
      colorText(button.debugName, button.cornerX+50, button.cornerY-25, 'white', '12px Arial Black');
    }

    sharedAnimCycle++;

  	var toAddSmoke = getRndInteger(0, 10)
  	if(toAddSmoke > 5){
  		addSmoke(50, 335); //torch 1
  		addSmoke(300, 335); //torch 2
  		addSmoke(520, 335); //torch 3
  		addSmoke(760, 335); //torch 4
  	}

  	moveSmoke()
  	drawSmoke();

  	this.torch1.draw();
  	this.torch2.draw();
  	this.torch3.draw();
  	this.torch4.draw();
    this.warriorEyes.draw();
    this.clericEyes.draw();
    this.wizardEyes.draw();
  }

  onMouseClick(mouseX, mouseY) {
    var button = this.checkButton(mouseX, mouseY);
    if (button) {
      if (button.debugName == "Warrior")
        playerOne = new Warrior();
      else if (button.debugName == "Cleric")
        playerOne = new Cleric();
      else if (button.debugName == "Wizard")
        playerOne = new Wizard();

      gameStateManager.setState(State.PLAY);
      basementMusic.loopSong("Decrepit_Basement_draft1");
    } else
      //Flash Red if invalid click
      colorRect(0,0,canvas.width,canvas.height, 'red');


  }

  onMouseMove(mouseX, mouseY) {
    var button = this.checkButton(mouseX, mouseY);
    if (button) {
      //displayCharacterDescription(button.scrollOver);
    }
  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }

  checkButton(mouseX, mouseY) {
    for (var button of this.buttonList) {
      if (mouseX > button.cornerX && mouseX < button.cornerX + button.width &&
          mouseY > button.cornerY && mouseY < button.cornerY + button.height) {
            return button;
      }
    }

    return false;
  }

  /*displayCharacterDescription(description){
  	characterDescription = description;
  }*/
}
