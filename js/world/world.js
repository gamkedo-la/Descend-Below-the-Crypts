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

var townArea = [
					110,105,105,105,105,105,111, 85, 85, 85, 85, 85,110,105,105,105,105,105,105,105,105,105,105,105,105,105,105,111, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					108, 93,  2, 10,100,  0,109, 85, 85, 85, 85, 85,108,100,100,  4,100,100,100, 98,  0, 86, 93,  0, 10,100,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					108,  0, 54, 58, 55,117,109, 89, 85, 89, 89, 89,108, 45, 49, 49, 49, 46,126, 98,  0, 86, 45, 49, 49, 46,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					108,  0, 56, 59, 57,  0,109, 85, 89, 85, 89, 85,108, 52, 51, 51, 51, 53,  0,  0,  0, 86, 52, 51, 51, 53,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					108,  0,  0, 18,  0,  0,109, 85, 85, 85, 85, 85,108, 47, 50, 50, 50, 48,  0, 98,  0,  0, 47, 50, 50, 48,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					108,  0,  0,  0, 22,  0,109, 90, 85, 85, 85, 85,108,  0,  0,  0,  0,  0,  0, 98,  0, 86,  0,  0,  0,  0,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					108,106,106,  0,106,106,109, 85, 85, 85, 85, 85,108,106,106,  0,106,106,106,106,106, 86,106,106,106,106,106,109, 85, 85, 95, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 91, 92, 87, 92, 92, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 87, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 92, 92, 92, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 91, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 92, 92, 92, 92, 92, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 95, 85, 85, 85,110,105,105,  0,105,105,105,105,105,105,105,105,105,105,105,111, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,108, 13,119,  0,100,100,100, 98,  0, 86, 93, 65, 69, 66,100,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,108, 13, 65, 69, 69, 66,125, 98,  0, 86,  0, 72, 71, 73,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,108, 13, 72, 71, 71, 73,  0, 99,  0, 86,  0, 72, 71, 73,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,108, 13, 72, 71, 71, 73,  0, 98,  0, 86,  0, 72, 71, 73,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,108, 13, 67, 70, 70, 68,  0, 99,  0, 86,  0, 67, 70, 68,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,108, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0,   0,  0,  0,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,108,106,106,106,106,106,106,106,106,106,106,106,106,106,106,109, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 87, 85, 85, 85, 85, 85, 85,
					  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 87,  1,  1,  1,  1,  1,  1,
					  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 22,  1,  1,  1,  1,  1,  1,
					];

var castleLevel = [  // levelOne - Castle
					  1,  1,  1, 11,  1,  1,  1, 11,  1,  1,  1, 11,  1,  1, 36, 11,  1,  1,  1, 11,  1,  1,  1, 11,  1,  1,  1, 11,  1,  1,  1, 11,  1,  1,  1, 11,  1,  1,  1,  1,
					  1, 12,  5,  0,  0,  0,  0, 18,  0,118,  0,  0,  0,  0,  0,  0,  5,  5,  0, 31, 32,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 82,  1,
					 11,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  0,  5,  0,  0,  0,  0, 79,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
					  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
					  1,  1,  1, 11,  1,  1,  1, 11,  1,  1,  1, 11,  1,  0,  0,  1,  1,  1,  1,  3,  1, 11, 43, 11, 44,  1,  1,  1,  1,  1,  3,  1,  1,  1,  1,  1,  1,  1,  3,  1,
					  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 13, 26, 10,  0,102,  0,  0,  0, 82,  1, 81,  0,  0,  0,  0,  0,  1,119,  8,  0,  0,  0,  0,  1,
					  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  9,  1, 13, 24,  0,  0,103,  0,  0,  0,  0,  1,  0,  0,101,  0,  0,  0,  1,117,  0,  0,  0,  0,  0,  1,
					  1,  0,  0,  1,  1,  3,  1,  1,  3, 43,  1,  1,  1,  1,  3,  1, 13,  0,  0, 45, 49, 49, 46,  0,  0,  1,120,  0,  0,  0,  0,  0,  1,117,  0,  0,  0,  0,  0,  1,
					 11,  9,  9,  1,  1,  0, 10,  1,  0, 14, 10, 44, 10, 15,  0,  1, 13, 25,  0, 52, 63, 51, 53,  0,  0,  1,120,  0,  0,  0,  0,  0,  1,119,  0,  9,  9,  0,  0,  1,
					  1,  0,  0,  1,  1,  0,  0, 43,  0,  0,  0,  1,  5,  0,  0,  1, 13,  0,  0, 47, 50, 50, 48,  0,  0, 43,  0,  0,  0,  0,  0,  0,  1,117,  0,  0,  0,  0,  0,  1,
					  1,  0,  0,  1,  1, 45, 46,  1,  0,  0,  0, 44,  0,  0,  0,  1, 13,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,119,  0,  0,  0,  0,  0,  1,
					  1,  0,  0,  1,  1, 47, 48,  1,  5,  0,  0, 11,  0,  0,  0,  1, 13,  0,  0,  0,  9,  9,  0,  0,  0,  1,120,  0,  0,  9,  9,  0,  1,119,  0,  0,  0,  0,  0,  1,
					 11,  0,  0,  1,  1,  0,  0,  1,  1,  1, 11, 44,  0,  0,  0,  1,  1,  1,  1,  3,  1,  1,  1,  1,  1,  1,120,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,
					  1,  0,  0,  1, 13,  0,  4,  0,  0, 44,  0, 27,  0,  0,  0,  1, 13,  0, 10,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,
					  1,  0,  0,  1, 13,  0,  0,  0,  0,  1,  0,  0,  0,  0,  5,  1, 13,  0,  0, 54, 58, 58, 55,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,
					  1,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 13,  0, 28, 61, 64, 60, 62,  0,  0,  1,120,  0,  0, 16,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,
					 11,  0,  0,  1,  1,  1, 44, 88,  1, 88, 44,  1,  1,  1,  1,  1, 13,  0,  0, 61, 64, 60, 62,  0,  0,  1,120,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,
					  1,  0,  0,  1,  1, 81,  0,  0, 97,  0,  8,  0, 82,  1,  1,  1, 13,  0,  0, 56, 59, 59, 57,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0, 16,  0, 16,  0,  1,
					  1,  0,  0,  1,  1,  0, 84, 65, 69, 69, 66, 84,  0,  1,  1,  1, 13,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  9,  0,  0,  1,
					  1,  0,  0,  1, 11,  0,  0, 72, 71, 71, 73,  0,  0, 11,  1,  1,  0,  0,  0, 45, 49, 49, 46,  0,  0,  1,120,  0,  0,  0,  0,  0,  1,  0,  0,  0,  9,  0,  0,  1,
					 11,  0,  0,  1, 11,  0, 96, 72, 71, 71, 73,  0,  0, 11,  1, 11,  0,  0,  0, 52, 63, 51, 53,  0,  0,  1,120,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,
					  1,  1,  6,  1,  1,  0, 84, 67, 70, 70, 68, 84,  0,  1,  1,  1,  0,  0,  0, 52, 63, 51, 53,  0,  0,  1,  1,  3,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1,  1,  1,
					  1,  0,  0,  1,  1, 80,  0,  0,  0,  0,  0,  0, 83,  1,  1, 11,  0,  0,  0, 47, 50, 50, 48,  0,  0, 43,117,  0,  0,119,119,118,  0,  0,  0,  0,  0,  0,  0,  1,
					  1,  0,  0,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1, 80,  0,  0,  0,  0,  0,  0,  0,  0,  1,117,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
					 11,  0,  0,  1,  1,  1,  1,  1,  7,  1,  1 , 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  6,  1,117,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
					  1, 22,  0,  1,  1, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  1,117,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  1,
					  1,  0,  0,  1,  1, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  1,117,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  1,
					  1,  0,  0,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  1,117,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  1,
					 11,  0,  0,  1,  1,  1,  1, 80,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 83,  1, 80,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
					  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					];

var levelCryptIntro = [  // levelCryptIntro - Crypt
					 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 1,
					 1,  1,  1, 39, 12, 39,  1, 33, 33, 39, 33, 33, 39, 33, 33, 39, 39, 39, 39, 39, 39, 33, 33, 39, 39, 39, 39, 33, 39, 33, 39, 33, 39, 33, 33, 31, 33, 33,  5, 1,
					 1,  1,  1, 39,  2, 39,  1, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 33, 33, 39, 39, 39, 39, 39, 39, 39, 39, 33, 39, 33, 39, 33, 39, 39, 39, 39, 39, 39, 39, 1,
					 1,  1,  1, 39, 39, 39,  1, 33, 33, 39, 33, 33, 39, 39, 39,  1,  1,  1,  1,  1,  1,  1,  1,  7,  1, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,  1,  1,  1,  1, 1,
					 1,  1,  1, 39, 39, 39,  1, 39, 39, 39, 39, 39, 39, 39, 39,  1, 39, 39, 39,  1, 31, 39, 39, 39,  1, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 33, 39, 33, 39, 1,
					 1, 39, 39, 39, 39,  1,  1, 39, 39, 39, 39, 39, 39, 39, 39,122, 39, 22, 39,  1, 32, 39, 39, 39,  1, 33, 39, 33, 39, 33, 39, 33, 39, 39, 39, 33, 39, 33, 39, 1,
					 1,116, 39, 39, 39,  1,  1,  1, 39, 39, 33, 33, 39, 39, 39,  1, 39, 39, 39,  1, 39,  5, 39, 39,  1, 33, 39, 33, 39, 33, 39, 33, 39, 39, 39, 39, 39, 39, 39, 1,
					 1, 39, 39, 39, 39,  1, 33, 33, 39, 39, 39, 39,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 33, 39, 33, 39, 39, 1,
					 1, 39, 39, 33, 33,  1, 39, 39, 39, 39, 33, 33,  1, 33, 33, 39, 33, 33, 39, 33, 33, 39, 33, 33, 39,  1, 33, 39, 33,  1, 33, 39, 33,  1, 33, 39, 33, 39, 39, 1,
					 1, 39, 39, 39, 39,  1, 39, 33,  1,  1,  1,  1,  1, 33, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,  1,  1, 33,116, 33,  1, 33, 39, 33,  1,  1,  1,  1,  1, 39, 1,
					 1, 39, 39, 33, 33,  1, 39, 33,  1, 39, 33, 33, 39, 33, 33, 39, 33, 33, 39, 33, 33, 39, 33, 33, 39,  1, 39, 39, 39,  1, 39, 39, 39,  1, 31, 39, 39, 39, 39, 1,
					 1, 39, 39, 39, 39,  1, 39, 39,  1,  5, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,  1, 39, 39, 39,  1, 39, 39, 39,  1, 39, 39, 39, 39, 39, 1,
					 1, 39, 39, 33, 33,  1, 39, 33,  1, 39, 33, 33, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,  1, 39, 39, 39,  1, 39, 39, 39,  1, 39, 39, 39, 39, 39, 1,
					 1,116, 39, 39, 39,  1, 39, 33,  1,  5, 39, 39, 39,116, 39, 39, 39, 39, 39, 39, 39, 39, 39,116, 39,122, 39,116, 39,122, 39, 39, 39,122, 39, 39, 39, 39, 39, 1,
					 1, 39, 39, 33, 33,  1, 39, 39,  1, 39, 33, 33, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,  1, 39, 39, 39,  1, 39, 39, 39,  1, 39, 39, 39, 39, 39, 1,
					 1, 39, 39, 39,  5,  1, 39, 33,  1,  5, 39, 39, 39, 39, 39, 39, 39,116, 39, 39, 39, 39, 39, 39, 39,  1, 39,116, 39,  1, 39, 39, 39,  1, 39, 39, 39, 39, 39, 1,
					 1, 39, 39, 33, 33,  1, 39, 33,  1, 39, 33, 33, 39, 33, 33, 39, 33, 33, 39, 39, 39, 39, 33, 33, 39,  1, 39, 39, 39,  1, 39, 39, 39,  1,  7,  1,  1,  1,  1, 1,
					 1, 39, 39, 39, 39,  1, 39,  1,  1,  1,  1,  1,  1, 39, 39, 39, 39, 39, 39, 33, 39, 39, 39, 39,  1,  1, 33, 39, 33,  1, 33, 39, 33,  1, 39, 39, 39, 33, 33, 1,
					 1, 39, 39, 33, 33,  1, 39,  1, 39, 33,  5, 31,  1, 33, 33, 39, 33, 33, 39, 33, 39, 39, 33, 33, 39,  1, 33, 39, 33,  1, 33, 39, 33,  1, 39, 39, 39, 39, 39, 1,
					 1, 39, 39, 39, 39,  1, 39,  1, 39, 33, 39, 33,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 39, 33, 33, 39, 39, 1,
					 1, 39, 39, 33, 33,  1, 31,  1, 39, 39, 39, 33, 39, 39,  1, 33, 39, 33, 39, 33,  5,  1, 33, 31, 33, 32, 33,  1,  5, 33, 39, 33,  5,  1, 39, 39, 39, 39, 39, 1,
					 1, 39, 39, 39, 39,  1,  1,  1, 39, 39, 39, 39, 39, 39,  1, 33, 39, 33, 39, 33, 39,  1, 33, 39, 33, 39, 33,  1, 39, 33, 39, 33, 39,  1, 39, 39, 39, 33, 33, 1,
					 1, 39, 39, 39, 39, 39, 39, 39, 39, 39,116, 39, 39, 39,  1, 39, 39, 39, 39, 39, 39,  1,  5, 39, 39, 39,  5,  1, 39, 39, 39, 39, 39,  1, 39, 39, 39, 39, 39, 1,
					 1, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,  1, 39, 39, 33, 39, 33, 39,  1, 33, 39, 39, 39, 33,  1, 39, 33, 39, 33, 39,  1,  1,  1,  1,  1, 39, 1,
					 1, 39,  1,  1,  1,  1,  1, 39,  1, 39, 39, 39, 39, 39,  1, 39, 39, 33, 39, 33, 31,  1, 33, 39, 39, 39, 33,  1, 39, 33, 39, 33, 39,  1, 39, 39, 39, 39, 39, 1,
					 1, 39,  1, 39, 39,  5,  1, 39,  1, 39, 33, 39, 33, 39,  1,  1,  7,  1,  1,  1,  1,  1,  1,  1,  7,  1,  1,  1,  1,  1,  7,  1,  1,  1, 39, 39, 39, 39, 39, 1,
					 1, 39,  1, 39, 39, 39,  1, 39,  1, 39, 33, 39, 33, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 32, 1,
					 1, 39,  1, 39, 39, 39,  1, 39,  1,  1,  1,  1,  1,  1,  1, 39,  1, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 39, 39, 39, 31, 1,
					 1,116,122, 39, 39, 39,  1, 39, 39, 39, 39, 39, 39, 39, 39, 39,  1, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 33, 39, 39, 39,  5,  5, 1,
					 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 1,
					];


var levelTwo = [ //levelTwo - Crypts Level I
					 74, 76, 74, 75, 74, 76, 74, 37,107, 38,107, 38,107, 37,107, 38,107,107,107,107,107, 38,107, 38,107, 38,107, 38,107, 38,107, 38,107, 38,107, 38,107, 38,107, 37,
					 74, 71, 71, 71, 71, 71, 71, 37, 39, 39, 39, 39, 39, 39, 39, 37,117,117,117,117, 39,118,118, 39,119, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 75, 71, 78, 71, 71, 71, 71, 37, 39, 39, 39, 39, 39, 39, 39, 37,117, 39, 39,116, 39, 39, 39, 39, 39, 39, 39, 39,116, 39, 39, 39, 39, 39,116, 39, 39, 39, 39, 37,
					 74, 71, 71, 71, 71, 71, 71, 37, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 76, 71, 71, 71, 77, 71, 71, 38, 37, 38, 37, 38, 37, 39, 39, 37,107,107,107, 39,107,107,107,107,107,107, 42, 42, 36, 36, 39, 36, 42, 36, 42, 42, 36, 42, 42, 37,
					 74, 71, 71, 71, 71, 71, 71, 37, 39, 39, 39, 39, 39, 39, 39, 37, 12, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 75, 71, 71, 71, 71, 71, 71, 37, 39, 39, 39, 39, 39, 39, 39, 37,  2, 35, 39, 39, 33, 39, 33, 35, 39, 37, 39, 35, 39, 39, 39, 39, 35, 39, 39, 39, 39, 35, 39, 37,
					 74, 71, 71, 71, 71, 71, 71, 37,  3, 37, 37, 37, 37, 37,  7, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 40, 39, 39, 33, 39, 39, 33, 39, 33, 39, 39, 37,
					 76, 71, 71, 71,107,107,107, 37, 39, 14, 10, 37, 10, 15, 39, 37, 39, 39, 39, 39, 34, 39, 33,116, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39,116, 39, 39, 39, 37,
					 74, 71, 71, 71, 37, 22, 39, 39, 39, 39, 39, 37, 39,116, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 33, 39, 39, 33, 39, 39, 33, 39, 33, 39, 39, 37,
					 75, 71, 71, 71, 37, 39, 39, 39, 39,116, 39, 37, 39, 39, 39, 37, 39, 35, 39, 39, 33, 39, 33, 35, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 74, 71, 71, 71, 37, 39, 39, 39, 39, 39, 39, 37, 39, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 35, 33, 39, 39, 33, 35, 39, 33, 39, 33, 35, 39, 37,
					 76, 71, 71, 71, 37, 39, 39, 39, 37, 37, 37, 37, 39, 39, 39, 37,107,107,107, 39,107,107,107,107,107, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 74, 71, 71, 71, 37, 39, 39, 39, 39, 37, 39, 39, 39, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 34, 39, 39, 40, 39, 39, 40, 39, 33, 39, 39, 37,
					 38,107, 39,107, 38, 39, 39, 39, 39, 37, 39, 39, 39, 39, 39, 37, 39, 35, 33, 39, 33, 39, 33, 35, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 37, 39,124, 39, 37,107,107,107, 39,107,107,107,107,107,107, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 34, 39, 39, 33, 39, 39, 33, 39, 33, 39, 39, 37,
					 37, 39, 39, 39, 37, 37, 37, 37, 39, 37, 37, 37, 37, 37, 37, 37, 39, 39, 33, 39, 33, 39, 34, 39, 39, 37, 39, 35, 39, 39, 39, 39, 35, 39, 39, 39, 39, 35, 39, 37,
					 37, 39, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 37, 37, 37, 39, 39,116, 39,116, 39, 39, 39, 39, 37, 39, 39, 33, 39,116, 40, 39,116, 41,116, 33, 39, 39, 37,
					 37, 39,116, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 37, 37, 37, 39, 35, 33, 39, 34, 39, 33, 35, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 37, 39, 18, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 37, 37, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 33, 39, 39, 33, 39, 39, 33, 39, 33, 39, 39, 37,
					 37, 39, 39, 39, 39, 39,116, 39,116, 39,116, 39, 39, 37, 37, 38, 39, 39, 33, 39, 33, 39, 34, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 37, 39, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 37, 37, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 35, 34, 39, 39, 33, 35, 39, 33, 39, 34, 35, 39, 37,
					 37, 39, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 37, 37, 38, 39, 35, 33, 39, 33, 39, 33, 35, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 37, 39,116, 39, 37,107,107,107, 39,107,107,107,107, 37, 37, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 34, 39, 39, 33, 39, 39, 33, 39, 33, 39, 39, 37,
					 37, 39, 39, 39, 37, 37, 38, 37, 39, 38, 42, 42, 37, 38, 42, 42, 37, 38, 36, 36, 38, 42, 36, 38, 37, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 37, 39, 39, 39, 37, 13, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 34, 39, 39, 33, 39, 39, 33, 39, 33, 39, 39, 37,
					 37, 39, 39, 39, 37, 13, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 35, 39, 39, 39, 39, 35, 39, 39, 39, 39, 35, 39, 37,
					 37, 39, 39, 39, 37, 37, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 34, 39, 39, 33, 39, 39, 33, 39, 33, 39, 39, 37,
					 37, 39, 39, 39, 37, 37, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 37,
					 37,107,107,107, 37, 37, 37,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107, 37,107,107,107,107,107,107,107,107,107,107,107,107,107, 37
					];

var caveLevelOne = [ //caveLevelOne
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,
					104, 12,  0,  0,104,117,  0,118,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  2,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,104,  0,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,104,104,104,
					104,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,  0,  0,104,  0,104,104,  0,  0,104,
					104,  0,  0,  0,104,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  9,104,104,  0,  0,  0,  0,  0,  0,  0,  9,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,112,  0,  0,104,104,  0,  0,  0,  0,  0,  0,  0,  9,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,113,  0,104,104,  0,  0,  0,  0,  0,  0,  0,  9,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,104,  0,  0,  0,104,104,  0,104,104,
					104,104,104,104,104,104,104,104,  0,104,104,104,  0,104,104,104,104,104,104,104,104,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,
					104,  0,  0,  9,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,  0,  0,  0,  9,  0,104,104,  0,  0,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,  0,  0,  0,  0,  0,104,104,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,104,  0,104,104,104,104,104,104,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,  0,104,104,
					104,  0,  0,  9,  0,104,  0,  0,  0,  0,104,104,104,104,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,  0,  0,  0,104,104,
					104,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,104,104,104,104,
					104,  0,  0,  0,  0,104,  0,  0,  0,  0,104,104,104,104,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,104,104,104,
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,104,104,104,104,104,104,104,104,104,104,  0,104,104,104,104,104,104,104,104,
					104,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0, 16,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,114,114,114,114,114,114,114,114,114,114,123,114,114,114,114,114,114,114,114,114,114,123,114,114,114,114,114,114,114,114,114,114,114,114,114,114,123,114,104,
					104,  0,  0,  9,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104, 22,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,104,
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,
					];
					
var caveLevelTwo = [ //caveLevelTwo
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,
					104,123,114,114,114,114,114,114,114,114,114,114,114,114,123,114,114,114,114,114,114,114,114,114,114,114,114,114,123,123,114,114,114,114,114,114,114,114,114,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,116,  0,  0,  0,117,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,
					104,  0,115,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,
					104,104,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,
					104,104,104,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,116,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,
					104, 93,  0,100,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,113,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0, 16,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,
					104, 13,  0,  0,  0,  0,  0,  0,121,  0,121,  0,  0,  0,  0,  0,  0,  0,  0,116,  0,  0,  0,104,  0,  0, 16,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,
					104, 13,  0,  0,  0,  0,  0,121,112,  0,  0,121,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0, 16,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,
					104, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,104,  0,  0,  0,  0,104,
					104, 13,  0,  0,  0,  0,  0,121,  0,  0,  0,121,  0,  0,  0,  0,  0,  0,  0,104,104,104,104,104,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104, 13,  0,  0,  0,  0,  0,  0,121,  0,121,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,  0,  0,104,
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,
					104,  0,112,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,113,  0,  0,  0,  0,  0,  0,  0,  0,113,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,113,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,112,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,104,104,  0,  0,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,  0,  0,104,104,104,  0,  0,104,104,104,104,104,104,104,104,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,112,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,104,104,104,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12,104,
					104,  0,113,  0,  0,  0,  0,  0,  0, 16, 16,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,104,
					104,  0,  0,  0,  0,  0,112,  0,  0, 16, 16,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0, 16, 16,  9,  0,  0,113,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,104,
					104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,
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
const TILE_TABLE_2 = 63;
const TILE_TABLE_3 = 64;
const TILE_GREEN_RUG_TL = 65;
const TILE_GREEN_RUG_TR = 66;
const TILE_GREEN_RUG_BL = 67;
const TILE_GREEN_RUG_BR = 68;
const TILE_GREEN_RUG_TOP = 69;
const TILE_GREEN_RUG_BOT = 70;
const TILE_GREEN_RUG_CEN = 71;
const TILE_GREEN_RUG_L = 72;
const TILE_GREEN_RUG_R = 73;
const TILE_KINGS_CHAMBER_WALL = 74;
const TILE_KINGS_CHAMBER_SNAKE = 75;
const TILE_KINGS_CHAMBER_SPIDER = 76;
const TILE_KINGS_TOMB = 77;
const TILE_SKELETON_KING = 78;
const TILE_SPIDER = 79;
const TILE_SPIDERWEB_SW = 80;
const TILE_SPIDERWEB_NW = 81;
const TILE_SPIDERWEB_NE = 82;
const TILE_SPIDERWEB_SE = 83;
const TILE_ORC_FLAG = 84;
const TILE_GRASS = 85;
const TILE_TOWN_WALL = 86;
const TILE_TOWN_ROAD = 87;
const TILE_WALL_SWORD = 88;
const TILE_TREE = 89;
const TILE_BUSH = 90;
const TILE_ROCK = 91;
const TILE_BUSH_2 = 92;
const TILE_BED = 93;
const TILE_STAIRS_DOWN_LEVEL_2 = 94;
const TILE_FIREPIT = 95;
const TILE_ORC_BOSS = 96;
const TILE_THRONE = 97;
const TILE_COUNTER_EMPTY = 98;
const TILE_COUNTER_POTIONS = 99;
const TILE_DRESSER = 100;
const TILE_SHIELD = 101;
const TILE_FLAME_SPELL_BOOK = 102;
const TILE_FREEZE_SPELL_BOOK = 103;
const TILE_CAVE_WALL = 104;
const TILE_TOWN_WALL_NORTH = 105;
const TILE_TOWN_WALL_SOUTH = 106;
const TILE_CRYPT_WALL_NORTH = 107;
const TILE_TOWN_WALL_WEST = 108;
const TILE_TOWN_WALL_EAST = 109;
const TILE_TOWN_WALL_NW = 110;
const TILE_TOWN_WALL_NE = 111;
const TILE_CAVE_ROCK = 112;
const TILE_CAVE_ROCK2 = 113;
const TILE_MINE_TRACK = 114;
const TILE_WIZARD_BOSS = 115;
const TILE_SKELETON = 116;
const TILE_BOX = 117;
const TILE_BARREL = 118;
const TILE_BARREL_3 = 119;
const TILE_CHAIR_2 = 120;
const TILE_TENTACLE = 121;
const TILE_BLUE_DOOR_SIDE = 122;
const TILE_CAVE_MINE_CAR = 123;
const TILE_ACTIVATE_SKELETON_KING_VOICE = 124;
const TILE_BARTENDER = 125;
const TILE_FORTUNE_TELLER = 126;

function gameCoordToIsoCoord (pixelX, pixelY) {
	var camPanX = 0;
	var camPanY = 0;
	var tileCFraction = pixelX / ROOM_W;
	var tileRFraction = pixelY / ROOM_H;

	isoDrawX = -camPanX + tileCFraction * (ISO_GRID_W/2) - tileRFraction * (ISO_GRID_W/2);
	isoDrawY = -camPanY + tileCFraction * (ISO_GRID_H/2) + tileRFraction * (ISO_GRID_H/2);
}

function screenCoordToGameCoord (pixelX, pixelY) {
	// accounting for camera pan, so map origin is 0,0
	var workingX = pixelX + camPanX;
	var workingY = (pixelY + camPanY)*2; // 2X vertical, since isometric

	// accounting for affect of isometric motion on coordinate
	var unIsoX = workingX+workingY;
	var unIsoY = workingY-workingX;

	// going from game coordinate to tile index through normal calculation
	var indexUnderPixel = getTileIndexAtPixelCoord(unIsoX,unIsoY);

	/* // debugging output
	gameCoordToIsoCoord(unIsoX,unIsoY);
	var debugCoordX = isoDrawX;
	var debugCoordY = isoDrawY;
	colorRect(unIsoX,unIsoY,10,10,"red"); // check if iso motion aligns as up/down, side-side
	console.log(Math.floor(unIsoX),Math.floor(unIsoY));
	*/

	return {unIsoX, unIsoY, indexUnderPixel};
}

function tileCoordToIsoCoord(tileC, tileR ) {
	gameCoordToIsoCoord(tileC * ROOM_W, tileR * ROOM_H);
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
			checkTileType == TILE_SPIDERWEB_SW ||
			checkTileType == TILE_SPIDERWEB_NW ||
			checkTileType == TILE_SPIDERWEB_NE ||
			checkTileType == TILE_SPIDERWEB_SE ||
			checkTileType == TILE_BED ||
			checkTileType == TILE_COUNTER_EMPTY ||
			checkTileType == TILE_COUNTER_POTIONS ||
			checkTileType == TILE_DRESSER ||
			checkTileType == TILE_SHIELD ||
			checkTileType == TILE_FLAME_SPELL_BOOK ||
			checkTileType == TILE_FREEZE_SPELL_BOOK ||
			checkTileType == TILE_CAVE_WALL ||
			checkTileType == TILE_TOWN_WALL_SOUTH ||
			checkTileType == TILE_YELLOW_DOOR ||
			checkTileType == TILE_RED_DOOR ||
			checkTileType == TILE_TABLE ||
			checkTileType == TILE_TREASURE ||
			checkTileType == TILE_MINE_TRACK ||
			checkTileType == TILE_CAVE_ROCK ||
			checkTileType == TILE_CAVE_ROCK2
			);
}


function tileTypeHasWallTransparency(checkTileType) {
	return (checkTileType == TILE_WALL_ART ||
	        checkTileType == TILE_WALL_SWORD ||
			checkTileType == TILE_WALL_SHIELD
			);
}

function tileTypeHasCryptFloorTransparency(checkTileType) {
	return (checkTileType == TILE_TOMB ||
			checkTileType == TILE_TOMB_2 ||
			checkTileType == TILE_TOMB_3 ||
			checkTileType == TILE_TOMB_4 ||
			checkTileType == TILE_COLUMN ||
			checkTileType == TILE_CRYPT_WALL_NORTH
			);
}

function tileTypeHasRedRugTransparency(checkTileType) {
	return (checkTileType == TILE_TABLE_2
			);
}

function tileTypeHasBlueRugTransparency(checkTileType) {
	return (checkTileType == TILE_TABLE_3
			);
}

function tileTypeHasGrassTransparency(checkTileType) {
	return (checkTileType == TILE_TREE ||
			checkTileType == TILE_BUSH ||
			checkTileType == TILE_BUSH_2 ||
			checkTileType == TILE_ROCK ||
			checkTileType == TILE_TOWN_WALL_EAST ||
			checkTileType == TILE_TOWN_WALL_WEST ||
			checkTileType == TILE_TOWN_WALL_NE ||
			checkTileType == TILE_TOWN_WALL_NW ||
			checkTileType == TILE_TOWN_WALL_NORTH ||
			checkTileType == TILE_FIREPIT
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

function isWallTransparent(object, tileIndex) {
	return getTileIndexAtPixelCoord(object.x, object.y) == tileIndex ||
				 getTileIndexAtPixelCoord(object.x, object.y) + 1 == tileIndex ||
				 getTileIndexAtPixelCoord(object.x, object.y) + 40 == tileIndex ||
				 getTileIndexAtPixelCoord(object.x, object.y) + 41 == tileIndex;
}


function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + ROOM_COLS*tileRow);
}
