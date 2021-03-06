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
	this.destinationTileIndex = 0;

    // Position
    this.currentTile = 0;
    this.currentCol = 0;
    this.currentRow = 0;
    this.toTileC = 0;
    this.toTileR = 0;
	this.d = 0; // distance
	this.walkIntoTileIndex = 0;
	
	// HUD
	this.selected = false;

	// Drops:
	this.drops = [
		TILE_HEALING_POTION,
		TILE_MANA_POTION,
		TILE_SHIELD
	]
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
		if(this.myTile == TILE_SKELETON_KING ||
		   this.myTile == TILE_SPIDER ||
		   //this.myTile == TILE_ORC ||
		   //this.myTile == TILE_GOBLIN
		   ){
			this.randomMovements();
		} else {
			this.wayPointMovement();
		}
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

	this.walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
	var walkIntoTileType = TILE_WALL;

	if(walkIntoTileType != undefined) {
		walkIntoTileType = this.roomGrid[this.walkIntoTileIndex];
	}

	switch(walkIntoTileType) {
		case TILE_ROAD:
		case TILE_TOWN_ROAD:
		case TILE_GRASS:
		case TILE_CRYPT_FLOOR:
		case TILE_SEWER:
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
		case TILE_GREEN_RUG_TL:
		case TILE_GREEN_RUG_TR:
		case TILE_GREEN_RUG_BL:
		case TILE_GREEN_RUG_BR:
		case TILE_GREEN_RUG_TOP:
		case TILE_GREEN_RUG_BOT:
		case TILE_GREEN_RUG_CEN:
		case TILE_GREEN_RUG_L:
		case TILE_GREEN_RUG_R:
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
		case TILE_ACTIVATE_SKELETON_KING_VOICE:
		case TILE_PITTRAP_UNARMED:
		case TILE_TREASURE:
		case TILE_BARREL:
			this.x = nextX;
			this.y = nextY;
			break;
		case TILE_WALL:
		case TILE_FINISH:
		case TILE_YELLOW_DOOR:
		case TILE_RED_DOOR:
		case TILE_BLUE_DOOR:
		case TILE_BLUE_DOOR_SIDE:
		case TILE_CAVE_MINE_CAR:
		case TILE_TABLE:
		case TILE_TOMB:
		case TILE_TOMB_2:
		case TILE_BOX:
		case TILE_BARREL:
		case TILE_BARREL_3:
		case TILE_CHAIR_2:
		default:
			this.movementTimer = 0;
			break;
		}
	}

  /*isNotAPassableTile(aTile) {
    switch (aTile) { // THE TILES THAT CAN'T BE PASSED THROUGH FOR PATHFINDING
  		case TILE_WALL:
  		case TILE_FINISH:
  		case TILE_YELLOW_DOOR:
  		case TILE_RED_DOOR:
  		case TILE_BLUE_DOOR:
  		case TILE_TABLE:
  		case TILE_TOMB:
  		case TILE_TOMB_2:
		case TILE_TOWN_WALL:
  			return false;
  		default:
  			return true;
    }
  } */

  randomMovements() {
	 console.log("Random Movement");
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
		console.log("wayPoint called");
		var thisTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
		
		this.destinationTileIndex = screenCoordToGameCoord(playerOne.x, playerOne.y).indexUnderPixel;

		this.currentPath = this.pather.pathFrom_To_(thisTileIndex, this.destinationTileIndex, isNotAPassableTile);
		pathDebugIndexList = this.currentPath;

		if (this.currentPath.length > 1 && this.finishedMoving==false) {
			console.log(this.currentPath);

			for(var i=0; i<this.currentPath.length; i++)
			{
				var currentTile = getTileIndexAtPixelCoord(this.x, this.y);
				var nextTile = this.currentPath[i];

				if (currentTile == nextTile) {
					continue;
				}

				// Should be a constant:
				var mapArrayColumn = 40;

				if(currentTile-1 == nextTile) // Left
				{
					this.resetDirections();
					this.moveWest = true;
				}
				else if(currentTile+1 == nextTile) // Right
				{
					this.resetDirections();
					this.moveEast = true;
				}
				else if(currentTile-mapArrayColumn == nextTile) // Up
				{
					this.resetDirections();
					this.moveNorth = true;
				}
				else if(currentTile+mapArrayColumn == nextTile) // Down
				{
					this.resetDirections();
					this.moveSouth = true;
				}
			}
		}
		else
		{
			  this.resetDirections();
			  this.finishedMoving = true;
		}
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
		if(this.selected == true){
			canvasContext.drawImage(selectionArrow,isoDrawX-(this.width/2)+10, isoDrawY-this.height - 40);
		}
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

  receiveDamage(damagePoints){
	  this.health -= damagePoints;
	  if(this.health <= 0){

		  // play death animation etc..

		  var dropChance = Math.floor(Math.random() * 100) + 0;  

		  // 50% drop chance:
		  if(dropChance <= 50){
			// Fetch a random item:
			var droppedItemIndex = Math.floor(Math.random() * this.drops.length) + 0;
			this.roomGrid[this.walkIntoTileIndex] = this.drops[droppedItemIndex];
		  }
		  selectedEnemy = null;
	  }
  }
}
