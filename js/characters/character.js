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

  collisionTest(otherHumanoid) {
    if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20)
				return true;
		return false;
  }

  draw() {
    if(this.enableAnimation==true){
      this.animate();
    }
    gameCoordToIsoCoord(this.x, this.y);
		canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height - this.isoFootY);
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height,
								isoDrawX-(this.width/2), isoDrawY-this.height - this.isoFootY, this.width, this.height);
  }
}
