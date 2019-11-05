const ISO_CHAR_FOOT_Y = 8;
const COLLIDE_BUMP_MULT = 2; // this needs to be improved.  This could potentially cause enemy or player in an illegal position (wall)


function warriorClass() {
	this.warriorPic = document.createElement("img");
	this.x = 600;
	this.y = 800;
	this.width = 30;
	this.height = 30;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	this.playerMovementSpeed = 3.0;
	this.keyHeld_North = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;	
	this.health = 4;
	this.maxHealth = 4;
	this.trapCoolDownTimer = 0;
	this.trapCoolDownCounter = 0;
	
	//equipment
	this.goldCoins = 0;
	this.keysHeld = 0;
	this.sword = false;
	this.mace = false;
	this.flameSpell = false;
	this.healSpell = false;
		
	this.setupControls = function(northKey,eastKey,southKey,westKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;			
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
	}

	this.warriorReset = function() {
		this.speed = 0;
		this.keysHeld = 0;
					
		for(var i=0; i<roomGrid.length; i++){
			if( roomGrid[i] == TILE_PLAYER) {
				var tileRow = Math.floor(i/ROOM_COLS);
				var tileCol	= i%ROOM_COLS;
				var tileLeftEdgeX = 700
				var tileTopEdgeY = 0;

				this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
				this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

				roomGrid[i] = TILE_ROAD;
				break;
			}
		}
	
		this.x = this.homeX;
		this.y = this.homeY;
		this.miniMapX = this.homeX + 750;
		this.miniMapY = this.homeY + 2;
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.warriorReset();
	}	
	 
	this.movement = function() {
		
		var nextX = this.x; 
		var nextY = this.y; 
		var collisionX = nextX;
		var collisionY = nextY;
		
		if(this.keyHeld_North && this.keyHeld_West){
			nextY -= this.playerMovementSpeed;
			collisionY = nextY 
		} else if(this.keyHeld_North && this.keyHeld_East){
			nextX += this.playerMovementSpeed;
			this.miniMapX += this.playerMovementSpeed/10;
			this.miniMapY -= this.playerMovementSpeed/10;
		} else if(this.keyHeld_South && this.keyHeld_West){
			nextX -= this.playerMovementSpeed;
			this.miniMapX -= this.playerMovementSpeed/10;
			this.miniMapY += this.playerMovementSpeed/10;
		} else if(this.keyHeld_South && this.keyHeld_East){
			nextY += this.playerMovementSpeed;
			this.miniMapX += this.playerMovementSpeed/10;
			this.miniMapY += this.playerMovementSpeed/10; 
		} else if(this.keyHeld_North && this.canMoveNorth){
			nextY -= this.playerMovementSpeed;
			this.offSetHeight = this.height * 4;
			this.miniMapY -= this.playerMovementSpeed/15;
		} else if(this.keyHeld_East && this.canMoveEast){
			nextX += this.playerMovementSpeed;
			this.offSetHeight = this.height * 1;
			this.miniMapX += this.playerMovementSpeed/15;
		} else if(this.keyHeld_South && this.canMoveSouth){
			nextY += this.playerMovementSpeed;
			this.offSetHeight = this.height * 2;
			this.miniMapY += this.playerMovementSpeed/15;
		} else if(this.keyHeld_West && this.canMoveWest){
			nextX -= this.playerMovementSpeed;
			this.offSetHeight = this.height * 3;
			this.miniMapX -= this.playerMovementSpeed/15;
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
			case TILE_SEWER:
			case TILE_SPIKES_UNARMED:
			case TILE_PITTRAP_UNARMED:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_YELLOW_DOOR:
			case TILE_RED_DOOR:
			case TILE_BLUE_DOOR:
				if(this.keysHeld > 0){
					this.keysHeld--;
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
				}
				break;	
			case TILE_TREASURE:	
				this.keysHeld--;
				this.goldCoins++;
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_GOLD_COINS:	
				this.goldCoins++;
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_SWORD:	
				//add sword to the warrior
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				this.sword = true;
				console.log("Sword found");
				break;
			case TILE_MACE:	
				//add sword to the warrior
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				this.mace = true;
				console.log("Mace found");
				break;
			case TILE_WIZARD_BOOK:	
				//add wizard book
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				this.flameSpell = true;
				console.log("Wizard Book found");
				break;
			case TILE_CLERIC_BOOK:	
				//add cleric book
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				this.healSpell = true;
				console.log("Cleric Book found");
				break;
			case TILE_SKILL_BOOK:	
				//add skill book
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				console.log("Skill Book found");
				break;
			case TILE_HEALING_POTION:	
				//add healing potion
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				console.log("Healing Potion found");
				break;
			case TILE_MANA_POTION:	
				//add mana potion
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				console.log("Mana Potion found");
				break;				
				TILE_HEALING_POTION
				
			case TILE_YELLOW_KEY:	
				this.keysHeld++;			
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;			
			case TILE_FINISH:
			case TILE_STAIRS_DOWN:
				console.log("Stair 2");
				loadLevel(levelTwo);
				break;
			case TILE_STAIRS:
				this.warriorReset();
				break;			
			case TILE_PITTRAP_ARMED:
				this.takeDamageFromTrap(1);
				roomGrid[walkIntoTileIndex] = TILE_PITTRAP_UNARMED;
				crashIntoConeSound.play();
				break;
			case TILE_SPIKES_ARMED:
				this.takeDamageFromTrap(1);
				roomGrid[walkIntoTileIndex] = TILE_SPIKES_UNARMED;
				crashIntoConeSound.play();
				break;
			case TILE_WALL:
			case TILE_WALL_WITH_TORCH:
			case TILE_TABLE:
			case TILE_BOOKSHELF:
			default:
				break;
		} // END OF SWITCH CASE		
		this.trapCoolDown();
		
	}	// END OF THIS.MOVEMENT

		
	this.checkCollisionsAgainst = function(otherHumanoid){
		if(this.collisionTest(otherHumanoid)){
			console.log("collision");
			if(this.keyHeld_North){
				this.canMoveNorth = false;
				this.y += this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_East){
				this.canMoveEast = false;
				this.x -= this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_South){
				this.canMoveSouth = false;
				this.y -= this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_West){
				this.canMoveWest = false;
				this.x += this.playerMovementSpeed * COLLIDE_BUMP_MULT;				
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
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, 24, 9, "red");
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, (this.health / this.maxHealth) * 24, 9, "green");
		canvasContext.drawImage(healthbarPic,isoDrawX-(this.width/2), isoDrawY-this.height - 20);
		//colorRect(this.miniMapX, this.miniMapY, 4, 4, "green");	
	}
		
	//this delivers damage to the player when setting off a trap
	this.takeDamageFromTrap = function(howMuchDamage){
		if(this.trapCoolDownCounter == 0){
			this.health = this.health - howMuchDamage;
		}
		trapCoolDownTimer = true;
	}
	
	//this is used to keep traps from constantly causing damage to the player
	this.trapCoolDown = function(){
		if(this.trapCoolDownTimer == true){
			this.trapCoolDownCounter++
		}
		if(this.trapCoolDownCounter == 120){
			this.trapCoolDownCounter = 0;
			this.trapCoolDownTimer = false;
		}
	}
	
	
}