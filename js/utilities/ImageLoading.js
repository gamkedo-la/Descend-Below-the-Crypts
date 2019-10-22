var warriorPic = document.createElement("img");
var goblinPic = document.createElement("img");
var orcPic = document.createElement("img");
var ogrePic = document.createElement("img");
var ratPic = document.createElement("img");
var spiderPic = document.createElement("img");
var shadowPic = document.createElement("img");
var feedbackGUIPic = document.createElement("img");
var healthbarPic = document.createElement("img");
var characterSelectionBackgroundPic = document.createElement("img");


//var titlepagePic = document.createElement("img");
var trackPics = [];


var picsToLoad = 0;

//All pictures prior to launching the game.  If a picture doesn't load, the game doesn't launch.
function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		//console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForRoomCode(trackCode, fileName)  {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);	
}

//All images are loaded here.  varNames are for any pictures that are not tiles.
function loadImages() {
	
		var imageList = [
			//characters
			{varName: warriorPic, theFile: "warrior.png"},
			{varName: orcPic, theFile: "monsters/orc.png"},
			{varName: goblinPic, theFile: "monsters/goblin.png"},
			{varName: ogrePic, theFile: "monsters/ogre.png"},
			{varName: ratPic, theFile: "monsters/rat.png"},
			{varName: spiderPic, theFile: "monsters/spider.png"},
			{varName: shadowPic, theFile: "shadow.png"},
			{varName: feedbackGUIPic, theFile: "feedbackGUI.png"},
			{varName: healthbarPic, theFile: "healthbar.png"},
			{varName: characterSelectionBackgroundPic, theFile: "gameStates/characterSelectionPage.png"},

			
			{trackType: TILE_ROAD, theFile: "track_road.png"},
			{trackType: TILE_WALL, theFile:  "track_wall.png"},	
			{trackType: TILE_WALL_WITH_TORCH, theFile:  "track_wall_with_torch.png"},
			{trackType: TILE_YELLOW_DOOR, theFile:  "track_yellowdoor.png"},
			{trackType: TILE_RED_DOOR, theFile:  "track_reddoor.png"},		
			{trackType: TILE_BLUE_DOOR, theFile:  "track_bluedoor.png"},				
			{trackType: TILE_YELLOW_KEY, theFile:  "track_yellowkey.png"},			
			{trackType: TILE_TREASURE, theFile:  "track_treasure.png"},
			{trackType: TILE_TABLE, theFile:  "track_table.png"},
			{trackType: TILE_FINISH, theFile: "track_finish.png"},
			{trackType: TILE_STAIRS, theFile: "track_stairs.png"},
			{trackType: TILE_BOOKSHELF, theFile: "track_bookshelf.png"},
			{trackType: TILE_FIRE_PLACE_LIT, theFile: "track_fireplace.png"},
			{trackType: TILE_FIRE_PLACE, theFile: "track_fireplaceNotLit.png"},
			{trackType: TILE_PITTRAP_ARMED, theFile: "track_road.png"},
			{trackType: TILE_PITTRAP_UNARMED, theFile: "track_pittrap.png"},
			{trackType: TILE_SPIKES_ARMED, theFile: "track_road.png"},
			{trackType: TILE_SPIKES_UNARMED, theFile: "track_spikes.png"},
			{trackType: TILE_WIZARD_BOOK, theFile: "wizardBook.png"},
			{trackType: TILE_CLERIC_BOOK, theFile: "clericBook.png"},
			{trackType: TILE_SKILL_BOOK, theFile: "skillBook.png"},
			{trackType: TILE_STAIRS_DOWN, theFile: "stairsDown.png"}
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].trackType != undefined){
			loadImageForRoomCode(imageList[i].trackType, imageList[i].theFile);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}