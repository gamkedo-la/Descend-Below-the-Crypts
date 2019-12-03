class Enemy extends Character {
  constructor(maxHealth, movementSpeed, width, height) {
    super(maxHealth, movementSpeed, width, height);

    // Movement
    this.currentPath = [];
    this.currentPathIndex = 0;
    this.wayPointList = [];
    this.currentWayPoint = 0;
    this.movementTimer = 0;
    this.pathFindingQueue = [];

    // Position
    this.currentTile = 0;
    this.currentCol = 0;
    this.currentRow = 0;
    this.toTileC = 0;
    this.toTileR = 0;
    this.d = 0; // distance
  }

  init(whichGraphic, whichName, whichTile) {
    super.init(whichGraphic, whichName, whichTile);
    this.wayPointList = [];
    this.wayPointList.push(85, 125, 130, 90, 47, 92, 57, 60);
  }

  reset(roomGrid) {
    this.roomGrid = roomGrid;
    this.speed = 3;
    this.health = this.maxHealth;
    this.pather = new pathFinder();

    if(this.homeX == undefined) {
		for(var i=0; i<this.roomGrid.length; i++) {
			if(this.roomGrid[i] == this.myTile) {
				if(this.roomGrid[i] == TILE_KINGS_TOMB ||
				   this.roomGrid[i] == TILE_SKELETON_KING)
				{
					this.roomGrid[i] = TILE_GREEN_RUG_CEN;
				} else {
					this.roomGrid[i] = TILE_ROAD;
				}
				var tileRow = Math.floor(i/ROOM_COLS);
				var tileCol	= i%ROOM_COLS;

				this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W;
				this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H;

				break;
			}
		}
	}

	this.x = this.homeX;
	this.y = this.homeY;
  }

  movement() {
	var nextX = this.x;
	var nextY = this.y;

	if(this.canMove){
		//this.randomMovements();
		this.wayPointMovement();
	} else {
		this.rest();
	}
	
	this.speed = 1.0;
	if(this.moveNorth && this.canMoveNorth) {
		nextY -= this.speed;
		this.offSetHeight = this.height * 4;
	} else if(this.moveEast && this.canMoveEast) {
		nextX += this.speed;
		this.offSetHeight = this.height * 1;
	} else if(this.moveSouth && this.canMoveSouth) {
		nextY += this.speed;
		this.offSetHeight = this.height * 2;
	} else if(this.moveWest && this.canMoveWest) {
		nextX -= this.speed;
		this.offSetHeight = this.height * 3;
	} else {
		this.offSetHeight = 0;
	}

	var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
	var walkIntoTileType = TILE_WALL;

	if(walkIntoTileType != undefined) {
		walkIntoTileType = this.roomGrid[walkIntoTileIndex];
	}

	switch(walkIntoTileType) {
		case TILE_ROAD:
		case TILE_CRYPT_FLOOR:
		case TILE_RED_RUG_TL:
		case TILE_RED_RUG_TR:
		case TILE_RED_RUG_BL:
		case TILE_RED_RUG_BR:
		case TILE_RED_RUG_TOP:
		case TILE_RED_RUG_BOT:
		case TILE_RED_RUG_CEN:
		case TILE_RED_RUG_L:
		case TILE_RED_RUG_R:
		case TILE_BLUE_RUG_TL:
		case TILE_BLUE_RUG_TR:
		case TILE_BLUE_RUG_BL:
		case TILE_BLUE_RUG_BR:
		case TILE_BLUE_RUG_TOP:
		case TILE_BLUE_RUG_BOT:
		case TILE_BLUE_RUG_CEN:
		case TILE_BLUE_RUG_L:
		case TILE_BLUE_RUG_R:
		case TILE_CRYPT_FLOOR:
		case TILE_WIZARD_BOOK:
		case TILE_CLERIC_BOOK:
		case TILE_SKILL_BOOK:
		case TILE_SWORD:
		case TILE_MACE:
		case TILE_GOLD_COINS:
		case TILE_SEWER:
		case TILE_HEALING_POTION:
		case TILE_MANA_POTION:
		case TILE_YELLOW_KEY:
		case TILE_SPIKES_ARMED:
		case TILE_SPIKES_UNARMED:
		case TILE_PITTRAP_ARMED:
		case TILE_PITTRAP_UNARMED:
		case TILE_TREASURE:
			this.x = nextX;
			this.y = nextY;
			break;
		case TILE_WALL:
		case TILE_FINISH:
		case TILE_YELLOW_DOOR:
		case TILE_RED_DOOR:
		case TILE_BLUE_DOOR:
		case TILE_TABLE:
		case TILE_TOMB:
		case TILE_TOMB_2:
		default:
			this.movementTimer = 0;
			break;
		}
	}

  isPassableTile(aTile) {
    switch (aTile) { // THE TILES THAT CAN'T BE PASSED THROUGH FOR PATHFINDING
  		case TILE_WALL:
  		case TILE_FINISH:
  		case TILE_YELLOW_DOOR:
  		case TILE_RED_DOOR:
  		case TILE_BLUE_DOOR:
  		case TILE_TABLE:
  		case TILE_TOMB:
  		case TILE_TOMB_2:
  			return false;
  		default:
  			return true;
    }
  }

  randomMovements() {
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

  wayPointMovement() {
		gameCoordToIsoCoord(this.x,this.y);
		var playerTileIndex = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);
		var thisTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
		this.currentPath = this.pather.pathFrom_To_(thisTileIndex, playerTileIndex, this.isPassableTile);

		/*if (this.currentPath.length > 0) {
			this.currentPathIndex = 0;

			var currentTile = getTileIndexAtPixelCoord(this.x, this.y);
			var nextTile = this.currentPath[ this.currentPathIndex ];
			//console.log(nextTile);


			if (currentTile == nextTile) {
				this.currentPathIndex++;
				if (this.currentPathIndex == this.currentPath.length) {
					return null;
				}
			}

			if (nextTile - currentTile > 1) {
				this.resetDirections();
				this.moveSouth = true;
			} else if (nextTile - currentTile < -1) {
				this.resetDirections();
				this.moveNorth = true;
			} else if (nextTile - currentTile == -1) {
				this.resetDirections();
				this.moveWest = true;
			} else if (nextTile - currentTile == 1) {
				this.resetDirections();
				this.moveEast = true;
			}
		}
		else {*/
			var enemyXLocation = isoDrawX;
			var enemyYLocation = isoDrawY;
			var toTileC = this.wayPointList[this.currentWayPoint]%ROOM_COLS;
			var toTileR = Math.floor(this.wayPointList[this.currentWayPoint]/ROOM_COLS);
			var columnDistance = Math.abs(this.currentCol - this.toTileC);
			var rowDistance = Math.abs(this.currentRow - this.toTileR);
			tileCoordToIsoCoord(toTileC, toTileR );

			//console.log("C: " + columnDistance + " R: " + rowDistance);

			if(this.currentCol == this.toTileC && this.currentRow == this.toTileR){
				this.currentWayPoint++;
				if(this.currentWayPoint > this.wayPointList.length){
					this.currentWayPoint = 0;
				}
			} else if (rowDistance > columnDistance){
				if(this.currentRow > this.toTileR){ //North
					this.resetDirections();
					this.moveNorth = true;
				} else {
					this.resetDirections(); //South
					this.moveSouth = true;
				}
			} else if (columnDistance > rowDistance){
				if(this.currentCol> this.toTileC){ //West
					this.resetDirections();
					this.moveWest = true;
				} else {
					this.resetDirections(); //East
					this.moveEast = true;
				}
			}

			this.currentTile = getTileIndexAtPixelCoord(this.x,this.y);
			this.currentCol = this.currentTile%ROOM_COLS;
			this.currentRow = Math.floor(this.currentTile/ROOM_COLS);
			this.toTileC = this.wayPointList[this.currentWayPoint]%ROOM_COLS;
			this.toTileR = Math.floor(this.wayPointList[this.currentWayPoint]/ROOM_COLS);
		//}
  }

  checkCollisionsAgainst(otherHumanoid) {
    if (!otherHumanoid.noClipMode && super.collisionTest(otherHumanoid)) {
      if(this.moveNorth) {
				this.canMoveNorth = false;
				this.resetDirections();
				this.moveSouth = true;
				this.y += this.speed;
			} else if(this.moveEast) {
				this.canMoveEast = false;
				this.resetDirections();
				this.moveWest = true;
				this.x -= this.speed;
			} else if(this.moveSouth) {
				this.canMoveSouth = false;
				this.resetDirections();
				this.moveNorth = true;
				this.y -= this.speed;
			} else if(this.moveWest) {
				this.canMoveWest = false;
				this.resetDirections();
				this.moveEast = true;
				this.x += this.speed;
			}
    }
    else {
      this.canMoveNorth = true;
      this.canMoveEast = true;
      this.canMoveSouth = true;
      this.canMoveWest = true;
    }
  }

  draw() {
    super.draw();

    colorText(this.myName, isoDrawX + 20, isoDrawY - 30, "black", "8px Arial Black");

    //displays health
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, 24, 9, "red");
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, (this.health / this.maxHealth) * 24, 9, "green");
		canvasContext.drawImage(healthbarPic,isoDrawX-(this.width/2), isoDrawY-this.height - 20);
		var startX = isoDrawX;
		var startY = isoDrawY;
		var toTileC;
		var toTileR;
		for(var i = 0; i < this.wayPointList.length; i++){
			toTileC = this.wayPointList[i]%ROOM_COLS;
			toTileR = Math.floor(this.wayPointList[i]/ROOM_COLS);
			tileCoordToIsoCoord(toTileC, toTileR );
			if(i>0) { // skip first
				colorLine(startX,startY,isoDrawX, isoDrawY, (i <= this.currentWayPoint ? "yellow" : "red"));
			}
			startX = isoDrawX;
			startY = isoDrawY;
			if(i == this.currentWayPoint) {
				colorRect(startX-5,startY-5,10,10,"cyan");
			}
		}
  }

  rest() {
    this.resetDirections();
  }

  resetDirections() {
    this.moveNorth = false;
		this.moveWest = false;
		this.moveSouth = false;
		this.moveEast = false;
  }
}
