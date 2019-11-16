goblinNames = [ "Lalx", "Hosterz", "Wruc", "Arx", "Plex", "Brong", "Bogz", 
				"Stror", "Klerk", "Rizz", "Lals", "Urt", "Xagz", "Slirm", 
				"Kiok", "Wrokx", "Fiog", "Goziord"];
				
orcNames = [ "Orc 1", "Orc 2", "Orc 3", "Orc 4", "Orc 5", "Orc 6"];     

ogreNames = [ "Ogre 1", "Ogre 2", "Ogre 3", "Ogre 4", "Ogre 5", "Ogre 6"];

ratNames = [ "Splinter", "Bob" ];     


function enemyClass() {
	this.x = 600;
	this.y = 800;
	this.width = 30; 
	this.height = 31; 
	this.isoEnemyFootY = 8;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	this.wayPointList = [];
	
	this.maxHealth = 2;
	this.speed = 3;
	this.health = this.maxHealth;
	
	this.movementTimer = 0;
	this.currentwayPoint = 0;
	this.frameTick = 0; // animation - called every frame
	this.ticksPerFrame = 5; //frame ticks advance the frame
	this.numberOfFrames = 4; //number of frames in character sprite sheet
	this.frameIndex  = 0; //frame sprite sheet is on
	this.currentTile = 0;
	this.currentCol = 0;
	this.currentRow = 0;	
	this.toTileC = 0;
	this.toTileR = 0;
	this.d = 0; //distance
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
					console.log("Found start position for " + this.myName + " at " + i);
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
		if(this.myTile == TILE_ORC){
			this.height = 31;
			this.width = 30;
		}
		this.wayPointList = [];
		this.wayPointList.push(85,125,130,90, 47, 92, 57, 60);
	}	
	 
	this.movement = function() {
		
		var nextX = this.x; 
		var nextY = this.y; 
		
		this.randomMovements();
		//this.wayPointMovement();
		//this.rest();
		
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
	
	this.wayPointMovement = function (){
		gameCoordToIsoCoord(this.x,this.y);
		var enemyXLocation = isoDrawX;
		var enemyYLocation = isoDrawY;
		var toTileC = this.wayPointList[this.currentwayPoint]%ROOM_COLS;
		var toTileR = Math.floor(this.wayPointList[this.currentwayPoint]/ROOM_COLS);
		var columnDistance = Math.abs(this.currentCol - this.toTileC);
		var rowDistance = Math.abs(this.currentRow - this.toTileR);
		tileCoordToIsoCoord(toTileC, toTileR );
		
		//console.log("C: " + columnDistance + " R: " + rowDistance);
		
		if(this.currentCol == this.toTileC && this.currentRow == this.toTileR){
			this.currentwayPoint++;
			if(this.currentwayPoint > this.wayPointList.length){
				this.currentwayPoint = 0;
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
		this.toTileC = this.wayPointList[this.currentwayPoint]%ROOM_COLS;
		this.toTileR = Math.floor(this.wayPointList[this.currentwayPoint]/ROOM_COLS); 
	} 
	
	this.rest = function(){
		this.resetDirections();
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

	this.animateEnemy = function(){
		this.frameTick++;
		if (this.frameTick > this.ticksPerFrame) {
			this.frameTick = 0;
			this.frameIndex++;
		}
		if (this.frameIndex  < this.numberOfFrames - 1) {
			this.offSetWidth = this.frameIndex * this.width;
		} else {
			this.frameIndex  = 0;
		}
	}

	this.draw = function(){
		this.animateEnemy();
		gameCoordToIsoCoord(this.x,this.y);
		canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y);
		colorText(this.myName, isoDrawX + 20, isoDrawY - 30, "black", "8px Arial Black");
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		
		
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
				colorLine(startX,startY,isoDrawX, isoDrawY, (i <= this.currentwayPoint ? "yellow" : "red"));
			}
			startX = isoDrawX;
			startY = isoDrawY;
			if(i == this.currentwayPoint) {
				colorRect(startX-5,startY-5,10,10,"cyan");
			}
		} 
		//colorRect(this.miniMapX, this.miniMapY, 10, 10, "green");	
	}
}