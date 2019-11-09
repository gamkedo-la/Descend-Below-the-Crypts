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
		displayCharacterDescription("A religious man who does what is right...");
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
	if(characterDisplayMessageOn){
		console.log("worked");
	}
	
	var torchFrames = 3;
	var animOffset = 1 + Math.floor(sharedAnimCycle * 0.1)  % torchFrames;
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
			