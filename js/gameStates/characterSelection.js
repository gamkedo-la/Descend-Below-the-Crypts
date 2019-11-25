var warriorBoxX = 106;
var warriorBoxY = 313;
var warriorEyes = new eyesAnimationClass(warriorBoxX, warriorBoxY, 0, warriorEyesPic);
var warriorEyes2 = new eyesAnimationClass(613, 360, 0, warriorEyesPic); // for title screen
var wizardBoxX = 338;
var wizardBoxY = 313;
var wizardEyes = new eyesAnimationClass(wizardBoxX, wizardBoxY, 0, wizardEyesPic);
var wizardEyes2 = new eyesAnimationClass(22, 350, 0, wizardEyesPic); // for title screen
var clericBoxX = 570;
var clericBoxY = 313;
var clericEyes = new eyesAnimationClass(clericBoxX, clericBoxY, 0, clericEyesPic);
var characterBoxWidth = 155;
var characterBoxHeight = 205;
var characterDisplayMessageOn = false;
var characterDescription = "";
var torch1 = new torchFireClass(16, 305, 0);
var torch2 = new torchFireClass(260, 305, 2);
var torch3 = new torchFireClass(495, 305, 1);
var torch4 = new torchFireClass(735, 305, 3);
var torch5 = new torchFireClass(450, 415, 3); // for title screen
var torch6 = new torchFireClass(288, 430, 3); // for title screen

var buttonList = [
	{
	cornerX: warriorBoxX, 
	cornerY: warriorBoxY,
	width: characterBoxWidth,
	height: characterBoxHeight,
	image: warriorProfilePic,
	debugName: "Warrior",
	scrollOver: function(){
		displayCharacterDescription("A strong young boy..");
	},
	func: function(){
		startWithCharacter(warriorPic, "The Warrior");
		choosingWarrior.play();
		}
	},
	{
	cornerX: wizardBoxX, 
	cornerY: wizardBoxY,
	width: characterBoxWidth,
	height: characterBoxHeight,
	image: wizardProfilePic,
	debugName: "Wizard",
	scrollOver: function(){
		displayCharacterDescription("A confident young lady..");
	},
	func: function(){
		startWithCharacter(wizardPic, "The Wizard");
		}
	},
	{
	cornerX: clericBoxX, 
	cornerY: clericBoxY,
	width: characterBoxWidth,
	height: characterBoxHeight,
	image: clericProfilePic,
	debugName: "Cleric",
	scrollOver: function(){
		displayCharacterDescription("A stern religious man...");
	},
	func: function(){
		startWithCharacter(clericPic, "The Cleric");
		}
	}
];

function displayCharacterDescription(description){
	characterDescription = description;
	displayCharacterDescription = true;
}

function startWithCharacter(charImage, charName){
	playerOne.init(charImage, charName);			
	updateGameState();
	liveGame = true;
	basementMusic.loopSong("Decrepit_Basement_draft1");
}

function drawCharacterSelectionPage(){
	canvasContext.drawImage(characterSelectionBackgroundPic,0, 0);
	colorText("Choose your Hero", 175, 225, 'black', "48px Arial Black");
	for(var i = 0; i < buttonList.length; i++){
		canvasContext.drawImage(buttonList[i].image,buttonList[i].cornerX,buttonList[i].cornerY);
		colorText(buttonList[i].debugName, buttonList[i].cornerX+45, buttonList[i].cornerY - 25, 'white', "12px Arial Black");
	}
	if(characterDisplayMessageOn){ // this isn't working yet
		console.log("worked");
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
	
	torch1.draw();
	torch2.draw();
	torch3.draw();
	torch4.draw();
	warriorEyes.draw();
	clericEyes.draw();
	wizardEyes.draw();
}

function characterSelectionPageMouseScrollOver(mousePosX, mousePosY) {
	for(var i = 0; i < buttonList.length; i++){
		if(		mousePosX > buttonList[i].cornerX && mousePosX < buttonList[i].cornerX + buttonList[i].width && 
			mousePosY > buttonList[i].cornerY && mousePosY < buttonList[i].cornerY + buttonList[i].height){
			buttonList[i].scrollOver();
			return;
		}
	}	
	// Turn off Character Description
	characterDisplayMessageOn = false;
}

function characterSelectionPageMouseClick(mousePosX, mousePosY) {
	for(var i = 0; i < buttonList.length; i++){
		if(		mousePosX > buttonList[i].cornerX && mousePosX < buttonList[i].cornerX + buttonList[i].width && 
			mousePosY > buttonList[i].cornerY && mousePosY < buttonList[i].cornerY + buttonList[i].height){
			buttonList[i].func();
			return;
		}
	}
	//Flash Red if invalid click
	colorRect(0,0,canvas.width,canvas.height, 'red');	
}

function eyesAnimationClass(xPos,yPos, startFrame, whichPic){
	this.x = xPos;
	this.y = yPos;
	this.eyesPicHeight = 200;
	this.eyesPicWidth = 150;
	this.eyesFrames = 5;
	this.animCycle = 0;
	this.animCycleAdvance = startFrame;
	this.blink = false;
	this.eyesPicture = whichPic
		
	this.draw = function(){
		if(this.blink == false){
			var toBlink = Math.random();
			if(toBlink < .005){
				this.blink = true;
			} else {
				this.blink = false;
			}
		}
		
		if(this.blink){
			this.animCycle++;
			if(this.animCycle > 6){
				this.animCycle = 0;
				this.animCycleAdvance++
			}
			if(this.animCycleAdvance > this.eyesFrames){
				this.animCycleAdvance = 0;
				this.blink = false;
			}
		}
			

			
		canvasContext.drawImage(this.eyesPicture,
			this.animCycleAdvance * this.eyesPicWidth, 0, this.eyesPicWidth, this.eyesPicHeight, 
			this.x, this.y, this.eyesPicWidth, this.eyesPicHeight);
	}
}	
		
function torchFireClass(xPos, yPos, startFrame){
	this.x = xPos;
	this.y = yPos;
	this.torchFirePicHeight = 62;
	this.torchFirePicWidth = 64;
	this.torchFrames = 7;
	this.animCycle = 0;
	this.animCycleAdvance = startFrame;
		
	this.draw = function(){
		this.animCycle++;
		if(this.animCycle > 6){
			this.animCycle = 0;
			this.animCycleAdvance++
		}
		if(this.animCycleAdvance > this.torchFrames){
			this.animCycleAdvance = 0;
		}
			
		canvasContext.drawImage(torchFirePic,
			this.animCycleAdvance * this.torchFirePicWidth, 0, this.torchFirePicWidth, this.torchFirePicHeight, 
			this.x, this.y, this.torchFirePicWidth, this.torchFirePicHeight);
	}
}	
