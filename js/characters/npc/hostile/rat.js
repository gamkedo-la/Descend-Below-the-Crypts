const RAT_NAMES = [ "rat"];

const RAT_MAX_HEALTH = 2;
const RAT_MOVEMENT_SPEED = 3;
const RAT_WIDTH = 58;
const RAT_HEIGHT = 29;

class Rat extends Enemy {
  constructor() {
    super(RAT_MAX_HEALTH, RAT_MOVEMENT_SPEED, RAT_WIDTH, RAT_HEIGHT);
    this.init();
  }

  init() {
    super.init(ratPic, randFromList(RAT_NAMES), TILE_RAT);
	this.enableAnimation = false;
  }
}
