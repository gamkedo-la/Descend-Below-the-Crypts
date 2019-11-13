var warriorBoxX = 106;
var warriorBoxY = 313;
var wizardBoxX = 338;
var wizardBoxY = 313;
var clericBoxX = 570;
var clericBoxY = 313;
var characterBoxWidth = 155;
var characterBoxHeight = 205;
var characterDisplayMessageOn = false;
var characterDescription = "";
var torch1 = new torchFireClass(16, 305, 0);
var torch2 = new torchFireClass(260, 305, 2);
var torch3 = new torchFireClass(495, 305, 1);
var torch4 = new torchFireClass(735, 305, 3);
var torch5 = new torchFireClass(450, 415, 3);

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
	
	torch1.draw();
	torch2.draw();
	torch3.draw();
	torch4.draw();
	
	/*
	var torchFirePicWidth = 64;
	var torchFirePicHeight = 62;
	sharedAnimCycle++;
	
	canvasContext.drawImage(torchFirePic,
				animOffset * torchFirePicWidth, 0, torchFirePicWidth, torchFirePicHeight, 
				16, 305, torchFirePicWidth, torchFirePicHeight);

	canvasContext.drawImage(torchFirePic,
				animOffset * torchFirePicWidth, 0, torchFirePicWidth, torchFirePicHeight, 
				260, 305, torchFirePicWidth, torchFirePicHeight);
				
	canvasContext.drawImage(torchFirePic,
				animOffset * torchFirePicWidth, 0, torchFirePicWidth, torchFirePicHeight, 
				495, 305, torchFirePicWidth, torchFirePicHeight);

	canvasContext.drawImage(torchFirePic,
				animOffset * torchFirePicWidth, 0, torchFirePicWidth, torchFirePicHeight, 
				735, 305, torchFirePicWidth, torchFirePicHeight);
	*/
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
			
function torchFireClass(xPos, yPos, startFrame){
	this.x = xPos;
	this.y = yPos;
	this.torchFirePicHeight = 62;
	this.torchFirePicWidth = 64;
	this.torchFrames = 3;
	this.animCycle = 0;
	this.animCycleAdvance = startFrame;
		
	this.draw = function(){
		this.animCycle++;
		if(this.animCycle > 5){
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
