var pathDebugIndexList = [11,21,31,41,51];

function drawDebugPath(){
	var toTileC;
	var toTileR;
	for(var i = 0; i < pathDebugIndexList.length; i++){
		toTileC = pathDebugIndexList[i]%ROOM_COLS;
		toTileR = Math.floor(pathDebugIndexList[i]/ROOM_COLS);
		tileCoordToIsoCoord(toTileC, toTileR );
		colorText(""+i, isoDrawX - 0.25*ISO_TILE_DRAW_W, isoDrawY + 0.1 * ISO_TILE_DRAW_W, "cyan", "24px Arial Black");
	}
}

function pathFinder() {
    this.pathFrom_To_ = function(start, target, isPassableFunction) {

        var frontier = [];
        frontier.push(start);
        var cameFrom = {};
        cameFrom[start] = "S";

		//console.log(frontier.length);

        while (frontier.length > 0) {
            var current = frontier.shift();
            var neighbors = neighborsForIndex(current, isPassableFunction);

            for (let i = 0; i < neighbors.length; i++) {
                const next = neighbors[i];
                if (cameFrom[next] == undefined) {
                    frontier.push(next);
                    cameFrom[next] = current;
                }

                if (next == target) {
                    break;
                }
            }
        }

        var path = [];

        var current = target;

        while (current != start) {
            path.splice(0, 0, current);
            current = cameFrom[current];
            if (current == undefined) {
                return [];
            }
        }

        path.splice(0, 0, start);

        /*        let string = "";
         for(let j = 0; j < levelList[levelNow].length; j++) {
         let distString = cameFrom[j];

         if(distString == undefined) {distString = "B";}

         distString = distString.toString();
         if(distString.length < 2) {
         distString = ("00" + distString);
         } else if(distString.length < 3) {
         distString = ("0" + distString);
         }

         distString += ", "
         string += distString;
         if((j + 1) % ROOM_COLS == 0) {
         string += "\n";
         }
         }

         //        console.log(string); */
		//console.log(path);
        return path;
    };

    var neighborsForIndex = function(index, isPassable) {
		var result = [];

		var above = indexAboveIndex(index);
		var below = indexBelowIndex(index);
		var left = indexLeftofIndex(index);
		var right = indexRightOfIndex(index);

		var roomGrid = mapStack[currentMap].level;
		//console.log(roomGrid);
		//console.log("A: " + above + " B: " + below + " L: " + left + " R: " + right);
		if (above != null) { //checking if tile above is present and adding it to result
            if (isPassable(roomGrid[above].getTileType())) {
                result.push(above);
            }
        }

        if (below != null) { //checking if tile below is present and adding it to result
            if (isPassable(roomGrid[below].getTileType())) {
                result.push(below);
            }
        }

        if (left != null) { //checking if tile to the left is present and adding it to result
            if (isPassable(roomGrid[left].getTileType())) {
                result.push(left);
            }
        }

        if (right != null) { //checking if tile to the right is present and adding it to result
            if (isPassable(roomGrid[right].getTileType())) {
                result.push(right);
            }
        }

        return result;
    };

    var indexAboveIndex = function(index) {
        var result = index - ROOM_COLS;
        if (result < 0) {
            return null;
        } else {
            return result;
        }
    };

    var indexBelowIndex = function(index) {
        var result = index + ROOM_COLS;
        if (result >= ROOM_COLS * ROOM_ROWS) { // WARNING:  NEED TO TEST FOR LEFT MOST EDGE
            return null;
        } else {
            return result;
        }
    };

    var indexLeftofIndex = function(index) {
        var result = index - 1;
        if ((result < 0) || (result % ROOM_COLS == (ROOM_COLS - 1))) {
            return null;
        } else {
            return result;
        }
    };

    var indexRightOfIndex = function(index) {
        var result = index + 1;
        if ((result >= ROOM_COLS * ROOM_ROWS) || (result % ROOM_COLS == 0)) {
            return null;
        } else {
            return result;
        }
    }


}

function isNotAPassableTile(aTile) {
	switch (aTile) { // THE TILES THAT CAN'T BE PASSED THROUGH FOR PATHFINDING
			case TILE_YELLOW_DOOR:
			case TILE_RED_DOOR:
			case TILE_BLUE_DOOR:
			case TILE_BLUE_DOOR_SIDE:
			case TILE_CAVE_MINE_CAR:
			case TILE_TREASURE:
			case TILE_BOX:
			case TILE_BARREL:
			case TILE_BARREL_3:
			case TILE_WALL_ART:
			case TILE_CHAIR_2:
			case TILE_GOLD_COINS:
			case TILE_SWORD:
			case TILE_SHIELD:
			case TILE_MACE:
			case TILE_WIZARD_BOOK:
			case TILE_FLAME_SPELL_BOOK:
			case TILE_FREEZE_SPELL_BOOK:
			case TILE_CLERIC_BOOK:
			case TILE_SKILL_BOOK:
			case TILE_HEALING_POTION:
			case TILE_MANA_POTION:
			case TILE_YELLOW_KEY:
			case TILE_FINISH:
			case TILE_STAIRS_DOWN:
			case TILE_STAIRS:
			case TILE_PITTRAP_ARMED:
			case TILE_SPIKES_ARMED:
			case TILE_WALL:
			case TILE_WALL_WITH_TORCH:
			case TILE_TABLE:
			case TILE_BOOKSHELF:
			case TILE_TOMB:
			case TILE_TOMB_2:
			case TILE_COLUMN:
			case TILE_TOWN_WALL:
			case TILE_WALL_SWORD:
			case TILE_TREE:
			case TILE_BUSH:
			case TILE_BED:
			case TILE_THRONE:
			case TILE_COUNTER_EMPTY:
			case TILE_COUNTER_POTIONS:
			case TILE_DRESSER:
			case TILE_SHIELD:
			case TILE_FLAME_SPELL_BOOK:
			case TILE_FREEZE_SPELL_BOOK:
			case TILE_CAVE_WALL:
			case TILE_TOWN_WALL_NORTH:
			case TILE_TOWN_WALL_SOUTH:
			case TILE_CRYPT_WALL_NORTH:
			case TILE_TOWN_WALL_WEST:
			case TILE_TOWN_WALL_EAST:
			case TILE_TOWN_WALL_NW:
			case TILE_TOWN_WALL_NE:
			case TILE_CAVE_ROCK:
			case TILE_CAVE_ROCK2:
			case TILE_MINE_TRACK:
			return false;
		default:
			return true;
	}
}
