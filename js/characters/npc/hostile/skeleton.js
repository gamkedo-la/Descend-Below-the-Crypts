const SKELETON_NAMES = [ "Vince", "Gino", "Tim","Aaron"];

const SKELETON_MAX_HEALTH = 2;
const SKELETON_MOVEMENT_SPEED = 3;
const SKELETON_WIDTH = 30;
const SKELETON_HEIGHT = 31;

class Skeleton extends Enemy {
  constructor(location) {
    super(SKELETON_MAX_HEALTH, SKELETON_MOVEMENT_SPEED, SKELETON_WIDTH, SKELETON_HEIGHT);
		this.init();
  }

  init() {
    super.init(skeletonPic, randFromList(SKELETON_NAMES), TILE_SKELETON);
		this.enableAnimation = true;
  }
}
