class Player extends Character {
  constructor(maxHealth, movementSpeed, width, height) {
    super(maxHealth, movementSpeed, width, height);

    // Equipment
    this.goldCoins = 0;
  	this.keysHeld = 0;

    // Warrior
    this.sword = false;
  	this.mace = false;

    // Wizard
  	this.flameSpell = false;

    // Cleric
  	this.healSpell = false;

    // Movement
    this.keyHeld_North = false;
  	this.keyHeld_East = false;
  	this.keyHeld_South = false;
  	this.keyHeld_West = false;

    // Attributes
    this.trapCoolDownTimer = 0;
  	this.trapCoolDownCounter = 0;
  	this.originalMovementSpeed = this.movementSpeed;

    // Conditions
  	this.playWarriorsThoughtsForSecondLevel = false;

    // Etc
    this.noClipMode = false;
    this.collide_bump_mult = 2; // this needs to be improved.  This could potentially cause enemy or player in an illegal position (wall)
  }

  init(whichGraphic, whichName) {
    super.init(whichGraphic, whichName);
    this.reset();
  }

  setupControls(northKey, eastKey, southKey, westKey) {
    this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
  }

  reset() {
    // this.keysHeld = 0;
    // this.health = this.maxHealth;

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

  movement() {
    var nextX = this.x;
		var nextY = this.y;
		var collisionX = nextX;
		var collisionY = nextY;

		if(this.keyHeld_North && this.keyHeld_West){
			nextY -= this.movementSpeed;
			collisionY = nextY
		} else if(this.keyHeld_North && this.keyHeld_East){
			nextX += this.movementSpeed;
			this.miniMapX += this.movementSpeed/10;
			this.miniMapY -= this.movementSpeed/10;
		} else if(this.keyHeld_South && this.keyHeld_West){
			nextX -= this.movementSpeed;
			this.miniMapX -= this.movementSpeed/10;
			this.miniMapY += this.movementSpeed/10;
		} else if(this.keyHeld_South && this.keyHeld_East){
			nextY += this.movementSpeed;
			this.miniMapX += this.movementSpeed/10;
			this.miniMapY += this.movementSpeed/10;
		} else if(this.keyHeld_North && this.canMoveNorth){
			nextY -= this.movementSpeed;
			this.offSetHeight = this.height * 4;
			this.miniMapY -= this.movementSpeed/15;
		} else if(this.keyHeld_East && this.canMoveEast){
			nextX += this.movementSpeed;
			this.offSetHeight = this.height * 1;
			this.miniMapX += this.movementSpeed/15;
		} else if(this.keyHeld_South && this.canMoveSouth){
			nextY += this.movementSpeed;
			this.offSetHeight = this.height * 2;
			this.miniMapY += this.movementSpeed/15;
		} else if(this.keyHeld_West && this.canMoveWest){
			nextX -= this.movementSpeed;
			this.offSetHeight = this.height * 3;
			this.miniMapX -= this.movementSpeed/15;
		} else {
			this.offSetHeight = 0;
		}

		this.miniMapX = nextX;
		this.miniMapY = nextY;

		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_WALL;

		if(walkIntoTileType != undefined) {
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType) {
			case TILE_ROAD:
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
			case TILE_SPIKES_UNARMED:
			case TILE_PITTRAP_UNARMED:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_YELLOW_DOOR:
			case TILE_RED_DOOR:
			case TILE_BLUE_DOOR:
				if(this.noClipMode) {
					this.x = nextX;
					this.y = nextY;
				}
				else if(this.keysHeld > 0) {
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
        if (this instanceof Warrior) {
          roomGrid[walkIntoTileIndex] = TILE_ROAD;
  				this.sword = true;
  				console.log("Sword found");
        } else {
          this.x = nextX;
          this.y = nextY;
        }
				break;
			case TILE_MACE:
				//add sword to the warrior
        if (this instanceof Warrior) {
          roomGrid[walkIntoTileIndex] = TILE_ROAD;
  				this.mace = true;
  				console.log("Mace found");
        } else {
          this.x = nextX;
          this.y = nextY;
        }
				break;
			case TILE_WIZARD_BOOK:
				//add wizard book
        if (this instanceof Wizard) {
          roomGrid[walkIntoTileIndex] = TILE_ROAD;
  				this.flameSpell = true;
  				console.log("Wizard Book found");
        } else {
          this.x = nextX;
          this.y = nextY;
        }
				break;
			case TILE_CLERIC_BOOK:
				//add cleric book
        if (this instanceof Cleric) {
          roomGrid[walkIntoTileIndex] = TILE_ROAD;
  				this.healSpell = true;
  				console.log("Cleric Book found");
        } else {
          this.x = nextX;
          this.y = nextY;
        }
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
			case TILE_YELLOW_KEY:
				this.keysHeld++;
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_FINISH:
			case TILE_STAIRS_DOWN:
				enteringSecondLevelNarrative.play();
				this.playWarriorsThoughtsForSecondLevel = true;
				loadLevel(levelTwo);
				break;
			case TILE_STAIRS:
				this.reset();
				break;
			case TILE_PITTRAP_ARMED:
				if(!this.noClipMode) {
					this.takeDamageFromTrap(1);
					roomGrid[walkIntoTileIndex] = TILE_PITTRAP_UNARMED;
					crashIntoConeSound.play();
				} else {
          this.x = nextX;
          this.y = nextY;
        }
				break;
			case TILE_SPIKES_ARMED:
				if(!this.noClipMode) {
					this.takeDamageFromTrap(1);
					roomGrid[walkIntoTileIndex] = TILE_SPIKES_UNARMED;
					crashIntoConeSound.play();
				} else {
          this.x = nextX;
          this.y = nextY;
        }
				break;
			case TILE_WALL:
			case TILE_WALL_WITH_TORCH:
			case TILE_TABLE:
			case TILE_BOOKSHELF:
			case TILE_TOMB:
			case TILE_TOMB_2:
			case TILE_COLUMN:
			default:
				if (this.noClipMode) {
					if (getTileIndexAtPixelCoord(nextX, nextY) != undefined) {
						this.x = nextX;
						this.y = nextY;
					}
				}
				break;
		}

		this.trapCoolDown();
  }

  checkCollisionsAgainst(otherHumanoid) {
    if (!this.noClipMode && super.collisionTest(otherHumanoid)) {
      if(this.keyHeld_North) {
				this.canMoveNorth = false;
				this.y += this.movementSpeed * this.collide_bump_mult;
			} else if(this.keyHeld_East){
				this.canMoveEast = false;
				this.x -= this.movementSpeed * this.collide_bump_mult;
			} else if(this.keyHeld_South){
				this.canMoveSouth = false;
				this.y -= this.movementSpeed * this.collide_bump_mult;
			} else if(this.keyHeld_West){
				this.canMoveWest = false;
				this.x += this.movementSpeed * this.collide_bump_mult;
			}
    }
    else {
      this.canMoveNorth = true;
      this.canMoveEast = true;
      this.canMoveSouth = true;
      this.canMoveWest = true;
    }
  }

  takeDamageFromTrap(howMuchDamage) {
    if (this.trapCoolDownCounter == 0)
      this.health -= howMuchDamage;
    trapCoolDownTimer = true;
  }

  trapCoolDown() {
    if (this.trapCoolDownTimer)
			this.trapCoolDownCounter++
		if (this.trapCoolDownCounter == 120) {
			this.trapCoolDownCounter = 0;
			this.trapCoolDownTimer = false;
		}
  }

  draw() {
    super.draw();

    colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, 24, 9, "red");
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, (this.health / this.maxHealth) * 24, 9, "green");
    canvasContext.drawImage(healthbarPic,isoDrawX-(this.width/2), isoDrawY-this.height - 20);
  }
}
