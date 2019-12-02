//characters
var warriorPic = document.createElement("img");
var wizardPic =  document.createElement("img");
var clericPic =  document.createElement("img");
var warriorProfilePic = document.createElement("img");
var warriorEyesPic = document.createElement("img");
var wizardProfilePic = document.createElement("img");
var wizardEyesPic = document.createElement("img");
var clericProfilePic = document.createElement("img");
var clericEyesPic = document.createElement("img");
//enemies
var goblinPic = document.createElement("img");
var orcPic = document.createElement("img");
var ogrePic = document.createElement("img");
var ratPic = document.createElement("img");
var spiderPic = document.createElement("img");
//Game States
var characterSelectionBackgroundPic = document.createElement("img");
var leftDoorOpenningPic = document.createElement("img");
var rightDoorOpenningPic = document.createElement("img");
var torchFirePic = document.createElement("img");
var mainMenuPic = document.createElement("img");
var menuScreenPic = document.createElement("img");
var instructionScreenPic = document.createElement("img");
var titleBarPic = document.createElement("img");

//misc
var shadowPic = document.createElement("img");
var feedbackGUIPic = document.createElement("img");
var healthbarPic = document.createElement("img");
var trackPics = [];
var picsToLoad = 0;

// HUD
var healthHUD = document.createElement("img");
var manaHUD = document.createElement("img");
var inventoryHUD = document.createElement("img");
var goldHUD = document.createElement("img");
var keyHUD = document.createElement("img");

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
			{varName: goblinPic, theFile: "monsters/goblinAnim.png"},
			{varName: ogrePic, theFile: "monsters/ogre.png"},
			{varName: ratPic, theFile: "monsters/spider.png"},
			{varName: spiderPic, theFile: "monsters/spider.png"},
			//misc
			{varName: shadowPic, theFile: "shadow.png"},
			{varName: feedbackGUIPic, theFile: "feedbackGUI.png"},
			{varName: healthbarPic, theFile: "healthbar.png"},
			{varName: characterSelectionBackgroundPic, theFile: "gameStates/characterSelectionPage.png"},
			{varName: mainMenuPic, theFile: "gameStates/titleScreen.png"},
			{varName: leftDoorOpenningPic, theFile: "gameStates/leftDoor.png"},
			{varName: rightDoorOpenningPic, theFile: "gameStates/rightDoor.png"},
			{varName: titleBarPic, theFile: "gameStates/titleBar.png"},
			{varName: menuScreenPic, theFile: "gameStates/menuScreen.png"},
			{varName: instructionScreenPic, theFile: "gameStates/InstructionScreen.png"},
			{varName: torchFirePic, theFile: "gameStates/torchFire.png"},
			{varName: warriorProfilePic, theFile: "profilePics/warrior/warriorProfilePic.png"},
			{varName: warriorEyesPic, theFile: "profilePics/warrior/eyes.png"},
			{varName: wizardProfilePic, theFile: "profilePics/wizard/wizardProfilePic.png"},
			{varName: wizardEyesPic, theFile: "profilePics/wizard/eyes.png"},
			{varName: clericProfilePic, theFile: "profilePics/cleric/clericProfilePic.png"},
			{varName: clericEyesPic, theFile: "profilePics/cleric/eyes.png"},
			
			// HUD
			{varName: healthHUD, theFile: "HUD/healthHUD.png"},
			{varName: manaHUD, theFile: "HUD/manaHUD.png"},
			{varName: inventoryHUD, theFile: "HUD/inventory.png"},
			{varName: goldHUD, theFile: "HUD/goldIcon.png"},
			{varName: keyHUD, theFile: "HUD/keyIcon.png"},

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
			{tileType: TILE_YELLOW_KEY, theFile:  "track_yellowKey.png"},
			{tileType: TILE_TREASURE, theFile:  "track_treasure.png"},
			{tileType: TILE_TABLE, theFile:  "track_table.png"},
			{tileType: TILE_TABLE_2, theFile:  "table2.png"},
			{tileType: TILE_TABLE_3, theFile:  "table2.png"},
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
			{tileType: TILE_RED_RUG_BL, theFile: "track_rug_bottom_left.png"},
			{tileType: TILE_RED_RUG_TR, theFile: "track_rug_top_right.png"},
			{tileType: TILE_RED_RUG_TL, theFile: "track_rug_top_left.png"},
			{tileType: TILE_RED_RUG_BR, theFile: "track_rug_bottom_right.png"},
			{tileType: TILE_RED_RUG_TOP, theFile: "track_rug_top.png"},
			{tileType: TILE_RED_RUG_BOT, theFile: "track_rug_bottom.png"},
			{tileType: TILE_RED_RUG_CEN, theFile: "track_rug.png"},
			{tileType: TILE_RED_RUG_L, theFile: "track_rug_left.png"},
			{tileType: TILE_RED_RUG_R, theFile: "track_rug_right.png"},
			{tileType: TILE_BLUE_RUG_BL, theFile: "track_blue_rug_bottom_left.png"},
			{tileType: TILE_BLUE_RUG_TR, theFile: "track_blue_rug_top_right.png"},
			{tileType: TILE_BLUE_RUG_TL, theFile: "track_blue_rug_top_left.png"},
			{tileType: TILE_BLUE_RUG_BR, theFile: "track_blue_rug_bottom_right.png"},
			{tileType: TILE_BLUE_RUG_TOP, theFile: "track_blue_rug_top.png"},
			{tileType: TILE_BLUE_RUG_BOT, theFile: "track_blue_rug_bottom.png"},
			{tileType: TILE_BLUE_RUG_CEN, theFile: "track_blue_rug.png"},
			{tileType: TILE_BLUE_RUG_L, theFile: "track_blue_rug_left.png"},
			{tileType: TILE_BLUE_RUG_R, theFile: "track_blue_rug_right.png"},
			{tileType: TILE_GREEN_RUG_BL, theFile: "track_green_rug_bottom_left.png"},
			{tileType: TILE_GREEN_RUG_TR, theFile: "track_green_rug_top_right.png"},
			{tileType: TILE_GREEN_RUG_TL, theFile: "track_green_rug_top_left.png"},
			{tileType: TILE_GREEN_RUG_BR, theFile: "track_green_rug_bottom_right.png"},
			{tileType: TILE_GREEN_RUG_TOP, theFile: "track_green_rug_top.png"},
			{tileType: TILE_GREEN_RUG_BOT, theFile: "track_green_rug_bottom.png"},
			{tileType: TILE_GREEN_RUG_CEN, theFile: "track_green_rug.png"},
			{tileType: TILE_GREEN_RUG_L, theFile: "track_green_rug_left.png"},
			{tileType: TILE_GREEN_RUG_R, theFile: "track_green_rug_right.png"},
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
