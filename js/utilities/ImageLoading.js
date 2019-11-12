//characters
var warriorPic = document.createElement("img");
var wizardPic =  document.createElement("img");
var clericPic =  document.createElement("img");
var warriorProfilePic = document.createElement("img");
var wizardProfilePic = document.createElement("img");
var clericProfilePic = document.createElement("img");
//enemies
var goblinPic = document.createElement("img");
var orcPic = document.createElement("img");
var ogrePic = document.createElement("img");
var ratPic = document.createElement("img");
var spiderPic = document.createElement("img");
//Game States
var characterSelectionBackgroundPic = document.createElement("img");
var torchFirePic = document.createElement("img");
//var titlepagePic = document.createElement("img");

//misc
var shadowPic = document.createElement("img");
var feedbackGUIPic = document.createElement("img");
var healthbarPic = document.createElement("img");
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
			{varName: wizardPic, theFile: "wizard.png"},
			{varName: clericPic, theFile: "cleric.png"},
			//enemies
			{varName: orcPic, theFile: "monsters/orc1.png"},
			{varName: goblinPic, theFile: "monsters/goblin.png"},
			{varName: ogrePic, theFile: "monsters/ogre.png"},
			{varName: ratPic, theFile: "monsters/spider.png"},
			{varName: spiderPic, theFile: "monsters/spider.png"},
			//misc
			{varName: shadowPic, theFile: "shadow.png"},
			{varName: feedbackGUIPic, theFile: "feedbackGUI.png"},
			{varName: healthbarPic, theFile: "healthbar.png"},
			{varName: characterSelectionBackgroundPic, theFile: "gameStates/characterSelectionPage.png"},
			{varName: torchFirePic, theFile: "gameStates/torchFire.png"},
			{varName: warriorProfilePic, theFile: "profilePics/warriorProfilePic.png"},
			{varName: wizardProfilePic, theFile: "profilePics/wizardProfilePic.png"},
			{varName: clericProfilePic, theFile: "profilePics/clericProfilePic.png"},	
			
			//tiles
			{tileType: TILE_ROAD, theFile: "track_road.png"},
			{tileType: TILE_CRYPT_FLOOR, theFile: "track_crypt_floor.png"},
			{tileType: TILE_WALL, theFile:  "track_wall.png"},	
			{tileType: TILE_CRYPT_WALL, theFile:  "track_crypt_wall.png"},	
			{tileType: TILE_WALL_WITH_TORCH, theFile:  "track_wall_with_torch.png"},
			{tileType: TILE_CRYPT_TORCH, theFile:  "track_wall_with_torch.png"},
			{tileType: TILE_YELLOW_DOOR, theFile:  "track_yellowdoor.png"},
			{tileType: TILE_RED_DOOR, theFile:  "track_reddoor.png"},		
			{tileType: TILE_BLUE_DOOR, theFile:  "track_bluedoor.png"},				
			{tileType: TILE_YELLOW_KEY, theFile:  "track_yellowkey.png"},			
			{tileType: TILE_TREASURE, theFile:  "track_treasure.png"},
			{tileType: TILE_TABLE, theFile:  "track_table.png"},
			{tileType: TILE_FINISH, theFile: "track_finish.png"},
			{tileType: TILE_STAIRS, theFile: "track_stairs.png"},
			{tileType: TILE_BOOKSHELF, theFile: "track_bookshelf.png"},
			{tileType: TILE_FIRE_PLACE_LIT, theFile: "track_fireplace.png"},
			{tileType: TILE_FIRE_PLACE, theFile: "track_fireplaceNotLit.png"},
			{tileType: TILE_PITTRAP_ARMED, theFile: "track_road.png"},
			{tileType: TILE_PITTRAP_UNARMED, theFile: "track_pittrap.png"},
			{tileType: TILE_SPIKES_ARMED, theFile: "track_road.png"},
			{tileType: TILE_SPIKES_UNARMED, theFile: "track_spikes.png"},
			{tileType: TILE_WIZARD_BOOK, theFile: "wizardBook.png"},
			{tileType: TILE_CLERIC_BOOK, theFile: "clericBook.png"},
			{tileType: TILE_SKILL_BOOK, theFile: "skillBook.png"},
			{tileType: TILE_STAIRS_DOWN, theFile: "stairsDown.png"},
			{tileType: TILE_SWORD, theFile: "sword.png"},
			{tileType: TILE_MACE, theFile: "mace.png"},
			{tileType: TILE_GOLD_COINS, theFile: "goldCoins.png"},
			{tileType: TILE_HEALING_POTION, theFile: "potion1.png"},
			{tileType: TILE_MANA_POTION, theFile: "potion2.png"},
			{tileType: TILE_SEWER, theFile: "sewer.png"},
			{tileType: TILE_TOMB, theFile: "tomb.png"},
			{tileType: TILE_TOMB_2, theFile: "tomb2.png"},
			{tileType: TILE_TOMB_3, theFile: "tomb3.png"},
			{tileType: TILE_TOMB_4, theFile: "tomb4.png"},
			{tileType: TILE_COLUMN, theFile: "column.png"},
			{tileType: TILE_CRYPT, theFile: "crypt.png"},
			{tileType: TILE_CRYPT_BODY, theFile: "cryptBody.png"},
			{tileType: TILE_WALL_ART, theFile: "wallArt.png"},
			{tileType: TILE_WALL_SHIELD, theFile: "shieldOnWall.png"},
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].tileType != undefined){
			loadImageForRoomCode(imageList[i].tileType, imageList[i].theFile);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}