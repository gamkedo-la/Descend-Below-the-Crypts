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

        return path;
    };

    var neighborsForIndex = function(index, isPassable) {
    var result = [];

    var above = indexAboveIndex(index);
    var below = indexBelowIndex(index);
		var left = indexLeftofIndex(index);
		var right = indexRightOfIndex(index);

    var roomGrid = gameStateManager.getState().levelList[gameStateManager.getState().level];

		//console.log("A: " + above + " B: " + below + " L: " + left + " R: " + right);
		if (above != null) { //checking if tile above is present and adding it to result
            if (isPassable(roomGrid[above])) {
                result.push(above);
            }
        }

        if (below != null) { //checking if tile below is present and adding it to result
            if (isPassable(roomGrid[below])) {
                result.push(below);
            }
        }

        if (left != null) { //checking if tile to the left is present and adding it to result
            if (isPassable(roomGrid[left])) {
                result.push(left);
            }
        }

        if (right != null) { //checking if tile to the right is present and adding it to result
            if (isPassable(roomGrid[right])) {
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
        if (result >= 0){//levelList[levelNow].length) {
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
        if ((result >= 0)){//levelList[levelNow].length) || (result % ROOM_COLS == 0)) {
            return null;
        } else {
            return result;
        }
    }
}
