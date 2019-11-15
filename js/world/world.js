const ISO_GRID_W = 50;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 35;
const ISO_TILE_DRAW_W = 50;
const ISO_TILE_DRAW_H = 50;
const ROOM_W = 50;
const ROOM_H = ROOM_W;
const ROOM_COLS = 40;
const ROOM_ROWS = 30;


var isoDrawX = 0;
var isoDrawY = 0;

var sharedAnimCycle = 0;

var levelList = [levelOne, levelTwo];
var levelNow = 0;
var roomGrid = [];

var levelOne = [
					 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11,36,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1, 1,
					 1,12, 5, 0,22, 0, 0,29,30, 0,18, 0,20, 0, 0, 0, 5, 5, 0,31,32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 2, 0, 0, 0,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1, 0, 0, 1, 1, 1, 1, 7, 1,11,43,11,44, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 6, 1, 
					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,13,26,10, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,13,24, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 6, 1, 1, 3,43, 1, 1, 1, 1, 7, 1,13, 0, 0,45,49,49,46, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 1, 1, 0,10, 1, 0,14,10,44,10,15, 0, 1,13,25, 0,52,51,51,53, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0,43, 0, 0, 0, 1, 5, 0, 0, 1,13, 0, 0,47,50,50,48, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 1, 1,45,46, 1, 0, 0, 0,44, 0, 0, 0, 1,13,22, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1,47,48, 1, 5, 0, 0,11, 0, 0, 0, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 1, 1, 0, 0, 1, 1, 1,11,44, 0, 0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 				
					 1, 0, 0, 1,13, 0, 4, 0, 0,44, 0,27, 0, 0, 0, 1,13, 0,10, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 1,13, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 1,13, 0, 0,54,58,58,55, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0,28,61,60,60,62, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
					 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,61,60,60,62, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,13, 0, 0,56,59,59,57, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,45,49,49,46, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,11, 0, 0, 0,52,51,51,53, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 8, 0, 0,52,51,51,53, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,11, 0, 0, 0,47,50,50,48, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
					 1, 0, 0, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
					];
					
var levelTwo = [
					37,38,37,38,37,38,37,38,37,38,37,38,37,38,37,38,37,37,37,37,37,38,37,38,37,38,37,38,37,38,37,38,37,38,37,38,37,38,37,37,
					37,39,39,39,39,39,39,37,39,39,39,39,39,39,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,39,39,39,37,39,39,39,39,39,39,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,39,39,39,37,39,39,39,39,39,39,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,39,39,39,38,37,38,37,38,37,39,39,37,37,37,37,39,37,37,37,37,37,37,42,42,36,36,39,36,42,36,42,42,36,42,42,37, 
					37,39,39,39,39,39,39,37,39,39,39,39,39,39,39,37,12,39,39,39,39,39,39,39,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,39,39,39,37,39,39,39,39,39,39,39,37, 2,35,39,39,33,39,33,35,39,37,39,35,39,39,39,39,35,39,39,39,39,35,39,37, 
					37,39,39,39,39,39,39,37, 3,37,37,37,37,37, 7,37,39,39,39,39,39,39,39,39,39,37,39,39,40,39,39,33,39,39,33,39,33,39,39,37, 
					37,39,39,39,37,37,37,37,39,14,10,37,10,15,39,37,39,39,39,39,34,39,33,39,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,37,39,39,39,39,39,39,37,39,39,39,37,39,39,39,39,39,39,39,39,39,37,39,39,33,39,39,33,39,39,33,39,33,39,39,37, 
					37,39,39,39,37,39,39,39,39, 8,39,37,39,39,39,37,39,35,39,39,33,39,33,35,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,37,39,39,39,39,39,39,37,39,39,39,37,39,39,39,39,39,39,39,39,39,37,39,35,33,39,39,33,35,39,33,39,33,35,39,37, 
					38,39,39,39,37,39,39,39,37,37,37,37, 8,39,39,37,37,37,37,39,37,37,37,37,37,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 				
					37,37,39,37,37,39,39,39,39,37,39,39,39,39,39,37,39,39,39,39,39,39,39,39,39,37,39,39,34,39,39,40,39,39,40,39,33,39,39,37, 
					38,39,39,39,37,39,39,39,39,37,39,39,39,39,39,37,39,35,33,39,33,39,33,35,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,37,37,37,37,39,37,37,37,37,37,37,37,39,39,39,39,39,39,39,39,39,37,39,39,34,39,39,33,39,39,33,39,33,39,39,37,
					37,39,39,39,37,37,37,37,39,37,37,37,37,37,37,37,39,39,33,39,33,39,34,39,39,37,39,35,39,39,39,39,35,39,39,39,39,35,39,37, 
					37,39,39,39,37,39,39,39,39,39,39,39,39,37,37,37,39,39,39,39,39,39,39,39,39,37,39,39,33,39,39,40,39,39,41,39,33,39,39,37, 
					37,39,39,39,37,39,39,39,39,39,39,39,39,37,37,37,39,35,33,39,34,39,33,35,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,37,39,39,39,39,39,39,39,39,37,37,37,39,39,39,39,39,39,39,39,39,37,39,39,33,39,39,33,39,39,33,39,33,39,39,37, 
					37,39,39,39,39,39,39,39,39,39,39,39,39,37,37,38,39,39,33,39,33,39,34,39,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,37,39,39,39,39,39,39,39,39,37,37,37,39,39,39,39,39,39,39,39,39,37,39,35,34,39,39,33,35,39,33,39,34,35,39,37, 
					37,39,39,39,37,39,39,39,39,39,39,39,39,37,37,38,39,35,33,39,33,39,33,35,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,37,37,37,37,39,37,37,37,37,37,37,37,39,39,39,39,39,39,39,39,39,37,39,39,34,39,39,33,39,39,33,39,33,39,39,37, 
					37,39,39,39,37,37,38,37,39,38,42,42,37,38,42,42,37,38,36,36,38,42,36,38,37,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,39,39,39,37,13,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,37,39,39,34,39,39,33,39,39,33,39,33,39,39,37,
					37,39,39,39,37,13,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,37,39,35,39,39,39,39,35,39,39,39,39,35,39,37, 
					37,39,39,39,37,37,37,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,34,39,39,33,39,39,33,39,33,39,39,37, 
					37,39,39,39,37,37,37,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,37,39,39,39,39,39,39,39,39,39,39,39,39,39,37, 
					37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37
					];
	//Tiles need to be moved to a Sprite Sheet
	//Action to be done after TILED is implemented
	const TILE_ROAD = 0;
	const TILE_WALL = 1;
	const TILE_PLAYER = 2;
	const TILE_YELLOW_DOOR = 3;
	const TILE_FINISH = 4;
	const TILE_YELLOW_KEY = 5;
	const TILE_RED_DOOR = 6;
	const TILE_BLUE_DOOR = 7;
	const TILE_TREASURE = 8;
	const TILE_GOBLIN = 9;
	const TILE_TABLE = 10;
	const TILE_WALL_WITH_TORCH = 11;
	const TILE_STAIRS = 12;
	const TILE_BOOKSHELF = 13;
	const TILE_FIRE_PLACE_LIT = 14;
	const TILE_FIRE_PLACE = 15;
	const TILE_ORC = 16;
	const TILE_OGRE = 17;
	const TILE_PITTRAP_ARMED = 18;
	const TILE_PITTRAP_UNARMED = 19;
	const TILE_SPIKES_ARMED = 20;
	const TILE_SPIKES_UNARMED = 21;
	const TILE_STAIRS_DOWN = 22;
	const TILE_RAT = 23;
	const TILE_WIZARD_BOOK = 24;
	const TILE_CLERIC_BOOK = 25;
	const TILE_SKILL_BOOK = 26;
	const TILE_SWORD = 27;
	const TILE_MACE = 28;
	const TILE_GOLD_COINS = 29;
	const TILE_SEWER = 30;
	const TILE_HEALING_POTION = 31;
	const TILE_MANA_POTION = 32;
	const TILE_TOMB = 33;
	const TILE_TOMB_2 = 34;
	const TILE_COLUMN = 35;
	const TILE_CRYPT = 36;
	const TILE_CRYPT_WALL = 37;
	const TILE_CRYPT_TORCH = 38;
	const TILE_CRYPT_FLOOR = 39;
	const TILE_TOMB_3 = 40;
	const TILE_TOMB_4 = 41;
	const TILE_CRYPT_BODY = 42;
	const TILE_WALL_ART = 43;
	const TILE_WALL_SHIELD = 44;
	const TILE_RED_RUG_TL = 45;
	const TILE_RED_RUG_TR = 46;
	const TILE_RED_RUG_BL = 47;
	const TILE_RED_RUG_BR = 48;
	const TILE_RED_RUG_TOP = 49;
	const TILE_RED_RUG_BOT = 50;
	const TILE_RED_RUG_CEN = 51;
	const TILE_RED_RUG_L = 52;
	const TILE_RED_RUG_R = 53;
	const TILE_BLUE_RUG_TL = 54;
	const TILE_BLUE_RUG_TR = 55;
	const TILE_BLUE_RUG_BL = 56;
	const TILE_BLUE_RUG_BR = 57;
	const TILE_BLUE_RUG_TOP = 58;
	const TILE_BLUE_RUG_BOT = 59;
	const TILE_BLUE_RUG_CEN = 60;
	const TILE_BLUE_RUG_L = 61;
	const TILE_BLUE_RUG_R = 62;
	
	
function gameCoordToIsoCoord (pixelX, pixelY){
	var camPanX = -350;
	var camPanY = 0;
	var tileCFraction = pixelX / ROOM_W;
	var tileRFraction = pixelY / ROOM_H;
	
	isoDrawX = -camPanX + tileCFraction * (ISO_GRID_W/2) - tileRFraction * (ISO_GRID_W/2);
	isoDrawY = -camPanY + tileCFraction * (ISO_GRID_H/2) + tileRFraction * (ISO_GRID_H/2);
}	

function tileCoordToIsoCoord(tileC, tileR ){
	gameCoordToIsoCoord(tileC * ROOM_W, tileR * ROOM_H);
}
					
function drawDungeon(){
	var tileIndex = 0;
	var tileLeftEdgeX = 700
	var tileTopEdgeY = 0;
	var isoTileLeftEdgeX = 0;
	var isoTileTopEdgeY = 0;
	var miniMapX = 750;
	var miniMapY = 2;
	sharedAnimCycle++;
	
	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 7;
		miniMapX = 730;
		
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
			var tileTypeHere = roomGrid[tileIndex];
			tileLeftEdgeX += ROOM_W;
			miniMapX += 4;
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
			isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
			tileCoordToIsoCoord(eachCol, eachRow);	
			
			if( tileTypeHasRoadTransparency(tileTypeHere) ) {
				canvasContext.drawImage(trackPics[TILE_ROAD], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
			}
			if( tileTypeHasCryptFloorTransparency(tileTypeHere) ) {
				canvasContext.drawImage(trackPics[TILE_CRYPT_FLOOR], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
			}
			if( tileTypeHasWallTransparency(tileTypeHere) ) {
				canvasContext.drawImage(trackPics[TILE_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
			}
			//need a helper function here to eliminate the else if
			if(tileTypeHere == TILE_WALL_WITH_TORCH){
				canvasContext.drawImage(trackPics[TILE_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				
				var torchFrames = 4;
				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;
				
				canvasContext.drawImage(trackPics[TILE_WALL_WITH_TORCH],
				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
			} else if (tileTypeHere == TILE_CRYPT_TORCH){
				canvasContext.drawImage(trackPics[TILE_CRYPT_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				
				var torchFrames = 4;
				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;
				
				canvasContext.drawImage(trackPics[TILE_WALL_WITH_TORCH],
				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
			} else if(tileTypeHere == TILE_GOLD_COINS){
				canvasContext.drawImage(trackPics[TILE_ROAD], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				
				var torchFrames = 4;
				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;
				
				canvasContext.drawImage(trackPics[TILE_GOLD_COINS],
				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
					

			} else if (tileTypeHere == TILE_FIRE_PLACE_LIT){
				canvasContext.drawImage(trackPics[TILE_ROAD], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				
				var torchFrames = 4;
				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;
				
				canvasContext.drawImage(trackPics[TILE_FIRE_PLACE_LIT],
				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
				
			} else {
				canvasContext.drawImage(trackPics[tileTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				if(displayTileX_Y){
					//colorText("X: " + isoDrawX + " Y: " + isoDrawY, isoDrawX, isoDrawY, "black", "6px Arial Black");
					colorText("X: " + isoDrawX, isoDrawX, isoDrawY, "black", "6px Arial Black");
				}
			}
			//minimap:  This needs refactored 
			/*
			if(tileTypeHere == 0){
				colorRect(miniMapX, miniMapY, 4, 4, "white");
			} else if (tileTypeHere == 1 || tileTypeHere == 11 || tileTypeHere == 12 ){
				colorRect(miniMapX, miniMapY, 4, 4, "gray");
			} else if (tileTypeHere == 3 || tileTypeHere == 6 || tileTypeHere == 7){
				colorRect(miniMapX, miniMapY, 4, 4, "blue");
			} else if (tileTypeHere == 4 || tileTypeHere == 8){
				colorRect(miniMapX, miniMapY, 4, 4, "purple");
			} else if (tileTypeHere == 5){
				colorRect(miniMapX, miniMapY, 4, 4, "orange");		
			} */ 
			tileIndex++;
		} // end of each col
		miniMapY += 4;
		tileTopEdgeY += ROOM_H;
	} // end of each row
}

function tileTypeHasRoadTransparency(checkTileType) {
	return (checkTileType == TILE_BOOKSHELF ||
			checkTileType == TILE_PITTRAP_UNARMED ||
			checkTileType == TILE_SPIKES_UNARMED ||
			checkTileType == TILE_WIZARD_BOOK ||
			checkTileType == TILE_CLERIC_BOOK ||
			checkTileType == TILE_SKILL_BOOK ||
			checkTileType == TILE_SWORD ||
			checkTileType == TILE_MACE ||
			checkTileType == TILE_SEWER ||
			checkTileType == TILE_HEALING_POTION ||
			checkTileType == TILE_MANA_POTION ||
			checkTileType == TILE_TOMB ||
			checkTileType == TILE_TOMB_2 ||
			checkTileType == TILE_COLUMN
			);
}


function tileTypeHasWallTransparency(checkTileType) {
	return (checkTileType == TILE_WALL_ART ||
			checkTileType == TILE_WALL_SHIELD
			);
}

function tileTypeHasCryptFloorTransparency(checkTileType) {
	return (checkTileType == TILE_TOMB ||
			checkTileType == TILE_TOMB_2 ||
			checkTileType == TILE_TOMB_3 ||
			checkTileType == TILE_TOMB_4 ||
			checkTileType == TILE_COLUMN
			);
}

function isWallAtTileCoord(trackTileCol, trackTileRow){
				var tileIndex = roomTileToIndex(tileCol, tileRow);
				return tileIndex;
}

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}			
		
function getTileIndexAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / ROOM_W;		
	var tileRow = pixelY / ROOM_H;
					
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow); 
	//console.log("X: "+pixelX+ " Y: "+pixelY+ " col: " + tileCol + " row: " + tileRow);
				
	if(tileCol < 0 || tileCol >= ROOM_COLS || 
		tileRow < 0 || tileRow >= ROOM_ROWS) {
		document.getElementById("debugText").innerHTML = "out of bounds: " +pixelX+", "+pixelY;
		return undefined; // checking for out of bounds 
	}
				
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
}		

			
function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + ROOM_COLS*tileRow);
}
			