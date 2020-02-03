// Practicing using git. Will remove -Victor Albenor
const RUN_MULT = 2.0; // how much faster when running than walking

class Character {
  constructor(maxHealth, movementSpeed, width, height) {
    // Draw
    this.x = 600;
    this.y = 800;
    this.width = width;
    this.height = height;
    this.isoFootY = 8;
    this.offSetWidth = 0;
    this.offSetHeight = 0;
    this.miniMapX = 630;
    this.miniMapY = 30;

    // Attributes
    this.maxHealth = maxHealth;
    this.health = this.maxHealth;
  	this.movementSpeed = movementSpeed;
	  this.runSpeed = this.movementSpeed*RUN_MULT;
	  this.mana = 0;
	  this.maxMana = 0;

    // Movement
	  this.canMove = true // meant for classes that can move
  	this.canMoveNorth = true;
  	this.canMoveEast = true;
  	this.canMoveSouth = true;
  	this.canMoveWest = true;
    this.moveNorth = false;
    this.moveSouth = false;
    this.moveEast = false;
    this.moveWest = false;
    this.roomGrid = [];

    // Animations
    this.enableAnimation = false;
    this.frameTick = 0; // animation - called every frame
  	this.ticksPerFrame = 5; //frame ticks advance the frame
  	this.numberOfFrames = 4; //number of frames in character sprite sheet
    this.frameIndex  = 0; //frame sprite sheet is on

    // Heal FX
    this.showHealFX = false;
    this.healFXFrameTick = 0;
  	this.healFXTicksPerFrame = 5;
  	this.healFXNumberOfFrames = 4;
    this.healFXFrameIndex  = 0;
    this.healFXOffSetWidth = 0;
  }

  init(whichGraphic, whichName, whichTile) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;

    if (arguments.length === 3)
      this.myTile = whichTile;
  }

  animate() {
    this.frameTick++;
		if (this.frameTick > this.ticksPerFrame) {
			this.frameTick = 0;
			this.frameIndex++;
		}
		if (this.frameIndex  < this.numberOfFrames - 1)
			this.offSetWidth = this.frameIndex * this.width;
		else
			this.frameIndex  = 0;
  }

  animateHealFX() {
    this.healFXFrameTick++;
		if (this.healFXFrameTick > this.healFXTicksPerFrame) {
			this.healFXFrameTick = 0;
			this.healFXFrameIndex++;
		}
		if (this.healFXFrameIndex  < this.healFXNumberOfFrames - 1)
			this.healFXOffSetWidth = this.healFXFrameIndex * this.width;
		else
			this.healFXFrameIndex  = 0;
  }

  collisionTest(otherHumanoid) {
    if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20)
				return true;
		return false;
  }

  setLocation(locationIndex) {
    if (this instanceof NPC) {
      this.speed = 3;
      this.health = this.maxHealth;
    }

    var tileRow = Math.floor(locationIndex / ROOM_COLS);
    var tileCol = locationIndex % ROOM_COLS;

    this.x = tileCol * ROOM_W + 0.5 * ROOM_W;
    this.y = tileRow * ROOM_H + 0.5 * ROOM_H;

    this.pather = new pathFinder();
    this.waypoint = [];
  }

  draw() {
    if(this.enableAnimation==true){
      this.animate();
    }
    this.animateHealFX();
    gameCoordToIsoCoord(this.x, this.y);
    try {
      if (!isAHalfWall(mapStack[currentMap].level[getTileIndexAtPixelCoord(this.x, this.y) + 1].getTileType()))
        canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height - this.isoFootY);
  		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height,
                  isoDrawX-(this.width/2), isoDrawY-this.height - this.isoFootY, this.width, this.height);
    } catch(err) {
      console.log(`Character: ${this.myBitmap}`);
    }


    if(this.showHealFX == true){
      canvasContext.drawImage(healFX, this.healFXOffSetWidth, 0, this.width, this.height,
        isoDrawX-(this.width/2), isoDrawY-this.height - this.isoFootY, this.width, this.height);
    }
  }
}
