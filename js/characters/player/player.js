const MAX_SHIELD_DURABILITY = 5; // 5 damage pts (please feel free to adjust)

class Player extends Character {
    constructor(maxHealth, movementSpeed, width, height) {
        super(maxHealth, movementSpeed, width, height);

        // Equipment
        this.goldCoins = 0;
        this.keysHeld = 0;

        // Inventory
        this.healPotionsHeld = 0;
        this.manaPotionsHeld = 0;

        // Warrior
        this.sword = false;
        this.mace = false;

        // Wizard
        this.flameSpell = false;
		this.fireballSpell = false;

        // Cleric
        this.healSpell = false;

        // Movement
        this.currentPath = [];
        this.currentPathIndex = 0;
        this.wayPointList = [];
        this.currentWayPoint = 0;
        this.pathFindingQueue = [];
		this.movementTimer = 0;

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

        // Shield
        this.hasShield = false;
        this.remainingShieldDurability = 0;

        // For testing only:
        //this.pickUpShield();
    }

    init(whichGraphic, whichName) {
        super.init(whichGraphic, whichName);
    }

    setupControls(northKey, eastKey, southKey, westKey) {
        this.controlKeyForNorth = northKey;
        this.controlKeyForEast = eastKey;
        this.controlKeyForSouth = southKey;
        this.controlKeyForWest = westKey;
    }

    reset(roomGrid) {
        this.roomGrid = roomGrid;

        for (var i = 0; i < this.roomGrid.length; i++) {
            if (this.roomGrid[i] == TILE_PLAYER) {
                this.roomGrid[i] = TILE_ROAD;

                var tileRow = Math.floor(i / ROOM_COLS);
                var tileCol = i % ROOM_COLS;
                var tileLeftEdgeX = 700
                var tileTopEdgeY = 0;

                this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W;
                this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H;

				this.wayPointList = [];
				       // this.wayPointList.push(85, 125, 130, 90, 47, 92, 57, 60); //to be deleted
                break;
            }
        }

        this.x = this.homeX;
        this.y = this.homeY;
        this.pather = new pathFinder();
    }

    movement() {
        var nextX = this.x;
        var nextY = this.y;
        var collisionX = nextX;
        var collisionY = nextY;

        this.wayPointMovement();

        if( this.canMove ) {
            if (this.moveNorth && this.canMoveNorth || this.keyHeld_North && this.canMoveNorth) {
                nextY -= this.movementSpeed;
                this.offSetHeight = this.height * 4;
                this.enableAnimation=true;
            } else if (this.moveEast && this.canMoveEast || this.keyHeld_East && this.canMoveEast) {
                nextX += this.movementSpeed;
                this.offSetHeight = this.height * 1;
                this.enableAnimation=true;
            } else if (this.moveSouth && this.canMoveSouth || this.keyHeld_South && this.canMoveSouth) {
                nextY += this.movementSpeed;
                this.offSetHeight = this.height * 2;
                this.enableAnimation=true;
            } else if (this.moveWest && this.canMoveWest || this.keyHeld_West && this.canMoveWest) {
                nextX -= this.movementSpeed;
                this.offSetHeight = this.height * 3;
                this.enableAnimation=true;
            } else {
                // Reset to the first frame in the last movement direction animation:
                this.movementTimer++;
				this.offSetWidth = 0;
				if(this.movementTimer > 100 && this.movementTimer < 115){
					this.offSetHeight = 0;
					this.enableAnimation = true;
				} else if (this.movementTimer > 300){
					this.movementTimer = 0;
				} else {
					this.enableAnimation=false;
				}
			}
        }


        var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
        var walkIntoTileType = TILE_WALL;

        if (walkIntoTileType != undefined) {
            walkIntoTileType = this.roomGrid[walkIntoTileIndex];
        }

        switch (walkIntoTileType) {
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
            case TILE_SPIKES_UNARMED:
            case TILE_PITTRAP_UNARMED:
                this.x = nextX;
                this.y = nextY;
                break;
            case TILE_YELLOW_DOOR:
            case TILE_RED_DOOR:
            case TILE_BLUE_DOOR:
                if (this.noClipMode) {
                    this.x = nextX;
                    this.y = nextY;
                } else if (this.keysHeld > 0) {
                    this.keysHeld--;
                    this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                }
                break;
            case TILE_TREASURE:
                this.keysHeld--;
                this.goldCoins++;
                this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                break;
            case TILE_GOLD_COINS:
                this.goldCoins++;
                this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                break;
            case TILE_SWORD:
                //add sword to the warrior
                if (this instanceof Warrior) {
                    this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                    this.sword = true;
                    console.log("Sword found");
                } else {
                    this.x = nextX;
                    this.y = nextY;
                }
                break;
                case TILE_SHIELD:
                    //add shield to the warrior
                    if (this instanceof Warrior) {
                        this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                        this.pickUpShield();
                        console.log("Shield found");
                    } else {
                        this.x = nextX;
                        this.y = nextY;
                    }
                    break;
            case TILE_MACE:
                //add sword to the warrior
                if (this instanceof Warrior) {
                    this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
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
                    this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                    this.fireballSpell = true;
                    console.log("Wizard Book of Fireball found");
                } else {
                    this.x = nextX;
                    this.y = nextY;
                }
                break;
            case TILE_CLERIC_BOOK:
                //add cleric book
                if (this instanceof Cleric) {
                    this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                    this.healSpell = true;
                    console.log("Cleric Book found");
                } else {
                    this.x = nextX;
                    this.y = nextY;
                }
                break;
            case TILE_SKILL_BOOK:
                //add skill book
                this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                console.log("Skill Book found");
                break;
            case TILE_HEALING_POTION:
                //add healing potion
                this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                console.log("Healing Potion found");
                this.healPotionsHeld++;
                break;
            case TILE_MANA_POTION:
                //add mana potion
                this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                console.log("Mana Potion found");
                this.manaPotionsHeld++;
                break;
            case TILE_YELLOW_KEY:
                this.keysHeld++;
                this.roomGrid[walkIntoTileIndex] = TILE_ROAD;
                break;
            case TILE_FINISH:
                if (!cutscenePlayed[Scene.QUESTONE])
                  gameStateManager.setState(State.CUTSCENE, Scene.QUESTONE);
				        break;
			case TILE_STAIRS_DOWN_LEVEL_1:
                gameStateManager.getState().loadLevel(1);
				basementMusic.startOrStopMusic();
				break;
            case TILE_STAIRS_DOWN_LEVEL_2:
				enteringSecondLevelNarrative.play();
                this.playWarriorsThoughtsForSecondLevel = true;
                gameStateManager.getState().loadLevel(2);
				basementMusic.startOrStopMusic();
				cryptMusic.loopSong("Into_The_Crypts");
                break;
            case TILE_STAIRS:
                gameStateManager.getState().loadLevel(0);
				basementMusic.startOrStopMusic();
				break;
            case TILE_PITTRAP_ARMED:
                if (!this.noClipMode) {
                    this.takeDamageFromTrap(1);
                    this.roomGrid[walkIntoTileIndex] = TILE_PITTRAP_UNARMED;
                    crashIntoConeSound.play();
					warriorOuch.play();
                } else {
                    this.x = nextX;
                    this.y = nextY;
                }
                break;
            case TILE_SPIKES_ARMED:
                if (!this.noClipMode) {
                    this.takeDamageFromTrap(1);
                    this.roomGrid[walkIntoTileIndex] = TILE_SPIKES_UNARMED;
                    crashIntoConeSound.play();
					warriorOuch.play();
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
    wayPointMovement() {
       	var destinationTileIndex = getTileIndexAtPixelCoord(mouseClickX, mouseClickY);
		    var thisTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
		    this.currentPath = this.pather.pathFrom_To_(thisTileIndex, destinationTileIndex, this.isPassableTile);

        if (this.currentPath.length > 0) {
            this.currentPathIndex = 0;

			//console.log("Pathing");

            var currentTile = getTileIndexAtPixelCoord(this.x, this.y);
            var nextTile = this.currentPath[this.currentPathIndex];
           // console.log(nextTile);


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
        } else {
			/*var toTileC = this.wayPointList[this.currentWayPoint]%ROOM_COLS;
			var toTileR = Math.floor(this.wayPointList[this.currentWayPoint]/ROOM_COLS);
			var columnDistance = Math.abs(this.currentCol - this.toTileC);
			var rowDistance = Math.abs(this.currentRow - this.toTileR);
			tileCoordToIsoCoord(toTileC, toTileR );

			//console.log("C: " + columnDistance + " R: " + rowDistance);

			if(this.currentWayPoint > this.wayPointList.length){
				this.currentWayPoint = 0;
			}

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
			} */

			this.currentTile = getTileIndexAtPixelCoord(this.x,this.y);
			this.currentCol = this.currentTile%ROOM_COLS;
			this.currentRow = Math.floor(this.currentTile/ROOM_COLS);
			this.toTileC = this.wayPointList[this.currentWayPoint]%ROOM_COLS;
			this.toTileR = Math.floor(this.wayPointList[this.currentWayPoint]/ROOM_COLS);
		}
    }

	newWayPoint(targetIndex) {

		console.log("Target Index " + targetIndex);
	}

	resetDirections() {
		this.moveNorth = false;
		this.moveWest = false;
		this.moveSouth = false;
		this.moveEast = false;
	}

    checkCollisionsAgainst(otherHumanoid) {
        if (!this.noClipMode && super.collisionTest(otherHumanoid)) {
            if (this.keyHeld_North) {
                this.canMoveNorth = false;
                this.y += this.movementSpeed * this.collide_bump_mult;
            } else if (this.keyHeld_East) {
                this.canMoveEast = false;
                this.x -= this.movementSpeed * this.collide_bump_mult;
            } else if (this.keyHeld_South) {
                this.canMoveSouth = false;
                this.y -= this.movementSpeed * this.collide_bump_mult;
            } else if (this.keyHeld_West) {
                this.canMoveWest = false;
                this.x += this.movementSpeed * this.collide_bump_mult;
            }
        } else {
            this.canMoveNorth = true;
            this.canMoveEast = true;
            this.canMoveSouth = true;
            this.canMoveWest = true;
        }
    }

    takeDamageFromTrap(howMuchDamage) {
        if (this.trapCoolDownCounter == 0)
            takeDamage(howMuchDamage);
        this.trapCoolDownTimer = true;
    }

    takeDamage(howMuchDamage) {
        if(this.hasShield){
            this.remainingShieldDurability -= howMuchDamage;
            if(this.remainingShieldDurability <=0){
                this.hasShield=false;
            }
        }
        else{
            this.health -= howMuchDamage;
        }
		if(this.health <= 0){
			gameStateManager.setState(State.GAMEOVER);	
		}
    }

    pickUpShield(){
        this.hasShield = true;
        this.remainingShieldDurability = MAX_SHIELD_DURABILITY;
    }

    calculateRemainingShieldDurablity(){
        return (100 * this.remainingShieldDurability) / MAX_SHIELD_DURABILITY;
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
    }

    useHealPotion() {
        // This variable need to be global?
        var healPotionRecoveryPercent = this.maxHealth* 0.25; // 25%

        this.healPotionsHeld--;
        this.health += healPotionRecoveryPercent;

        // If new health is > max health:
        if(this.health> this.maxHealth){
            this.health = this.maxHealth;
        }

        // We have to write this in order to reference this correctly inside setTimeout()
        var _this = this;

        // play FX:
        _this.showHealFX=true;

        setTimeout(function(){
            _this.showHealFX = false;
        }, 1000);

      }
      useManaPotion() {
        console.log("Mana potion used");
        this.manaPotionsHeld--;
      }
}
