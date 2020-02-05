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
        this.freezeSpell = false;

        // Cleric
        this.healSpell = false;

        // Movement
        this.currentPath = [];
        this.currentPathIndex = 0;
        this.wayPointList = [];
        this.currentWayPoint = 0;
        this.pathFindingQueue = [];
		this.movementTimer = 0;
		this.destinationTileIndex = 0;
		this.finishedMoving = true;

        this.keyHeld_North = false;
		this.keyHeld_East = false;
		this.keyHeld_South = false;
		this.keyHeld_West = false;
		this.keyHeld_Run = false;

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

    setupControls(northKey, eastKey, southKey, westKey, runKey) {
        this.controlKeyForNorth = northKey;
        this.controlKeyForEast = eastKey;
        this.controlKeyForSouth = southKey;
        this.controlKeyForWest = westKey;
		this.controlKeyForRun = runKey;
    }

    movement() {
        var nextX = this.x;
        var nextY = this.y;
        var collisionX = nextX;
        var collisionY = nextY;

        this.wayPointMovement();

        if( this.canMove ) {
			let speedNow = 0;
			if (this.keyHeld_Run) {
				speedNow = this.runSpeed;
			} else {
			    speedNow = this.movementSpeed;
			}
            if (this.moveNorth && this.canMoveNorth || this.keyHeld_North && this.canMoveNorth) {
                nextY -= speedNow;
                this.offSetHeight = this.height * 4;
                this.enableAnimation=true;
            } else if (this.moveEast && this.canMoveEast || this.keyHeld_East && this.canMoveEast) {
                nextX += speedNow;
                this.offSetHeight = this.height * 1;
                this.enableAnimation=true;
            } else if (this.moveSouth && this.canMoveSouth || this.keyHeld_South && this.canMoveSouth) {
                nextY += speedNow;
                this.offSetHeight = this.height * 2;
                this.enableAnimation=true;
            } else if (this.moveWest && this.canMoveWest || this.keyHeld_West && this.canMoveWest) {
                nextX -= speedNow;
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
            walkIntoTileType = mapStack[currentMap].getTileType(walkIntoTileIndex);
        }

		if(isNotAPassableTile(walkIntoTileType)){
			   this.x = nextX;
               this.y = nextY;
		} else {
			switch (walkIntoTileType) {
				case TILE_YELLOW_DOOR:
				case TILE_RED_DOOR:
				case TILE_BLUE_DOOR:
					if (this.noClipMode) {
						this.x = nextX;
						this.y = nextY;
					} else if (this.keysHeld > 0) {
						this.keysHeld--;
						mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
					}
					break;
				case TILE_TREASURE:
					this.keysHeld--;
					this.goldCoins++;
					mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
					break;
				case TILE_GOLD_COINS:
					this.goldCoins++;
					mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
					break;
				case TILE_SWORD:
					//add sword to the warrior
					if (this instanceof Warrior) {
						mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
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
							mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
							this.pickUpShield();
							console.log("Shield found");
						} else {
							this.x = nextX;
							this.y = nextY;
						}
						break;
				case TILE_MACE:
					//add sword to the cleric
					if (this instanceof Cleric) {
						mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
						this.mace = true;
						console.log("Mace found");
					} else {
						this.x = nextX;
						this.y = nextY;
					}
					break;
				case TILE_WIZARD_BOOK:
					//add wizard fireball book
					if (this instanceof Wizard) {
						mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
						this.fireballSpell = true;
						console.log("Wizard Book of Fireball found");
					} else {
						this.x = nextX;
						this.y = nextY;
					}
					break;
				case TILE_FLAME_SPELL_BOOK:
						//add wizard flame book
						if (this instanceof Wizard) {
							mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
							this.flameSpell = true;
							console.log("Wizard Book of Flame found");
						} else {
							this.x = nextX;
							this.y = nextY;
						}
						break;
				case TILE_FREEZE_SPELL_BOOK:
							//add wizard freeze book
							if (this instanceof Wizard) {
								mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
								this.freezeSpell = true;
								console.log("Wizard Book of Freeze found");
							} else {
								this.x = nextX;
								this.y = nextY;
							}
							break;
				case TILE_CLERIC_BOOK:
					//add cleric book
					if (this instanceof Cleric) {
						mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
						this.healSpell = true;
						console.log("Cleric Book found");
					} else {
						this.x = nextX;
						this.y = nextY;
					}
					break;
				case TILE_SKILL_BOOK:
					//add skill book
					mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
					console.log("Skill Book found");
					break;
				case TILE_HEALING_POTION:
					//add healing potion
					mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
					console.log("Healing Potion found");
					this.healPotionsHeld++;
					break;
				case TILE_MANA_POTION:
					//add mana potion
					mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
					console.log("Mana Potion found");
					this.manaPotionsHeld++;
					break;
				case TILE_YELLOW_KEY:
					this.keysHeld++;
					mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_ROAD);
					break;
				case TILE_FINISH:
					if (!cutscenePlayed[Scene.QUESTONE])
					  gameStateManager.setState(State.CUTSCENE, Scene.QUESTONE);
							break;
				case TILE_STAIRS_DOWN:
          levelDescend();
					break;
				case TILE_STAIRS:
					levelAscend();
					break;
				case TILE_PITTRAP_ARMED:
					if (!this.noClipMode) {
						this.takeDamageFromTrap(1);
            mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_PITTRAP_UNARMED);
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
            mapStack[currentMap].replaceTile(walkIntoTileIndex, TILE_PITTRAP_UNARMED);
						crashIntoConeSound.play();
						warriorOuch.play();
					} else {
						this.x = nextX;
						this.y = nextY;
					}
					break;
				case TILE_WALL:
				case TILE_BOX:
				case TILE_WALL_WITH_TORCH:
				case TILE_TABLE:
				case TILE_BOOKSHELF:
				case TILE_TOMB:
				case TILE_TOMB_2:
				case TILE_COLUMN:
				case TILE_BARREL:
				case TILE_BARREL_3:
				case TILE_WALL_ART:
				case TILE_CHAIR_2:
				default:
					if (this.noClipMode) {
						if (getTileIndexAtPixelCoord(nextX, nextY) != undefined) {
							this.x = nextX;
							this.y = nextY;
						}
					}
				break;
			}
        }

        this.trapCoolDown();
    }


    wayPointMovement() {
		if (gameStateManager.getState().debug==true) {
			var thisTileIndex = getTileIndexAtPixelCoord(this.x, this.y);

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
  }

	newWayPoint(targetIndex) {

	//	console.log("Target Index " + targetIndex);
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
            this.takeDamage(howMuchDamage);
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
			if (this instanceof Warrior){
				gameOverPic = gameOverPicWarrior;
			} else if (this instanceof Cleric){
				gameOverPic = gameOverPicCleric;
			} else if (this instanceof Wizard){
				gameOverPic = gameOverPicWizard;
			}
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
        this.mana +=2

      }

      attackWithPunch(enemy){
        console.log('Attacking with punch');
        enemy.receiveDamage(PUNCH_POWER);
      }

      notEnoughManaAlert() {
          console.log("You Don't have enough Mana");
      }
}
