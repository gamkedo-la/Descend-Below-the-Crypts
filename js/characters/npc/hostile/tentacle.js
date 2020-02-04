const TENTACLE_MAX_HEALTH = 50;
const TENTACLE_MOVEMENT_SPEED = 0;
const TENTACLE_WIDTH = 50;
const TENTACLE_HEIGHT = 50;

class TentacleBoss extends Enemy {
  constructor() {
    super(TENTACLE_MAX_HEALTH, TENTACLE_MOVEMENT_SPEED, TENTACLE_WIDTH, TENTACLE_HEIGHT);
    this.init();
  }

  init() {
    super.init(tentaclePic, "Nameless", TILE_TENTACLE);
	this.enableAnimation = true;
	this.canMove = false;
    this.wayPointList = [];
	this.numberOfFrames = 8;
	this.frameIndex = Math.round(Math.random() * 8);
  }
}

