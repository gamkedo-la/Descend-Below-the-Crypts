goblinNames = [ "Lalx", "Hosterz", "Wruc", "Arx", "Plex", "Brong", "Bogz", 
				"Stror", "Klerk", "Rizz", "Lals", "Urt", "Xagz", "Slirm", 
				"Kiok", "Wrokx", "Fiog", "Goziord"];
				
orcNames = [ "Orc 1", "Orc 2", "Orc 3", "Orc 4", "Orc 5", "Orc 6"];     

ogreNames = [ "Ogre 1", "Ogre 2", "Ogre 3", "Ogre 4", "Ogre 5", "Ogre 6"];     


function enemyClass() {
	this.x = 600;
	this.y = 800;
	this.width = 30; //30
	this.height = 30; //30
	this.isoEnemyFootY = 8;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	
	this.maxHealth = 2;
	this.speed = 3;
	this.health = this.maxHealth;
	
	this.movementTimer = 0;
	this.moveNorth = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;
	
	this.pathFindingQueue = [];
	
	this.enemyReset = function() {
		this.speed = 3;
		this.hitPoints = this.maxHitPoints;
				
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == this.myTile) {
					var tileRow = Math.floor(i/ROOM_COLS);
					var tileCol	= i%ROOM_COLS;
					
					this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
					this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

					roomGrid[i] = TILE_ROAD;
					break;
				} 
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;
	}
					
	this.init = function(whichGraphic, whichName, whichTile) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.myTile = whichTile;
		this.enemyReset();
	}	
	 
	this.movement = function() {
		
		var nextX = this.x; 
		var nextY = this.y; 
		
		this.randomMovements();
		this.speed = 1.0;
		
		/*if(this.moveNorth && this.keyHeld_West){
			nextY -= PLAYER_MOVE_SPEED;
		} else if(this.moveNorth && this.keyHeld_East){
			nextX += PLAYER_MOVE_SPEED;
			this.miniMapX += PLAYER_MOVE_SPEED/10;
			this.miniMapY -= PLAYER_MOVE_SPEED/10;
		} else if(this.keyHeld_South && this.keyHeld_West){
			nextX -= PLAYER_MOVE_SPEED;
			this.miniMapX -= PLAYER_MOVE_SPEED/10;
			this.miniMapY += PLAYER_MOVE_SPEED/10;
		} else if(this.keyHeld_South && this.keyHeld_East){
			nextY += PLAYER_MOVE_SPEED;
			this.miniMapX += PLAYER_MOVE_SPEED/10;
			this.miniMapY += PLAYER_MOVE_SPEED/10; 
		} else */ if(this.moveNorth && this.canMoveNorth){
			nextY -= this.speed;
			this.offSetHeight = this.height * 4;
		} else if(this.moveEast && this.canMoveEast){
			nextX += this.speed;
			this.offSetHeight = this.height * 1;
		//	this.miniMapX += PLAYER_MOVE_SPEED/5;
		} else if(this.moveSouth && this.canMoveSouth){
			nextY += this.speed;
			this.offSetHeight = this.height * 2;
		//	this.miniMapY += PLAYER_MOVE_SPEED/5;
		} else if(this.moveWest && this.canMoveWest){
			nextX -= this.speed;
			this.offSetHeight = this.height * 3;
		//	this.miniMapX -= PLAYER_MOVE_SPEED/5;
		} else {
			this.offSetHeight = 0;
		}
		this.miniMapX = nextX;
		this.miniMapY = nextY;
		
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_WALL;
		
		if(walkIntoTileType != undefined){	
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}
	
		switch(walkIntoTileType) {
			case TILE_ROAD:
			case TILE_YELLOW_KEY:	
				this.x = nextX;
				this.y = nextY;
				break;					
			case TILE_WALL:
			case TILE_SPIKES_ARMED:
			case TILE_SPIKES_UNARMED:
			case TILE_PITTRAP_ARMED:
			case TILE_PITTRAP_UNARMED:
			case TILE_TREASURE:
			case TILE_FINISH:			
			case TILE_YELLOW_DOOR:
			case TILE_RED_DOOR:
			case TILE_BLUE_DOOR:
			case TILE_TABLE:
			default:
				this.movementTimer = 0;
				break;
		} 
	}	
	
	this.randomMovements = function(){
		var whichDirection =  Math.round(Math.random() * 10);
		this.movementTimer--;
	
		if(this.movementTimer <= 0){
			switch(whichDirection) {
				case 0:
				case 1:
					this.resetDirections();
					this.moveNorth = true;					
					this.movementTimer = 300;
					break;
				case 2:
				case 3:
					this.resetDirections();
					this.moveWest = true;
					this.movementTimer = 300;
					break;
				case 4:
				case 5:
					this.resetDirections();
					this.moveSouth = true;
					this.movementTimer = 300;
					break;
				case 6:
				case 7:
					this.resetDirections();
					this.moveEast = true;
					this.movementTimer = 300;
					break;
				case 8:
				case 9:
				case 10:
					this.resetDirections();
					this.movementTimer = 300;
					break;
			}
		}
	}
	
	/* 
	Path Finding is WIP.
	Sample:  gregtrowbridge.com/a-basic-pathfinding-algorithm/	
	*/
	this.pathFinding = function(){
		var unvisitedList = [];
		var endTile = null;
		var pathfindingNow = false;

		function SetupPathfindingGridData() {
			unvisitedList = [];
			endTile = null;
			pathfindingNow = false;

			if(grid.length > 0) { // non-zero, copy over player set walls into tileGrid for reset
				for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
					for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
						var idxHere = tileCoordToIndex(eachCol, eachRow);
						if(grid[idxHere].elementType == VISITED ||
							grid[idxHere].elementType == PATH) {
							tileGrid[idxHere] = NOTHING;
						} else {
							tileGrid[idxHere] = grid[idxHere].elementType;
						}
					}
				}
			}

			grid = [];

			for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
				for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
					var idxHere = tileCoordToIndex(eachCol, eachRow);

					grid[idxHere] = new GridElement();
					unvisitedList.push( grid[idxHere] );
					grid[idxHere].setup(eachCol, eachRow, idxHere, tileGrid[idxHere]);
				}
			}
		}

		function PathfindingNextStep() {
			var tentativeDistance = 0;

			// while Q is not empty:    //// unvisitedList is Q, using if() instead of while() so per-frame
			if(unvisitedList.length > 0) {
				// u <- vertex in Q with min dist[u]    //// find the node, u, in Q with shortest distance
				
				// remove u from Q                      //// can use arrayRemove() from helpercode.js
				
				// for each neighbor v of u:            //// "neighbors of u" are u.myUnvisitedNeighbors()
				//   alt ← dist[u] + length(u, v)       //// tentativeDistance is just node's distance + 1
				//    if alt < dist[v]:                 //// the v.setDistIfLess(tentativeDistance, u)
				//      dist[v] ← alt                   //// function will update v's distance and
				//      prev[v] ← u                     //// distance if tentativeDistance < v.distance

				// if a neighbor tested is of type destination, i.e. neighborTile.isTileType(DEST)
				// then set endTile to neighborTile
				// can also short circuit / bail on further evaluations by empting the unvisitedList, Q

				//// "u := vertex in Q with min dist[u]"
				var currentTile = unvisitedList[ Math.floor( Math.random()*unvisitedList.length ) ];
				arrayRemove(unvisitedList,currentTile); //// remove u from Q
				var neighborsStillInUnvisitedList = currentTile.myUnvisitedNeighbors();
				for (var i=0; i<neighborsStillInUnvisitedList.length; i++) {
					var neighborTile = neighborsStillInUnvisitedList[i];
				  
					if (neighborTile.isTileType(NOTHING)) {
						tentativeDistance = currentTile.distance+1;
						neighborTile.setDistIfLess(tentativeDistance, currentTile);
						neighborTile.setTile(VISITED);
					} else if (neighborTile.isTileType(DEST)) {
						tentativeDistance = currentTile.distance+1;
						neighborTile.setDistIfLess (tentativeDistance, currentTile);
						endTile=neighborTile;
						unvisitedList = []; //// empty the unvisitedList since we've found the end
					}
				}
			  
			} else { //// all nodes have been accounted for, work backward from end's tiles for path
					 //// terminate the algorithm from taking further steps since we found what we needed
				if (endTile!=null) {
					console.log("Best distance found: " + endTile.distance);
				 
					// walk backward from destination to create the path
					var previousTile = endTile.cameFrom;
					  
					for (var pathIndex = endTile.distance; pathIndex>1; pathIndex--) {
						previousTile.setTile(PATH);
						previousTile = previousTile.cameFrom;  
					}
				}
				pathfindingNow = false;
			}
		}
	}
	
	this.resetDirections = function(){
		this.moveNorth = false;
		this.moveWest = false;
		this.moveSouth = false;
		this.moveEast = false;
	}	
	
	this.checkCollisionsAgainst = function(otherHumanoid){
		if(this.collisionTest(otherHumanoid)){
			if(this.moveNorth){
				this.canMoveNorth = false;
				this.resetDirections();
				this.moveSouth = true;
				this.y += this.speed;
			} else if(this.moveEast){
				this.canMoveEast = false;
				this.resetDirections();
				this.moveWest = true;
				this.x -= this.speed;
			} else if(this.moveSouth){
				this.canMoveSouth = false;
				this.resetDirections();
				this.moveNorth = true;
				this.y -= this.speed;
			} else if(this.moveWest){
				this.canMoveWest = false;
				this.resetDirections();
				this.moveEast = true;
				this.x += this.speed;				
			}
		} else {
			this.canMoveNorth = true;
			this.canMoveEast = true;
			this.canMoveSouth = true;
			this.canMoveWest = true;
		}
	}
	
	this.collisionTest = function(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				return true;
		}
		return false;
	}
		
	this.draw = function(){
		gameCoordToIsoCoord(this.x,this.y);
		canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y);
		colorText(this.myName, isoDrawX + 20, isoDrawY - 30, "black", "8px Arial Black");
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		//displays health
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, 24, 9, "red");
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, (this.health / this.maxHealth) * 24, 9, "green");
		canvasContext.drawImage(healthbarPic,isoDrawX-(this.width/2), isoDrawY-this.height - 20);
		//colorRect(this.miniMapX, this.miniMapY, 10, 10, "green");	
	}
}